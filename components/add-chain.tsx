"use client";

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

    const onClick = async () => {
        if (window.ethereum) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [testnetV1],
            });
        }
    };
    return (
        <button
            onClick={onClick}
            className="prose prose-invert mx-auto py-8 max-w-7xl">
            Add Irys
        </button>
    );

};
export default IrysAddChainButton;