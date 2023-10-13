import { Bars3Icon } from "@heroicons/react/24/outline";

import { useRouter } from "next/router";

const Header = ({ setSidebarOpen }) => {
  const router = useRouter();
  console.log(
    "🚀 ~ file: Header.js:11 ~ Header ~ router:",
    router.pathname
      .split(router.query.data ? "/create-" : "/")
      .join(router.query.data ? "EDIT " : "")
      .replace(/-/, " ")
      .toUpperCase()
  );

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-[20px]">
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h3 className="text-base font-medium">
          {router.pathname
            .split(router.query.data ? "/create-" : "/")
            .join(router.query.data ? "EDIT " : "")
            .replace(/-/, " ")
            .toUpperCase()}
        </h3>
      </div>
    </div>
  );
};

export default Header;
