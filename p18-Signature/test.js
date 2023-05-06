import { ethers } from 'ethers'

const ALCHEMY_ARB_URL = `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_ARB_KEY}`
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_ARB_URL)
const gasPrice = await provider.getGasPrice()
console.log('Base Gas Price:', gasPrice.toString())

// 估算消耗的 gas ，在 arb 上好像算的不准
const estimatedGasLimit = await provider.estimateGas(
  factoryNFT.getDeployTransaction('WTF Signature', 'WTF', wallet.address).data
)
console.log('Estimated Gas Limit:', ethers.utils.formatUnits(estimatedGasLimit, 'gwei') + 'Gwei')
