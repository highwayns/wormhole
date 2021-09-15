/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { utils, Contract, ContractFactory } from "ethers";
var _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "src",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "guy",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "dst",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Deposit",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "src",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "dst",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "src",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Withdrawal",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
    {
        inputs: [],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "guy",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "dst",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "src",
                type: "address",
            },
            {
                internalType: "address",
                name: "dst",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var _bytecode = "0x60c0604052600d60808190526c2bb930b83832b21022ba3432b960991b60a090815261002e916000919061007a565b50604080518082019091526004808252630ae8aa8960e31b602090920191825261005a9160019161007a565b506002805460ff1916601217905534801561007457600080fd5b5061014e565b82805461008690610113565b90600052602060002090601f0160209004810192826100a857600085556100ee565b82601f106100c157805160ff19168380011785556100ee565b828001600101855582156100ee579182015b828111156100ee5782518255916020019190600101906100d3565b506100fa9291506100fe565b5090565b5b808211156100fa57600081556001016100ff565b600181811c9082168061012757607f821691505b6020821081141561014857634e487b7160e01b600052602260045260246000fd5b50919050565b6107c28061015d6000396000f3fe6080604052600436106100a05760003560e01c8063313ce56711610064578063313ce5671461016f57806370a082311461019b57806395d89b41146101c8578063a9059cbb146101dd578063d0e30db0146100af578063dd62ed3e146101fd576100af565b806306fdde03146100b7578063095ea7b3146100e257806318160ddd1461011257806323b872dd1461012f5780632e1a7d4d1461014f576100af565b366100af576100ad610235565b005b6100ad610235565b3480156100c357600080fd5b506100cc610290565b6040516100d991906106b9565b60405180910390f35b3480156100ee57600080fd5b506101026100fd366004610678565b61031e565b60405190151581526020016100d9565b34801561011e57600080fd5b50475b6040519081526020016100d9565b34801561013b57600080fd5b5061010261014a36600461063d565b61038a565b34801561015b57600080fd5b506100ad61016a3660046106a1565b61050e565b34801561017b57600080fd5b506002546101899060ff1681565b60405160ff90911681526020016100d9565b3480156101a757600080fd5b506101216101b63660046105f1565b60036020526000908152604090205481565b3480156101d457600080fd5b506100cc6105b4565b3480156101e957600080fd5b506101026101f8366004610678565b6105c1565b34801561020957600080fd5b5061012161021836600461060b565b600460209081526000928352604080842090915290825290205481565b336000908152600360205260408120805434929061025490849061070c565b909155505060405134815233907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2565b6000805461029d9061073b565b80601f01602080910402602001604051908101604052809291908181526020018280546102c99061073b565b80156103165780601f106102eb57610100808354040283529160200191610316565b820191906000526020600020905b8154815290600101906020018083116102f957829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103799086815260200190565b60405180910390a350600192915050565b6001600160a01b0383166000908152600360205260408120548211156103af57600080fd5b6001600160a01b03841633148015906103ed57506001600160a01b038416600090815260046020908152604080832033845290915290205460001914155b1561045b576001600160a01b038416600090815260046020908152604080832033845290915290205482111561042257600080fd5b6001600160a01b038416600090815260046020908152604080832033845290915281208054849290610455908490610724565b90915550505b6001600160a01b03841660009081526003602052604081208054849290610483908490610724565b90915550506001600160a01b038316600090815260036020526040812080548492906104b090849061070c565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516104fc91815260200190565b60405180910390a35060019392505050565b3360009081526003602052604090205481111561052a57600080fd5b3360009081526003602052604081208054839290610549908490610724565b9091555050604051339082156108fc029083906000818181858888f1935050505015801561057b573d6000803e3d6000fd5b5060405181815233907f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b659060200160405180910390a250565b6001805461029d9061073b565b60006105ce33848461038a565b9392505050565b80356001600160a01b03811681146105ec57600080fd5b919050565b600060208284031215610602578081fd5b6105ce826105d5565b6000806040838503121561061d578081fd5b610626836105d5565b9150610634602084016105d5565b90509250929050565b600080600060608486031215610651578081fd5b61065a846105d5565b9250610668602085016105d5565b9150604084013590509250925092565b6000806040838503121561068a578182fd5b610693836105d5565b946020939093013593505050565b6000602082840312156106b2578081fd5b5035919050565b6000602080835283518082850152825b818110156106e5578581018301518582016040015282016106c9565b818111156106f65783604083870101525b50601f01601f1916929092016040019392505050565b6000821982111561071f5761071f610776565b500190565b60008282101561073657610736610776565b500390565b600181811c9082168061074f57607f821691505b6020821081141561077057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220f4e3d47fa5d6c9d7a735a4f0b1c0c8efc79c485b20846a5e4942a194e918d3a764736f6c63430008040033";
var MockWETH9__factory = /** @class */ (function (_super) {
    __extends(MockWETH9__factory, _super);
    function MockWETH9__factory(signer) {
        return _super.call(this, _abi, _bytecode, signer) || this;
    }
    MockWETH9__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    MockWETH9__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    MockWETH9__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    MockWETH9__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    MockWETH9__factory.createInterface = function () {
        return new utils.Interface(_abi);
    };
    MockWETH9__factory.connect = function (address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    };
    MockWETH9__factory.bytecode = _bytecode;
    MockWETH9__factory.abi = _abi;
    return MockWETH9__factory;
}(ContractFactory));
export { MockWETH9__factory };
