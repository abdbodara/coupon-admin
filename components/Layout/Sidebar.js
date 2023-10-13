import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { RiCoupon4Line } from "react-icons/ri";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { BsHandbag } from "react-icons/bs";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import Link from "next/link";

const navigation = [
  {
    name: "Merchant",
    icon: <RiCoupon4Line className="text-[20px]" />,
    subData: [
      { name: "Merchants", href: "/merchants" },
      { name: "Create Merchant", href: "/create-merchant" },
    ],
  },
  {
    name: "Category",
    icon: <BsHandbag className="text-[20px]" />,
    subData: [{ name: "Categories", href: "/categories" }],
  },
  {
    name: "Coupon",
    icon: <BsHandbag className="text-[20px]" />,
    subData: [
      { name: "Coupons", href: "/coupons" },
      { name: "Create Coupon", href: "/create-coupon" },
    ],
  },
  {
    name: "Offers",
    icon: <BsHandbag className="text-[20px]" />,
    subData: [
      { name: "Offers", href: "/offers" },
      { name: "Create Offer", href: "/create-offers" },
    ],
  },
  {
    name: "Brands",
    icon: <BsHandbag className="text-[20px]" />,
    subData: [
      { name: "Brands", href: "/brands" },
      { name: "Create Brands", href: "/create-brand" },
    ],
  },
  {
    name: "Popular Stores",
    icon: <BsHandbag className="text-[20px]" />,
    subData: [
      { name: "Select Stores", href: "/popular-stores" },
    ],
  },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [open, setOpen] = useState(0);

  const router = useRouter();

  const handleOpen = (value) => setOpen(open === value ? "" : value);

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-56 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden bg-[#1b222c] pb-4">
          <div className="mt-5"></div>
          <div>
            {navigation.map((val, i) => (
              <Accordion
                key={i}
                open={open === i}
                className={`${
                  val.subData.href || open === i
                    ? "bg-[#0c0f14] border-[#2a66ae]"
                    : "border-transparent"
                } text-white overflow-hidden px-6 border-l-[3px]`}
              >
                <AccordionHeader
                  onClick={() => handleOpen(i)}
                  className={`border-0 pt-4 pb-2 focus:outline-none text-white text-base hover:text-white`}
                >
                  <div className="flex justify-between w-full items-center">
                    <div className="flex gap-2 items-center">
                      {val.icon}
                      <h3 className="font-medium">{val.name}</h3>
                    </div>
                    <div>
                      {open === i ? (
                        <GoChevronUp className="text-[18px]" />
                      ) : (
                        <GoChevronDown className="text-[18px]" />
                      )}
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody className="pt-0 pb-2">
                  <ul role="list" className="ml-5 font-normal">
                    {val.subData &&
                      val.subData.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`${
                              item.href === router.pathname
                                ? "font-semibold text-green-500"
                                : "font-normal text-[#acb5ba]"
                            } group flex gap-x-3 rounded-md p-2 text-sm`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </AccordionBody>
              </Accordion>
            ))}
          </div>
          <nav className="flex flex-1 flex-col bg-[#1b222c]">
            <ul role="list" className="flex flex-1 flex-col gap-y-7 px-6">
              <li>
                {/* <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul> */}
              </li>
              <li className="mt-auto">
                <Link
                  href="/login"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  Sign out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <div className="fixed inset-0 flex bg-[#1b222c]/50">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#1b222c] pb-4 ring-1 ring-white/10">
                  <div className="mt-5"></div>
                  <nav className="flex flex-1 flex-col">
                    <div>
                      {navigation.map((val, i) => (
                        <Accordion
                          key={i}
                          open={open === i}
                          className={`${
                            val.subData.href || open === i
                              ? "bg-[#0c0f14] border-[#2a66ae]"
                              : "border-transparent"
                          } text-white overflow-hidden px-6 border-l-[3px]`}
                        >
                          <AccordionHeader
                            onClick={() => handleOpen(i)}
                            className={`border-0 pt-4 pb-2 focus:outline-none text-white text-base hover:text-white`}
                          >
                            <div className="flex justify-between w-full items-center">
                              <div className="flex gap-2 items-center">
                                {val.icon}
                                <h3 className="font-medium">{val.name}</h3>
                              </div>
                              <div>
                                {open === i ? (
                                  <GoChevronUp className="text-[18px]" />
                                ) : (
                                  <GoChevronDown className="text-[18px]" />
                                )}
                              </div>
                            </div>
                          </AccordionHeader>
                          <AccordionBody className="pt-0 pb-2">
                            <ul role="list" className="ml-5 font-normal">
                              {val.subData &&
                                val.subData.map((item) => (
                                  <li key={item.name}>
                                    <a
                                      href={item.href}
                                      className={`${
                                        item.href === router.pathname
                                          ? "font-semibold text-green-500"
                                          : "font-normal text-[#acb5ba]"
                                      } group flex gap-x-3 rounded-md p-2 text-sm`}
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                            </ul>
                          </AccordionBody>
                        </Accordion>
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Sidebar;
