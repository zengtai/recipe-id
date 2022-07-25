import Image from "next/image";
import Link from "next/link";
import { getLocalData, resizeImage, removeLink } from "../lib/api";
import dayjs from "dayjs";

import { fullNavItems } from "../lib/constants";

export default function Home({ data }) {
  console.log(`posts`, data.posts);

  console.log(`categories`, data.categories);

  console.log(`allCategories`, data.allCategories);
  console.log(`categoryIds`, data.categoryIds);
  // console.log(`imageUrls`, data.imageUrls);
  // console.log(`categories`, data.categories);

  let posts = data.posts;
  let categories = data.categories;

  let noLink = false;

  console.log(posts.length);

  let navItem = [];
  fullNavItems.map((item) => {
    // 对数组里的每个对象进行处理
    let tmp = {};
    let key = Object.keys(item)[0]; // 键名
    let value = item[key]; // 键值（数组）
    value = value.filter((i) => categories.find((j) => j.name == i)); // 筛选数组里保存的值

    tmp[key] = value;
    // item[key] = value;

    if (value.length) {
      navItem.push(tmp);
    }
  });

  console.log(`navItem`, navItem);

  return (
    <>
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
      <div className="container mx-auto mt-32">
        <header className="m-4 text-center">
          <h6 className="text-sm font-medium text-orange-600">
            <span>+100 EASY RECIPES</span>
          </h6>
          <h2 className="my-2 text-4xl font-medium text-slate-700">
            Latest recipes
          </h2>
          <h5 className="my-2 text-slate-400">
            Food trends, easy recipes and healthy meal ideas to help you cook
            smarter.
          </h5>
        </header>
        <div className="grid xl:my-8 xl:grid-cols-4 xl:gap-6">
          {posts.map((post) => {
            let cat = categories
              .filter((cat) => post.categories.includes(cat.id))
              .map((i) => (
                <span
                  className="bg-slate-200 px-1 py-0.5 text-xs"
                  key={i.name}
                  dangerouslySetInnerHTML={{ __html: i.name }}
                />
              ));
            return (
              <article
                className="article mx-4 flex flex-col justify-between border bg-white p-4 shadow-lg"
                key={post.id}
                data-id={post.id}
              >
                <div>
                  <Link href={`/recipe/${post.slug}`}>
                    <a title={post.title}>
                      <Image
                        src={resizeImage(post.featured_media.url)}
                        alt={post.title}
                        width={400}
                        height={400}
                        layout={`responsive`}
                      />
                    </a>
                  </Link>
                  <h3 className="my-4 text-lg font-medium text-slate-700 no-underline">
                    <Link href={`/recipe/${post.slug}`}>
                      <a title={post.title}>
                        <span
                          dangerouslySetInnerHTML={{ __html: post.title }}
                        />
                      </a>
                    </Link>
                  </h3>
                  <div className="mb-2 flex flex-wrap gap-2">{cat}</div>
                </div>
                <div className="my-6 flex items-end justify-between">
                  <div className="mb-0.5 text-xs text-slate-500">
                    Updated on {dayjs(post.date_gmt).format("MMM DD, YYYY")}
                  </div>

                  <div className="text-right text-slate-700">
                    <Link href={`/recipe/${post.slug}`}>
                      <a className="read-more" title={post.title}>
                        Read More
                      </a>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  // const categories = await getLocalData(`categories`);
  const posts = await getLocalData(`posts`).then((res) => res.slice(0, 16));
  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));
  const categoriesData = await getLocalData(`categories`);

  let categoryIds = [];
  posts.forEach((item) => {
    categoryIds = categoryIds.concat(item.categories);
  });
  categoryIds = [...new Set(categoryIds)];

  let categories = categoriesData.filter((item) =>
    categoryIds.includes(item.id)
  );

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,
        posts,
        categories,
        allCategories: categoriesData,
        categoryIds,
      },
    },
  };
};
