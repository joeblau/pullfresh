import Link from "next/link";
import {
  HomeIcon,
  PresentationChartLineIcon,
  TrendingUpIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import getStakeCount from "../../utils/getStakeCount";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const account = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Stakes",
    href: "/stakes",
    icon: ViewListIcon,
    count: "0",
  },
];

const charts = [
  { name: "Price", href: "/price", icon: TrendingUpIcon },
  {
    name: "Comparison",
    href: "/comparison",
    icon: PresentationChartLineIcon,
  },
];

const NavMenu = ({ setPresentSidebar }: any) => {
  const router = useRouter();
  const [accounts, setAccounts] = useLocalStorage(
    String(process.env.ACCOUNTS_STORAGE_KEY),
    Array<string>()
  );
  const [stakeCount, setStakeCount] = useState(0);

  useEffect(() => {
    async function updateStakeCount() {
      const stakeCounts = await Promise.all(
        accounts.map(async (address) => {
          return await getStakeCount(address);
        })
      );

      const stakeCountSum = stakeCounts.reduce((a, b) => a + b, 0);
      setStakeCount(stakeCountSum);
    }
    updateStakeCount();
  });

  const NavMenuItem = ({ item }: any) => (
    <Link href={item.href}>
      <a
        className={classNames(
          item.href == router.pathname
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            : "text-gray-600 dark:text-gray-300",
          "hover:bg-gray-50 dark:hover:bg-gray-900",
          "hover:text-gray-900 dark:hover:text-gray-100",
          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        )}
        onClick={() => {
          setPresentSidebar(false);
        }}
      >
        <item.icon
          className={classNames(
            item.href == router.pathname
              ? "text-gray-500 dark:text-gray-300"
              : "text-gray-400 dark:text-gray-400",
            "group-hover:text-gray-500",
            "mr-3 flex-shrink-0 h-6 w-6"
          )}
          aria-hidden="true"
        />
        <span className="truncate">{item.name}</span>
        {item.count ? (
          <span
            className={classNames(
              item.href == router.pathname
                ? "bg-white dark:bg-black"
                : "bg-gray-100 dark:bg-gray-800",
              "group-hover:bg-gray-200 dark:group-hover:bg-gray-700",
              "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
            )}
          >
            {stakeCount}
          </span>
        ) : null}
      </a>
    </Link>
  );

  return (
    <nav className="mt-5 flex-1 px-2 bg-white dark:bg-black space-y-1">
      <div className="space-y-1">
        {account.map((item) => (
          <NavMenuItem key={item.name} item={item} />
        ))}
      </div>
      <div className="pt-8">
        <h3
          className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
          id="projects-headline"
        >
          Charts
        </h3>
        <div className="mt-1 space-y-1" aria-labelledby="projects-headline">
          {charts.map((item) => (
            <NavMenuItem key={item.name} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
