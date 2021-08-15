import { Contract } from "web3-eth-contract";

const getStakeByIndex = async (hex: Contract, addr: string, idx: number) => {
  let stake = await hex.methods.stakeLists(addr, idx).call();
  return stake;
};

export default getStakeByIndex;
