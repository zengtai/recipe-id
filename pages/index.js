import Image from "../components/Image";
import Link from "next/link";
import { getLocalData, resizeImage, removeLink } from "../lib/api";
import Banner from "../components/Banner";
import List from "../components/List";

import { ADS_SLOT_ID } from "../lib/constants";

import { fullNavItems } from "../lib/constants";
import Layout from "../components/Layout";
import Head from "next/head";

export default function Home({ data, global }) {
  // console.log(`posts`, data.posts);
  // console.log(`global`, global);
  // console.log(`categories`, data.categories);

  // console.log(`allCategories`, data.allCategories);
  // console.log(`categoryIds`, data.categoryIds);
  // // console.log(`imageUrls`, data.imageUrls);
  // // console.log(`categories`, data.categories);

  // console.log(`recipes`, data.recipes);

  let posts = data.posts;
  let recipes = data.recipes;
  let categories = data.categories;

  let noLink = false;

  console.log(posts.length);

  return (
    <>
      <Head>
        <title>Recipe Guru</title>
      </Head>
      <Layout items={global.categories}>
        <div className="container mx-auto">
          <Banner
            className={`banner rectangle mt-4`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.home}
            responsive="false"
          />
          <header className="m-4 text-center">
            <h6 className="text-sm font-medium text-orange-600">
              <span>+100 RESEP MUDAH</span>
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
            <List items={recipes.slice(0, 10)} type={`recipes`} />
            <List items={posts} categories={global.categories} type={`posts`} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  // const categories = await getLocalData(`categories`);

  let posts = [];
  let recipes = [];

  const postsOriginal = await getLocalData(`posts`).then((res) =>
    res.slice(0, 16)
  );
  postsOriginal.map((post) => {
    let tmp = {
      title: post.title,
      slug: post.slug,
      categories: post.categories,
      featured_media: { url: post.featured_media.url },
    };
    posts.push(tmp);
  });

  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));

  const recipesOriginal = await getLocalData(`recipes`);
  recipesOriginal.map((recipe) => {
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
        posts,

        recipes,
      },
    },
  };
};
