import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { KeyIcon, PlusIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import useLocalStorage from "../../hooks/useLocalStorage";

const AddPublicKey = ({ presentAccount, setPresentAccount }: any) => {
  const [accounts, setAccounts] = useLocalStorage(
    String(process.env.ACCOUNTS_STORAGE_KEY),
    Array<string>()
  );

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    const newAccounts = [...accounts, data["publicKey"]];
    // remove duplicated values from newAccounts
    const newAccountsSet = newAccounts.reduce((acc, curr) => {
      if (acc.indexOf(curr) === -1) {
        acc.push(curr);
      }
      return acc;
    }, []);
    setAccounts(newAccountsSet);
  };

  const deleteAccount = (account: string) => {
    const newAccounts = accounts.filter((a) => a !== account);
    setAccounts(newAccounts);
  };

  const PublicKeyRow = (props: any) => (
    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
      <div className="w-0 flex-1 flex items-center">
        <KeyIcon
          className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600"
          aria-hidden="true"
        />
        <span className="ml-2 flex-1 w-0 truncate dark:text-white font-mono">
          {props.publicKey}
        </span>
      </div>
      <div className="ml-4 flex-shrink-0">
        <a
          href="#"
          className="font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() => deleteAccount(props.publicKey)}
        >
          Delete
        </a>
      </div>
    </li>
  );

  const AddPublicKey = () => (
    <div className="space-y-1">
      <label
        htmlFor="add-team-members"
        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
      >
        Add Public Key
      </label>
      <p id="add-team-members-helper" className="sr-only">
        Add public key or ens domain
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="flex-grow">
            <input
              {...register("publicKey")}
              type="text"
              className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md dark:bg-black dark:text-white"
              placeholder="New Public Key"
              required
            />
          </div>
          <span className="ml-3">
            <button
              type="submit"
              className="bg-white dark:bg-black inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 
            hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <PlusIcon
                className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Add</span>
            </button>
          </span>
        </div>
      </form>
    </div>
  );

  return (
    <Transition.Root show={presentAccount} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={presentAccount}
        onClose={setPresentAccount}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-black rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-800">
                  <KeyIcon
                    className="h-6 w-6 text-green-600 dark:text-green-300"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200"
                  >
                    Add Public Key
                  </Dialog.Title>

                  {accounts.length > 0 && (
                    <div className="sm:col-span-2 py-4">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Tracked Accounts
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {accounts.map((key) => (
                            <PublicKeyRow key={key} publicKey={key} />
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}

                  <AddPublicKey />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setPresentAccount(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AddPublicKey;
