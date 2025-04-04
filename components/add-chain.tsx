"use client";

import { useState } from "react";

const testnetV1 = {
    chainId: "0x4F6",
    chainName: "Irys Testnet v1",
    nativeCurrency: {
        name: "IRYS",
        symbol: "IRYS",
        decimals: 18
    },
    rpcUrls: ["https://testnet-rpc.irys.xyz/v1/execution-rpc"],
    blockExplorerUrls: []
};

const IrysAddChainButton: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const onClick = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [testnetV1],
                });
            } catch (error) {
                switch ((error as any).code) {
                    case 4100:
                        setError('Request blocked due to spam protection, please try again in a few minutes.');
                        break;
                    case -32602:
                        setError(null);
                        setSuccess('You have already added this network.');
                        break;
                    case -32603:
                        setError(null);
                        setSuccess('You already have this network added.');
                        break;
                    default:
                        setError('Failed to add Irys Network, please check your wallet and try again.');
                        break;
                }
            }
        } else {
            setError('Web3 wallet not found. Install MetaMask or another Ethereum wallet to connect.');
        }
    };

    return (
        <>

            <button
                onClick={onClick}
                className="bg-[#51FFD6] text-[#18191A] px-4 py-2 rounded-md">
                Add Irys Network to Your Wallet
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {success && <div className="text-primary-green mt-2">{success}</div>}
        </>
    );

};
export default IrysAddChainButton;