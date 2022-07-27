import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { CloseIcon, MenuIcon } from "./Icons";

import { fullNavItems } from "../lib/constants";

export default function Navbar({ items }) {
  // console.log(`nav items`, items);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  let navItem = [];
  fullNavItems.map((item) => {
    // 对数组里的每个对象进行处理
    let tmp = {};
    let key = Object.keys(item)[0]; // 键名
    let value = item[key]; // 键值（数组）
    value = value.filter((i) => items.find((j) => j.name == i)); // 筛选数组里保存的值

    tmp[key] = value;
    // item[key] = value;

    if (value.length) {
      navItem.push(tmp);
    }
  });

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/90 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-sm font-medium uppercase text-slate-700 xl:gap-10">
        <Link href={`/`}>
          <a className="m-4 h-10 w-20" title="Home">
            <Image
              src={`/brand/logo.png`}
              height={50}
              width={114}
              layout={`responsive`}
              alt={`Logo`}
            />
          </a>
        </Link>
        <button onClick={toggle} className="navbar-toggler p-4 xl:hidden">
          {isMenuOpen ? CloseIcon(`icon-close`) : MenuIcon(`icon-menu`)}
        </button>
        <ul
          className={`${
            isMenuOpen ? `flex w-full` : `hidden`
          } flex-col divide-y xl:flex xl:flex-row xl:items-center xl:gap-10 xl:divide-y-0`}
        >
          <li className="current mx-4 py-2">
            <Link href={`/`}>
              <a className="py-6 hover:text-orange-600">Home</a>
            </Link>
          </li>
          {navItem &&
            navItem.map((item) => {
              let itemTitle = Object.keys(item)[0];
              let children = Array.from(Object.values(item)[0]);
              let childrenList = children.map((i) => (
                <li className="mx-4 whitespace-nowrap py-2" key={i}>
                  <Link
                    href={`/category/${
                      items.find((cat) => cat.name == i).slug
                    }`}
                  >
                    <a className="hover:text-orange-600">{i}</a>
                  </Link>
                </li>
              ));
              // console.log(`children`, children, `type: `, typeof children);
              return (
                // <li
                //   className="bg-slate-100 p-1"
                //   key={Object.keys(item)[0]}
                //   dangerouslySetInnerHTML={{
                //     __html: `
                //   <span class="navItem-title">${Object.keys(item)[0]}</span>
                //     <ul>${childrenList}</ul>
                //   `,
                //   }}
                // />

                <li key={itemTitle} className="group relative mx-4 py-4">
                  <span className="">{itemTitle}</span>
                  <ul className="left-0 top-12 hidden divide-y px-4 py-2 group-hover:grid xl:absolute xl:border xl:bg-white xl:shadow-lg">
                    {childrenList}
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
    </nav>
  );
}
