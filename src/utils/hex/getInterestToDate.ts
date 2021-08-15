import { Contract } from "web3-eth-contract";
import getStakeByIndex from "./getStakeByIndex";
import getStake from "./getStake";
import getLastDataDay from "./getLastDataDay";
import getDataRange from "./getDataRange";
import interestForRange from "./interestForRange";

const getInterestToDate = async (
  hex: Contract,
  addr: string,
  stakeId: any,
  stakeIndex: number,
  stake: any
) => {
  let s;
  if (stake !== undefined) {
    s = stake;
  } else if (stakeIndex !== undefined) {
    s = await getStakeByIndex(hex, addr, stakeIndex);
  } else {
    s = await getStake(hex, addr, stakeId);
  } // Not validating that I have both things correct/matching, error detection needed

  const b = Number.parseInt(s.lockedDay);
  const e = await getLastDataDay(hex); // ostensibly "today"

  if (b >= e) {
    //not started - error
    return 0n;
  } else {
    const data = await getDataRange(hex, b, e);
    return interestForRange(data, BigInt(s.stakeShares));
  }
};

export default getInterestToDate;
