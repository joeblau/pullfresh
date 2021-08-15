import { Contract } from "web3-eth-contract";

const getLastDataDay = async (hex: Contract) => {
  let globalInfo = await hex.methods.globalInfo().call();
  const lastDay = globalInfo[4];
  return Number.parseInt(lastDay);
};

export default getLastDataDay;
