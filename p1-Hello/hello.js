import { ethers } from 'ethers'
const provider = ethers.getDefaultProvider()
const main = async () => {
  // // 查询 V 神的 ETH 余额
  // const balance1 = await provider.getBalance(`vitalik.eth`)
  // console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance1)} ETH`)
  // 查询我的 ETH 余额
  const balance2 = await provider.getBalance(`leecobaby.eth`)
  console.log(`ETH Balance of leecobaby: ${ethers.utils.formatEther(balance2)} ETH`)
}
main()
