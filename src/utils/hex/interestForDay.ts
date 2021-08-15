const interestForDay = (dayObj: any, myShares: number) => {
  return (myShares * dayObj.payout) / dayObj.shares;
};

export default interestForDay;
