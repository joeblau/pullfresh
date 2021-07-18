import Web3 from "web3";
import HEX_ABI from "./hex.abi.json";

const web3 = new Web3(
  "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213"
);
const CONTRACT_ADDRESS =
  "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39".toLowerCase();

async function getStakeCount(address: string): Promise<number> {
  try {
    const contract = await new web3.eth.Contract(HEX_ABI, CONTRACT_ADDRESS);
    const stakeCount = await contract.methods.stakeCount(address).call();
    return parseInt(stakeCount);
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export default getStakeCount;
