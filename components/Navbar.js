import Link from "next/link";
import Image from "next/image";

import { fullNavItems } from "../lib/constants";

export default function Navbar({ navItem }) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/90 shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-10 text-sm font-medium uppercase text-slate-700">
        <Link href={`/`}>
          <a className="" title="Home">
            <Image
              src={`/brand/logo.png`}
              height={50}
              width={114}
              layout={`fixed`}
              alt={`Logo`}
            />
          </a>
        </Link>
        <ul className="flex flex-wrap gap-10">
          <li className="current border-b-4 border-orange-500 py-8">
            <Link href={`/`}>
              <a className="py-2">Home</a>
            </Link>
          </li>
          {navItem.map((item) => {
            let itemTitle = Object.keys(item)[0];
            let children = Array.from(Object.values(item)[0]);
            let childrenList = children.map((i) => <li key={i}>{i}</li>);
            console.log(`children`, children, `type: `, typeof children);
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

              <li key={itemTitle} className="py-8">
                <span className="">{itemTitle}</span>
                <ul className="hidden">{childrenList}</ul>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
