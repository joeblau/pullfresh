import interestForDay from "./interestForDay";

const interestForRange = (dailyData: any, myShares: any) => {
  console.log(myShares);
  return dailyData.reduce(
    (s: number, d: number) => s + interestForDay(d, myShares),
    0n
  );
};

export default interestForRange;
