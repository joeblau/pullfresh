import { Contract } from "web3-eth-contract";

const HEARTS_UINT_SHIFT = 72n;
const HEARTS_MASK = (1n << HEARTS_UINT_SHIFT) - 1n;
const SATS_UINT_SHIFT = 56n;
const SATS_MASK = (1n << SATS_UINT_SHIFT) - 1n;
const decodeDailyData = (encDay: any) => {
  let v = BigInt(encDay);
  let payout = v & HEARTS_MASK;
  v = v >> HEARTS_UINT_SHIFT;
  let shares = v & HEARTS_MASK;
  v = v >> HEARTS_UINT_SHIFT;
  let sats = v & SATS_MASK;
  return { payout, shares, sats };
};

const getDataRange = async (
  hex: Contract,
  beginDay: number,
  endDay: number
) => {
  const dataRange = await hex.methods.dailyDataRange(beginDay, endDay).call();
  const data = [];
  for (let i = 0; i < dataRange.length; i++) {
    data.push(decodeDailyData(dataRange[i]));
  }
  return data;
};

export default getDataRange;
