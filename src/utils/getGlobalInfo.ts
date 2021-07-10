function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}

async function getGlobalInfo() {
  var etherScanURL =
    "https://api.etherscan.io/api?" +
    "module=proxy&action=eth_call" +
    "&to=" +
    process.env.HEX_CONTRACT_ADDRESS +
    "&data=" +
    process.env.HEX_CONTRACT_GLOBALINFO +
    "&apikey=" +
    process.env.ETHERSCAN_API_KEY;

  return await fetch(etherScanURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      var chunks = chunkSubstr(res.result.substring(2), 64);

      const circulatingSupplyString = parseInt(chunks[11], 16).toString();
      const circulatingSupply = Number(
        circulatingSupplyString.substring(0, circulatingSupplyString.length - 8)
      );

      const lockedHEXString = parseInt(chunks[0], 16).toString();
      const lockedHEX = Number(
        lockedHEXString.substring(0, lockedHEXString.length - 8)
      );

      const percentStaked = (lockedHEX / circulatingSupply) * 100;
      const dailyInfo = {
        circulatingSupply: circulatingSupply,
        lockedHEX: lockedHEX,
        percentStaked: percentStaked,
      };
      return dailyInfo;
    });
}

export default getGlobalInfo;
