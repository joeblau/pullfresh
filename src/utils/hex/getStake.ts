import { Contract } from "web3-eth-contract";

const getStake = async (hex: Contract, addr: string, sid: number) => {
  let stakeCount = await hex.methods.stakeCount(addr).call();
  for (let i = 0; i < stakeCount; i++) {
    let stake = await hex.methods.stakeLists(addr, i).call();
    if (stake.stakeId === sid.toString()) {
      return stake;
    }
  }
};

export default getStake;
