// 声明只读合约的规则：
// 参数分别为合约地址`address`，合约ABI `abi`，Provider变量`provider`
// const contract = new ethers.Contract(`address`, `abi`, `provider`);

import { ethers } from 'ethers'

// 利用Alchemy的rpc节点连接以太坊网络
// 准备 alchemy API 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md
const INFURA_GOERLI_URL = 'https://goerli.infura.io/v3/8a7b226da3fc4dd3bfb20c10c1179994'
const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN'
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET_URL)

// 第1种输入abi的方式: 复制abi全文
// WETH的abi可以在这里复制：https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code
const abiWETH =
  '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]'
const addressWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // WETH Contract
const contractWETH = new ethers.Contract(addressWETH, abiWETH, provider)

// 第2种输入abi的方式：输入程序需要用到的函数，逗号分隔，ethers会自动帮你转换成相应的abi
// 人类可读abi，以ERC20合约为例
const abiERC20 = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint)'
]
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider)

const main = async () => {
  // 1. 读取WETH合约的链上信息（WETH abi）
  const nameWETH = await contractWETH.name()
  const symbolWETH = await contractWETH.symbol()
  const totalSupplyWETH = await contractWETH.totalSupply()
  console.log('\n1. 读取WETH合约信息')
  console.log(`合约地址: ${addressWETH}`)
  console.log(`名称: ${nameWETH}`)
  console.log(`代号: ${symbolWETH}`)
  console.log(`总供给: ${ethers.utils.formatEther(totalSupplyWETH)}`)
  const balanceWETH = await contractWETH.balanceOf('vitalik.eth')
  console.log(`Vitalik持仓: ${ethers.utils.formatEther(balanceWETH)}\n`)

  // 2. 读取DAI合约的链上信息（IERC20接口合约）
  const nameDAI = await contractDAI.name()
  const symbolDAI = await contractDAI.symbol()
  const totalSupplDAI = await contractDAI.totalSupply()
  console.log('\n2. 读取DAI合约信息')
  console.log(`合约地址: ${addressDAI}`)
  console.log(`名称: ${nameDAI}`)
  console.log(`代号: ${symbolDAI}`)
  console.log(`总供给: ${ethers.utils.formatEther(totalSupplDAI)}`)
  const balanceDAI = await contractDAI.balanceOf('vitalik.eth')
  console.log(`Vitalik持仓: ${ethers.utils.formatEther(balanceDAI)}\n`)
}

const displayWTFContractInfo = async () => {
  const contractAddress = '0xbB83fE24908f71C299fF0f0391A16Ab8F5bE0Cf1'
  const abi = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function balanceOf(address, uint256) view returns (uint256)'
  ]
  const provider = new ethers.providers.JsonRpcBatchProvider(INFURA_GOERLI_URL)
  const wtfContract = new ethers.Contract(contractAddress, abi, provider)
  const name = await wtfContract.name()
  const symbol = await wtfContract.symbol()
  const balance = await wtfContract.balanceOf('0xE3608F65BD6D8b4f88b889a778D97a3F02e23d1A', 0)
  console.log(`\n3. 读取WTF合约信息`)
  console.log(`合约地址: ${contractAddress}`)
  console.log(`名称: ${name}`)
  console.log(`代号: ${symbol}`)
  const passed = balance > 0 ? 'yse' : 'no'
  console.log(`是否通过: ${passed}`)
}

main()
displayWTFContractInfo()
