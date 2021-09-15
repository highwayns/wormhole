import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BridgeGetters, BridgeGettersInterface } from "../BridgeGetters";
export declare class BridgeGetters__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<BridgeGetters>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): BridgeGetters;
    connect(signer: Signer): BridgeGetters__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610372806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063aa4efa5b1161008c578063b172b22211610066578063b172b2221461022d578063b96c7e4d14610235578063d60b347f1461025e578063fbe3c2cd1461028a57600080fd5b8063aa4efa5b146101c7578063ad5c4648146101ea578063ad66a5f1146101fb57600080fd5b80631a2be4da146100d45780631ff1e286146101155780632c3c02a4146101675780632f3a3d5d1461018a57806384acd1bb1461019b5780639a8a0592146101ac575b600080fd5b6101006100e23660046102b3565b6001600160a01b031660009081526009602052604090205460ff1690565b60405190151581526020015b60405180910390f35b61014f610123366004610313565b61ffff91909116600090815260086020908152604080832093835292905220546001600160a01b031690565b6040516001600160a01b03909116815260200161010c565b6101006101753660046102e1565b60009081526005602052604090205460ff1690565b6001546001600160a01b031661014f565b6000546001600160a01b031661014f565b60025461ffff165b60405161ffff909116815260200161010c565b6101006101d53660046102e1565b60009081526006602052604090205460ff1690565b6004546001600160a01b031661014f565b61021f6102093660046102f9565b61ffff166000908152600b602052604090205490565b60405190815260200161010c565b60035461021f565b61021f6102433660046102b3565b6001600160a01b03166000908152600a602052604090205490565b61010061026c3660046102b3565b6001600160a01b031660009081526007602052604090205460ff1690565b60025462010000900461ffff166101b4565b803561ffff811681146102ae57600080fd5b919050565b6000602082840312156102c4578081fd5b81356001600160a01b03811681146102da578182fd5b9392505050565b6000602082840312156102f2578081fd5b5035919050565b60006020828403121561030a578081fd5b6102da8261029c565b60008060408385031215610325578081fd5b61032e8361029c565b94602093909301359350505056fea26469706673582212208a4d3a3a1d08e083aa7cf9c33509d11e6daaab29c7c9ddeff7af990f6fb6c26d64736f6c63430008040033";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): BridgeGettersInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BridgeGetters;
}
