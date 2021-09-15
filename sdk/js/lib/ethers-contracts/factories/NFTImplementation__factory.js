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
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
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
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name_",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol_",
                type: "string",
            },
            {
                internalType: "address",
                name: "owner_",
                type: "address",
            },
            {
                internalType: "uint16",
                name: "chainId_",
                type: "uint16",
            },
            {
                internalType: "bytes32",
                name: "nativeContract_",
                type: "bytes32",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner_",
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
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
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
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
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
        name: "chainId",
        outputs: [
            {
                internalType: "uint16",
                name: "",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nativeContract",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner_",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "uri",
                type: "string",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var _bytecode = "0x608060405234801561001057600080fd5b506116cb806100206000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80636352211e116100ad578063a22cb46511610071578063a22cb46514610261578063b88d4fde14610274578063c87b56dd14610287578063d3fc98641461029a578063e985e9c5146102ad57600080fd5b80636352211e1461020157806370a08231146102145780638da5cb5b1461022757806395d89b41146102385780639a8a05921461024057600080fd5b8063095ea7b3116100f4578063095ea7b3146101a357806323b872dd146101b65780633d6c043b146101c957806342842e0e146101db57806342966c68146101ee57600080fd5b806301ffc9a71461012657806303e728581461014e57806306fdde0314610163578063081812fc14610178575b600080fd5b6101396101343660046113c9565b6102e9565b60405190151581526020015b60405180910390f35b61016161015c366004611401565b61033b565b005b61016b610406565b6040516101459190611533565b61018b610186366004611493565b61049a565b6040516001600160a01b039091168152602001610145565b6101616101b136600461134b565b61052f565b6101616101c436600461125d565b610645565b6008545b604051908152602001610145565b6101616101e936600461125d565b610676565b6101616101fc366004611493565b610691565b61018b61020f366004611493565b6106f1565b6101cd610222366004611211565b610768565b6007546001600160a01b031661018b565b61016b6107ef565b600754600160a81b900461ffff1660405161ffff9091168152602001610145565b61016161026f366004611311565b610801565b610161610282366004611298565b6108c6565b61016b610295366004611493565b6108fe565b6101616102a8366004611374565b610a1b565b6101396102bb36600461122b565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061031a57506001600160e01b03198216635b5e139f60e01b145b8061033557506301ffc9a760e01b6001600160e01b03198316145b92915050565b600754600160a01b900460ff16156103905760405162461bcd60e51b8152602060048201526013602482015272105b1c9958591e481a5b9a5d1a585b1a5e9959606a1b60448201526064015b60405180910390fd5b6007805460ff60a01b1916600160a01b17905584516103b69060009060208801906110c0565b5083516103ca9060019060208701906110c0565b506007805461ffff909316600160a81b02600162ffff0160a01b03199093166001600160a01b0390941693909317919091179091556008555050565b606060008001805461041790611618565b80601f016020809104026020016040519081016040528092919081815260200182805461044390611618565b80156104905780601f1061046557610100808354040283529160200191610490565b820191906000526020600020905b81548152906001019060200180831161047357829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166105135760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610387565b506000908152600460205260409020546001600160a01b031690565b600061053a826106f1565b9050806001600160a01b0316836001600160a01b031614156105a85760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610387565b336001600160a01b03821614806105c457506105c481336102bb565b6106365760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610387565b6106408383610a7a565b505050565b61064f3382610ae8565b61066b5760405162461bcd60e51b815260040161038790611598565b610640838383610bdf565b610640838383604051806020016040528060008152506108c6565b6007546001600160a01b031633146106e55760405162461bcd60e51b815260206004820152601760248201527631b0b63632b91034b9903737ba103a34329037bbb732b960491b6044820152606401610387565b6106ee81610d7f565b50565b6000818152600260205260408120546001600160a01b0316806103355760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610387565b60006001600160a01b0382166107d35760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610387565b506001600160a01b031660009081526003602052604090205490565b60606000600101805461041790611618565b6001600160a01b03821633141561085a5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610387565b3360008181526006602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6108d03383610ae8565b6108ec5760405162461bcd60e51b815260040161038790611598565b6108f884848484610e1a565b50505050565b6000818152600260205260409020546060906001600160a01b031661097d5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610387565b6000828152600560205260409020805461099690611618565b80601f01602080910402602001604051908101604052809291908181526020018280546109c290611618565b8015610a0f5780601f106109e457610100808354040283529160200191610a0f565b820191906000526020600020905b8154815290600101906020018083116109f257829003601f168201915b50505050509050919050565b6007546001600160a01b03163314610a6f5760405162461bcd60e51b815260206004820152601760248201527631b0b63632b91034b9903737ba103a34329037bbb732b960491b6044820152606401610387565b610640838383610e4d565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610aaf826106f1565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610b615760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610387565b6000610b6c836106f1565b9050806001600160a01b0316846001600160a01b03161480610ba75750836001600160a01b0316610b9c8461049a565b6001600160a01b0316145b80610bd757506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610bf2826106f1565b6001600160a01b031614610c5a5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610387565b6001600160a01b038216610cbc5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610387565b610cc7600082610a7a565b6001600160a01b0383166000908152600360205260408120805460019290610cf0908490611601565b90915550506001600160a01b0382166000908152600360205260408120805460019290610d1e9084906115e9565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000610d8a826106f1565b9050610d97600083610a7a565b6001600160a01b0381166000908152600360205260408120805460019290610dc0908490611601565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b610e25848484610bdf565b610e3184848484610fb3565b6108f85760405162461bcd60e51b815260040161038790611546565b6001600160a01b038316610ea35760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610387565b6000828152600260205260409020546001600160a01b031615610f085760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610387565b6001600160a01b0383166000908152600360205260408120805460019290610f319084906115e9565b9091555050600082815260026020908152604080832080546001600160a01b0319166001600160a01b038816179055600582529091208251610f75928401906110c0565b5060405182906001600160a01b038516906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a4505050565b60006001600160a01b0384163b156110b557604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610ff79033908990889088906004016114f6565b602060405180830381600087803b15801561101157600080fd5b505af1925050508015611041575060408051601f3d908101601f1916820190925261103e918101906113e5565b60015b61109b573d80801561106f576040519150601f19603f3d011682016040523d82523d6000602084013e611074565b606091505b5080516110935760405162461bcd60e51b815260040161038790611546565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610bd7565b506001949350505050565b8280546110cc90611618565b90600052602060002090601f0160209004810192826110ee5760008555611134565b82601f1061110757805160ff1916838001178555611134565b82800160010185558215611134579182015b82811115611134578251825591602001919060010190611119565b50611140929150611144565b5090565b5b808211156111405760008155600101611145565b600067ffffffffffffffff8084111561117457611174611669565b604051601f8501601f19908116603f0116810190828211818310171561119c5761119c611669565b816040528093508581528686860111156111b557600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b03811681146111e657600080fd5b919050565b600082601f8301126111fb578081fd5b61120a83833560208501611159565b9392505050565b600060208284031215611222578081fd5b61120a826111cf565b6000806040838503121561123d578081fd5b611246836111cf565b9150611254602084016111cf565b90509250929050565b600080600060608486031215611271578081fd5b61127a846111cf565b9250611288602085016111cf565b9150604084013590509250925092565b600080600080608085870312156112ad578081fd5b6112b6856111cf565b93506112c4602086016111cf565b925060408501359150606085013567ffffffffffffffff8111156112e6578182fd5b8501601f810187136112f6578182fd5b61130587823560208401611159565b91505092959194509250565b60008060408385031215611323578182fd5b61132c836111cf565b915060208301358015158114611340578182fd5b809150509250929050565b6000806040838503121561135d578182fd5b611366836111cf565b946020939093013593505050565b600080600060608486031215611388578283fd5b611391846111cf565b925060208401359150604084013567ffffffffffffffff8111156113b3578182fd5b6113bf868287016111eb565b9150509250925092565b6000602082840312156113da578081fd5b813561120a8161167f565b6000602082840312156113f6578081fd5b815161120a8161167f565b600080600080600060a08688031215611418578081fd5b853567ffffffffffffffff8082111561142f578283fd5b61143b89838a016111eb565b96506020880135915080821115611450578283fd5b5061145d888289016111eb565b94505061146c604087016111cf565b9250606086013561ffff81168114611482578182fd5b949793965091946080013592915050565b6000602082840312156114a4578081fd5b5035919050565b60008151808452815b818110156114d0576020818501810151868301820152016114b4565b818111156114e15782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611529908301846114ab565b9695505050505050565b60208152600061120a60208301846114ab565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b600082198211156115fc576115fc611653565b500190565b60008282101561161357611613611653565b500390565b600181811c9082168061162c57607f821691505b6020821081141561164d57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b0319811681146106ee57600080fdfea2646970667358221220aa82e0a17c0fcbcb05439fe5cd448075082b6e4f6129d0e1a634861b8109838164736f6c63430008040033";
var NFTImplementation__factory = /** @class */ (function (_super) {
    __extends(NFTImplementation__factory, _super);
    function NFTImplementation__factory(signer) {
        return _super.call(this, _abi, _bytecode, signer) || this;
    }
    NFTImplementation__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    NFTImplementation__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    NFTImplementation__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    NFTImplementation__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    NFTImplementation__factory.createInterface = function () {
        return new utils.Interface(_abi);
    };
    NFTImplementation__factory.connect = function (address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    };
    NFTImplementation__factory.bytecode = _bytecode;
    NFTImplementation__factory.abi = _abi;
    return NFTImplementation__factory;
}(ContractFactory));
export { NFTImplementation__factory };
