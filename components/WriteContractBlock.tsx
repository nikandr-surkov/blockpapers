"use client";

import React, { useEffect, useState } from "react";
import { Contract, openContract } from "@ton/core";
import { useTonConnect } from "@/app/hooks/useTonConnect";
import { CHAIN } from "@tonconnect/ui-react";
import { useJettonContract } from "@/app/hooks/useJettonContract";

type Props = {}

const WriteContractBlock = (props: Props) => {
    const { connected, network } = useTonConnect();
    const [networkName, setNetworkName] = useState("");

    // CONTRACT_ADDRESS is usually set at the top level or imported from config
    const CONTRACT_ADDRESS = "EQBThxYJg_8jaNBLkDLpLx0S6C1RsLq-0a9NwNHpZ2TSzRhR";

    const { mint } = useJettonContract();

    const handleAction = async () => {
        if (!connected) {
            console.log("Connecting wallet...");
            // Example: await connectWallet();
        } else if (network !== CHAIN.MAINNET) {
            console.log("Switching to MAINNET...");
            // Example: await switchNetwork(CHAIN.MAINNET);
        } else {
            try {
                console.log("Minting 100 BLOCKPAPERS tokens...");
                mint();
            } catch (error) {
                console.error("Failed to mint tokens:", error);
            }
        }
    }

    const buttonText = () => {
        if (!connected) {
            return "Connect Wallet";
        } else if (network !== CHAIN.MAINNET) {
            return "Change to Mainnet";
        }
        return "Mint 100 Tokens";
    };

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
                <h2 className="text-2xl font-bold text-blue-800 mt-0 mb-2">Mint BLOCKPAPERS</h2>
                <p className="mb-2">{connected ? `Network: ${networkName}` : "Wallet not connected"}</p>
                <p className="text-sm text-gray-600">Contract Address: {CONTRACT_ADDRESS}</p>
                <button
                    onClick={handleAction}
                    className={`w-full px-5 py-3 rounded-lg transition duration-300 ${!connected || network !== CHAIN.MAINNET ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                    disabled={!connected || network !== CHAIN.MAINNET}
                >
                    {buttonText()}
                </button>
            </div>
        </div>
    );
}

export default WriteContractBlock;
