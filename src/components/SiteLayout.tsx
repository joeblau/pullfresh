import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Head from "next/head";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import AddPublicKey from "./ui/AddPublicKeys";
import { useDarkMode } from "next-dark-mode";
import NavMenu from "./ui/NavMenu";
import useLocalStorage from "../lib/useLocalStorage";

const SiteLayout = (props: any) => {
  const [accounts, setAccounts] = useLocalStorage(
    String(process.env.ACCOUNTS_STORAGE_KEY),
    Array<string>()
  );
  const [presentSidebar, setPresentSidebar] = useState(false);
  const [presentAccount, setPresentAccount] = useState(false);
  const { darkModeActive } = useDarkMode();

  const AccountsButton = () => (
    <div className="flex justify-center border-t border-gray-200 dark:border-gray-800 p-4">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          setPresentSidebar(false);
          setPresentAccount(true);
        }}
      >
        Accounts
        <div className="pl-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
            {accounts.length}
          </span>
        </div>
      </button>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-black">
      <Head>
        {darkModeActive ? (
          <>
            <link rel="manifest" href="/images/icons/manifest-dark.json" />
            <meta name="theme-color" content="#000000" />
          </>
        ) : (
          <>
            <link rel="manifest" href="/images/icons/manifest-light.json" />
            <meta name="theme-color" content="#FFFFFF" />
          </>
        )}
      </Head>
      <AddPublicKey
        presentAccount={presentAccount}
        setPresentAccount={setPresentAccount}
      />
      <Transition.Root show={presentSidebar} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={presentSidebar}
          onClose={setPresentSidebar}
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
                    onClick={() => setPresentSidebar(false)}
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
                <NavMenu setPresentSidebar={setPresentSidebar} />
              </div>
              <AccountsButton />
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

            <AccountsButton />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setPresentSidebar(true)}
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

export default SiteLayout;
