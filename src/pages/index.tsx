import SidebarNavMenu from "../components/ui/SidebarNavMenu";
import getCurrentDay from "../utils/getCurrentDay";
import getGlobalInfo from "../utils/getGlobalInfo";

/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
} from "@heroicons/react/outline";

const StatCard = ({ cardInfo }: any) => (
  <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
    <dt className="text-sm font-medium text-gray-500 truncate">
      {cardInfo.title}
    </dt>
    <dd className="mt-1 text-3xl font-semibold text-gray-900">
      {cardInfo.stat}
    </dd>
  </div>
);

const Stats = ({ data }: any) => (
  <div>
    <h3 className="text-lg leading-6 font-medium text-gray-900">Global Info</h3>
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {data.dashboardInfo.map((item: any) => (
        <StatCard key={item.title} cardInfo={item} />
      ))}
    </dl>
  </div>
);

const Dashboard = (props: any) => (
  <SidebarNavMenu>
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <Stats data={props} />
          {/* Replace with your content */}
          {/* <div className="py-4">
            <div className="border-4 border-dashed border-gray-200 dark:border-gray-800 rounded-lg h-96" />
          </div> */}
          {/* /End replace */}
        </div>
      </div>
    </main>
  </SidebarNavMenu>
);

export async function getStaticProps(context: any) {
  var dashboardInfo = new Array();

  const currentDay = await getCurrentDay();
  dashboardInfo.push(currentDay);

  const globalInfo = await getGlobalInfo();
  globalInfo.map((item: any) => {
    dashboardInfo.push(item);
  });

  return {
    props: { currentDay: currentDay, dashboardInfo: dashboardInfo },
    revalidate: 5 * 60,
  };
}

export default Dashboard;
