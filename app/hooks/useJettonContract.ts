import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { Block } from "../contract-scripts/tact_Block";
import { JettonDefaultWallet } from "../contract-scripts/tact_JettonDefaultWallet";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const { client } = useTonClient()
    const { wallet, sender } = useTonConnect()
    const [balance, setBalance] = useState<string | null>()

    const jettonContract = useAsyncInitialize(async () => {
        if (!client || !wallet) return;

        const contract = Block.fromAddress(Address.parse("EQBThxYJg_8jaNBLkDLpLx0S6C1RsLq-0a9NwNHpZ2TSzRhR"))

        return client.open(contract) as OpenedContract<Block>
    }, [client, wallet])

    const jettonWalletContract = useAsyncInitialize(async () => {
        if (!jettonContract || !client) return;

        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet!).toString())
        )

        return client.open(JettonDefaultWallet.fromAddress(jettonWalletAddress))
    }, [jettonContract, client])

    useEffect(() => {
        async function getBalance() {
            if (!jettonWalletContract) return
            try {
                const balance = (await jettonWalletContract.getGetWalletData()).balance
                setBalance(fromNano(balance))
            } catch (error) {

            }
            await sleep(5000)
            getBalance()
        }

        getBalance()

    }, [jettonWalletContract])

    return {
        jettonWalletAddress: jettonWalletContract?.address.toString(),
        balance: balance,
        mint: () => {

            jettonContract?.send(sender, {
                value: toNano("0.05")
            }, "Mint: 100000000000")
        }
    }
}