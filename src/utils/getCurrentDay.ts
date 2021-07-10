async function getCurrentDay() {
  var etherScanURL =
    "https://api.etherscan.io/api?" +
    "module=proxy&action=eth_call" +
    "&to=" +
    process.env.HEX_CONTRACT_ADDRESS +
    "&data=" +
    process.env.HEX_CONTRACT_CURRENTDAY +
    "&apikey=" +
    process.env.ETHERSCAN_API_KEY;

  return await fetch(etherScanURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      var currentDay = parseInt(res.result, 16);
      return currentDay;
    });
}

export default getCurrentDay;
