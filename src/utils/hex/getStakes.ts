import { Contract } from "web3-eth-contract";
import getInterestToDate from "./getInterestToDate";

import getStakeByIndex from "./getStakeByIndex";

const getStakes = async (hex: Contract, address: string) => {
  let stakeCount = await hex.methods.stakeCount(address).call();
  let stakeIndicies = Array.from({ length: stakeCount }, (v, i) => i);

  const stakeLists = await Promise.all(
    stakeIndicies.map(async (index) => {
      const interest = await getInterestToDate(
        hex,
        address,
        undefined,
        index,
        undefined
      );
      let stake = await getStakeByIndex(hex, address, index);
      stake["interest"] = interest;
      return stake;
    })
  );
  return stakeLists;
};

export default getStakes;
