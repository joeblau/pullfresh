import Web3 from "web3";

const HEX_ABI = require("./HEX.abi.json");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213"
);
const CONTRACT_ADDRESS =
  "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39".toLowerCase();

const hexContract = new web3.eth.Contract(HEX_ABI, CONTRACT_ADDRESS);

export default hexContract;
