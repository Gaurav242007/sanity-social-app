import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  ArrowLongRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useStateContext } from "../context/StateContext";

export default function Example() {
  const [clicked, setClicked] = useState(false);
  const {
    activeSidebar,
    setActiveSidebar,
    CenterHeaderIcons,
    RightHeaderIcons,
  } = useStateContext();
  const icons = [...CenterHeaderIcons, ...RightHeaderIcons];
  return (
    <div className="sticky r-0 bg-white">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer  px-3 py-1 font-medium">
            {!clicked ? (
              <Bars3Icon
                className="menu-icon"
                onClick={() => setClicked(true)}
              />
            ) : (
              <XMarkIcon
                className="menu-icon"
                onClick={() => setClicked(false)}
              />
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 origin-top-right p-1 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-60">
            {icons?.map((icon) => (
              <Menu.Item>
                <div
                  onClick={() => {
                    icon.onClick();
                    setActiveSidebar(icon.name);
                  }}
                  className={`group flex my-1 rounded-xl p-1 items-center justify-between w-full hover:bg-gray-100 transition cursor-pointer ${
                    icon.name === activeSidebar && "bg-gray-100"
                  }`}
                >
                  <span>{icon?.icon ? icon.icon : icon.element}</span>
                  <ArrowLongRightIcon className={`menu-icon text-gray-200 ${icon.name === activeSidebar && 'text-gray-400'}`} />
                  <span className="group-hover:text-gray-900 group-hover:scale-105 transition font-semibold text-gray-800">
                    {icon?.name}
                  </span>
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
