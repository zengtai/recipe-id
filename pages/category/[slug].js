import Layout from "../../components/Layout";
import List from "../../components/List";
import Link from "next/link";
import { getLocalData } from "../../lib/api";

export default function Category({ data, global }) {
  // console.log(`data`, data);
  return (
    <Layout items={global.categories}>
      <div className="container mx-auto">
        <div className="breadcrumb m-4 flex gap-6 whitespace-nowrap text-xs xl:text-sm">
          <div className="breadcrumb-link relative after:absolute after:-right-4 after:opacity-50 after:content-['/']">
            <Link href={`/`}>Home</Link>
          </div>
          <div className="breadcrumb-link opacity-50">
            {data.currentCategory}
          </div>
        </div>
        <h1 className="text-center text-4xl font-medium text-slate-700">
          {data.currentCategory}
        </h1>
        <div className="grid xl:my-8 xl:grid-cols-4 xl:gap-6">
          <List items={data.items} categories={data.allCategories} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  // 1. 当前分类名称：通过slug获取
  const allCategories = await getLocalData(`categories`);

  function getCategoryBySlug(slug) {
    return allCategories.filter((cat) => cat.slug == slug);
  }

  function getCategoryNameBySlug(slug) {
    let category = allCategories.filter((cat) => cat.slug == slug);
    return category[0].name;
  }

  const currentCategory = getCategoryNameBySlug(ctx.params.slug) || null;
  // const currentCategory = getCategoryNameBySlug(ctx.params.slug) || null;

  // 2. 当前分类所属菜谱或文章数据：通过slug获取，slug需要转id
  function getCategoryIdBySlug(slug) {
    let category = allCategories.find((cat) => cat.slug == slug);
    return category.id;
  }
  const posts = await getLocalData(`posts`).then((res) =>
    res.filter((post) =>
      post.categories.includes(getCategoryIdBySlug(ctx.params.slug))
    )
  );
  const recipes = await getLocalData(`recipes`).then((res) =>
    res.filter(
      (recipe) => recipe.category == getCategoryNameBySlug(ctx.params.slug)
    )
  );

  let items = [].concat(recipes, posts);

  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,
        items,
        // categoryList,
        currentCategory,
        allCategories,
      },
    },
  };
};

export const getStaticPaths = async (ctx) => {
  const slugs = await getLocalData(`categories`).then((res) =>
    res.map((cat) => cat.slug)
  );

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: false,
  };
};
