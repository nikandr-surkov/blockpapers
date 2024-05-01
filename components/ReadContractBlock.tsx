"use client";

import React, { useEffect, useState } from "react";
import { Contract, openContract } from "@ton/core";
import { useTonConnect } from "@/app/hooks/useTonConnect";
import { CHAIN } from "@tonconnect/ui-react";
import { useJettonContract } from "@/app/hooks/useJettonContract";

type Props = {}

const ReadContractBlock = (props: Props) => {
    const { connected, network } = useTonConnect();
    const [networkName, setNetworkName] = useState("");
    const { jettonWalletAddress, balance } = useJettonContract();

    // CONTRACT_ADDRESS is usually set at the top level or imported from config
    const CONTRACT_ADDRESS = "EQBThxYJg_8jaNBLkDLpLx0S6C1RsLq-0a9NwNHpZ2TSzRhR";

    useEffect(() => {
        if(network === CHAIN.MAINNET) {
            setNetworkName("Mainnet")
        } else if (network === CHAIN.TESTNET) {
            setNetworkName("Testnet");
        } else {
            setNetworkName("Undefined");
        }
    }, [network]);

    return (
        <div className="flex justify-center items-center px-4 my-8">
            <div className="w-full max-w-md p-6 rounded-lg border shadow-md bg-white">
                <h2 className="text-2xl font-bold text-blue-800 mt-0 mb-2">BLOCKPAPERS</h2>
                <h3 className="text-xl font-bold text-blue-800 mt-0 mb-2">Supply: {balance}</h3>
                <p className="text-sm text-gray-600">Contract Address: {CONTRACT_ADDRESS}</p>
            </div>
        </div>
    );
}

export default ReadContractBlock;
