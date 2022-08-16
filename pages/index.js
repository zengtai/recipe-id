import { getLocalData } from "../lib/api";
import Banner from "../components/Banner";
import List from "../components/List";

import Link from "next/link";

import { ADS_SLOT_ID, fullNavItems } from "../lib/constants";

import Layout from "../components/Layout";
import Head from "next/head";

export default function Home({ data, global }) {
  let recipes = data.recipes;
  let activeCategories = global.categories.filter((item) =>
    fullNavItems[0]?.["Resep"].includes(item.name)
  );
  console.log(`recipes total`, recipes.length);

  return (
    <>
      <Head>
        <title>Recipe Guru</title>
      </Head>
      <Layout items={global.categories}>
        {/* <div className="p-20">{images.join(`\n`)}</div> */}
        <div className="container mx-auto">
          <Banner
            className={`mt-4`}
            style={{ display: "flex", justifyContent: "center" }}
            slot={ADS_SLOT_ID.home}
            responsive="true"
            auto
            tag={`home`}
          />
          <header className="m-4 text-center">
            <h6 className="text-sm font-medium text-orange-600">
              <span>+1000 RESEP MUDAH</span>
            </h6>
            <h2 className="my-2 text-4xl font-medium text-slate-700">
              Resep terbaru
            </h2>
            <h5 className="my-2 text-slate-400">
              Tren makanan, resep mudah, dan ide makanan sehat untuk membantu
              Anda memasak dengan lebih cerdas.
            </h5>
          </header>
          <div className="grid gap-4 xl:my-8 xl:grid-cols-4 xl:gap-6">
            <List items={recipes} type={`recipes`} SLOT_ID={ADS_SLOT_ID.home} />
          </div>
          <div>
            <ul className="m-4 flex flex-wrap gap-2">
              {activeCategories.map((item) => (
                <li key={item.id}>
                  <Link href={`/category/${item.slug}`}>
                    <a className="inline-block border p-2">{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  // const categories = await getLocalData(`categories`);

  let recipes = [];

  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));

  const recipesOriginal = await getLocalData(`recipes`);

  recipesOriginal.slice(0, 20).map((recipe) => {
    let tmp = {
      title: recipe.title,
      slug: recipe.slug,
      category: recipe.category,
      recipe_image_url: recipe.recipe_image_url,
      cooking_time: recipe.cooking_time,
      serves: recipe.serves,
      difficulty: recipe.difficulty,
    };
    recipes.push(tmp);
  });

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,

        recipes,
      },
    },
  };
};
