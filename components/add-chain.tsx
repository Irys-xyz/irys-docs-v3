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

    const onClick = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [testnetV1],
                });
            } catch (error) {
                console.error('Failed to add Irys network:', error);
                setError('Failed to add Irys Network, please check your wallet and try again.');
            }
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
        </>
    );

};
export default IrysAddChainButton;