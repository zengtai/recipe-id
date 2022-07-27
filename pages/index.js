import Image from "../components/Image";
import Link from "next/link";
import { getLocalData, resizeImage, removeLink } from "../lib/api";

import List from "../components/List";

import { fullNavItems } from "../lib/constants";
import Layout from "../components/Layout";

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
    <Layout items={global.categories}>
      <div className="container mx-auto">
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
        <div className="grid gap-4 xl:my-8 xl:grid-cols-4 xl:gap-6">
          <List items={recipes.slice(0, 10)} type={`recipes`} />
          <List items={posts} categories={global.categories} type={`posts`} />
        </div>
      </div>
    </Layout>
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
