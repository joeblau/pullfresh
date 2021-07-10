import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  MenuIcon,
  PresentationChartLineIcon,
  TrendingUpIcon,
  ViewListIcon,
  XIcon,
} from "@heroicons/react/outline";

const account = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Stakes",
    href: "/stakes",
    icon: ViewListIcon,
    count: "19",
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SidebarNavMenu = (props: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const NavMenuItem = (props: any) => (
    <Link href={props.item.href}>
      <a
        className={classNames(
          props.item.href == router.pathname
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            : "text-gray-600 dark:text-gray-300",
          "hover:bg-gray-50 dark:hover:bg-gray-900",
          "hover:text-gray-900 dark:hover:text-gray-100",
          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        )}
      >
        <props.item.icon
          className={classNames(
            props.item.href == router.pathname
              ? "text-gray-500 dark:text-gray-300"
              : "text-gray-400 dark:text-gray-400",
            "group-hover:text-gray-500",
            "mr-3 flex-shrink-0 h-6 w-6"
          )}
          aria-hidden="true"
        />
        <span className="truncate">{props.item.name}</span>
        {props.item.count ? (
          <span
            className={classNames(
              props.item.href == router.pathname
                ? "bg-white dark:bg-black"
                : "bg-gray-100 dark:bg-gray-800",
              "group-hover:bg-gray-200 dark:group-hover:bg-gray-700",
              "ml-auto inline-block py-0.5 px-3 text-xs rounded-full"
            )}
          >
            {props.item.count}
          </span>
        ) : null}
      </a>
    </Link>
  );

  const NavMenu = () => (
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

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-black">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-black">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <div className="h-8 w-auto">{/* Brand Goes Here */}</div>
                </div>
                <NavMenu />
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-800 p-4">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div className="inline-block h-10 w-10 rounded-full overflow-hidden relative">
                      <Image
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        Tom Cook
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="h-8 w-auto">{/* Brand Goes Here */}</div>
              </div>
              <NavMenu />
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-800 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="inline-block h-9 w-9 rounded-full overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Tom Cook
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default SidebarNavMenu;
