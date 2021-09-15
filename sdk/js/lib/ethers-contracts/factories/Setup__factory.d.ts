import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Setup, SetupInterface } from "../Setup";
export declare class Setup__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Setup>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Setup;
    connect(signer: Signer): Setup__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061041a806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806334a5fcd414610030575b600080fd5b61004361003e3660046102cb565b610045565b005b60008451116100945760405162461bcd60e51b81526020600482015260166024820152751b9bc819dd585c991a585b9cc81cdc1958da599a595960521b60448201526064015b60405180910390fd5b604080518082019091528481526000602082018190526100b59082906100ea565b6000805461ffff858116620100000263ffffffff199092169087161717905560018290556100e28661013e565b505050505050565b63ffffffff81166000908152600260209081526040909120835180518593610116928492910190610223565b50602091909101516001909101805463ffffffff191663ffffffff9092169190911790555050565b6101478161017e565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b803b6101e25760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161008b565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc80546001600160a01b0319166001600160a01b0392909216919091179055565b828054828255906000526020600020908101928215610278579160200282015b8281111561027857825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190610243565b50610284929150610288565b5090565b5b808211156102845760008155600101610289565b80356001600160a01b03811681146102b457600080fd5b919050565b803561ffff811681146102b457600080fd5b600080600080600060a086880312156102e2578081fd5b6102eb8661029d565b945060208087013567ffffffffffffffff80821115610308578384fd5b818901915089601f83011261031b578384fd5b81358181111561032d5761032d6103ce565b8060051b604051601f19603f83011681018181108582111715610352576103526103ce565b604052828152858101935084860182860187018e1015610370578788fd5b8795505b83861015610399576103858161029d565b855260019590950194938601938601610374565b508099505050505050506103af604087016102b9565b92506103bd606087016102b9565b949793965091946080013592915050565b634e487b7160e01b600052604160045260246000fdfea2646970667358221220fcdc384ba9bb192465c3163a3ba4e00b8b2ca54984a4ae0b03aa6d372aced49364736f6c63430008040033";
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): SetupInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Setup;
}
