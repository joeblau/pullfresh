import { useEffect } from "react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import getStakes from "../utils/hex/getStakes";
import getCurrentDay from "../utils/getCurrentDay";
import hexContract from "../utils/hex/hexContract";

const Stakes = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [stakes, setStakes] = useState<Array<any>>(Array<any>());
  const [accounts, setAccounts] = useLocalStorage(
    String(process.env.ACCOUNTS_STORAGE_KEY),
    Array<string>()
  );
  const [currentDay, setCurrentDay] = useState<number>(0);

  useEffect(() => {
    async function updateStakes() {
      const currentDay = await getCurrentDay();

      // if currentDay stat is not null set the currentDay
      if (isNaN(currentDay.stat) === false) {
        setCurrentDay(currentDay.stat);
      }

      if (!isLoaded) {
        const stakes = await Promise.all(
          accounts.map(async (address) => {
            return await getStakes(hexContract, address);
          })
        );
        // flatten stakes array of arrays
        const flattenedStakes = stakes.reduce((a, b) => a.concat(b), []);
        // if stakes == flattedStakes, do nothing
        if (flattenedStakes.length !== stakes.length) {
          setStakes(flattenedStakes);
        }

        setLoaded(true);
      }
    }
    updateStakes();
  });

  const daysLeft = (startDay: string, duration: string) => {
    return endDay(startDay, duration) - currentDay;
  };

  const endDay = (startDay: string, duration: string) => {
    return parseInt(startDay) + parseInt(duration);
  };

  const percentComplete = (startDay: string, duration: string) => {
    return Math.round(
      ((currentDay - parseInt(startDay)) / parseInt(duration)) * 100
    );
  };

  const interest = (interest: number) => {
    let hex = Number(interest) / 100_000_000;
    const roundedHEX = parseFloat(hex.toFixed(3));
    return roundedHEX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const tShares = (shares: string) => {
    const tshares = parseInt(shares) / 1_000_000_000_000;
    // round 3 decimal places
    const roundedTShares = parseFloat(tshares.toFixed(3));
    // add commas into roudedTShares integer
    return roundedTShares.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const stakedHex = (hearts: string) => {
    let hex = parseInt(hearts) / 100_000_000;
    const roundedHEX = parseFloat(hex.toFixed(3));
    return roundedHEX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Stakes
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th
                          data-priority="1"
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Start Day
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          End Day
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Days Left
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Days Completed
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Interest
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          T-Shares
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Staked HEX
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakes.map((stake, stakeIndex) => (
                        <tr
                          key={stakeIndex}
                          className={
                            stakeIndex % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-900"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-100  font-mono">
                            {stake.lockedDay}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-100 font-mono">
                            {endDay(stake.lockedDay, stake.stakedDays)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-100 font-mono">
                            {daysLeft(stake.lockedDay, stake.stakedDays)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-100">
                            <div className="relative pt-1">
                              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200 dark:bg-purple-300">
                                <div
                                  style={{
                                    width: `${percentComplete(
                                      stake.lockedDay,
                                      stake.stakedDays
                                    )}%`,
                                  }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 dark:bg-purple-700"
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-100 font-mono">
                            {interest(stake.interest)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-100 font-mono">
                            {tShares(stake.stakeShares)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-100 font-mono">
                            {stakedHex(stake.stakedHearts)} HEX
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Stakes;
