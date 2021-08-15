import { Contract } from "web3-eth-contract";

async function getStakeCount(hex: Contract, address: string): Promise<number> {
  try {
    const stakeCount = await hex.methods.stakeCount(address).call();
    return parseInt(stakeCount);
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export default getStakeCount;
