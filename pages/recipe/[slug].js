import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { getLocalData, removeLink } from "../../lib/api";

import Banner from "../../components/Banner";

import { ADS_SLOT_ID, IMAGE_BASE } from "../../lib/constants";
import Head from "next/head";

export default function Recipe({ data, global }) {
  // console.log(`recipe`, data.recipe);
  // console.log(`categoryList`, data.categoryList);
  // console.log(`imageUrls`, data.imageUrls);
  // console.log(`categories`, data.categories);

  let recipe = data.recipe;

  let noLink = false;

  return (
    <>
      <Head>
        <title>{`${recipe.title} | Recipe Guru`}</title>
      </Head>
      <Layout items={global.categories}>
        <div className="container mx-auto">
          <Banner slot={ADS_SLOT_ID.detail} auto tag={recipe.title} />
          <div className="breadcrumb m-4 flex gap-6 whitespace-nowrap text-xs xl:text-sm">
            <div className="breadcrumb-link relative after:absolute after:-right-4 after:opacity-50 after:content-['/']">
              <Link href={`/`}>Home</Link>
            </div>
            <div className="breadcrumb-link relative after:absolute after:-right-4 after:opacity-50 after:content-['/']">
              <Link
                href={`/category/${
                  global.categories.find((item) => item.name == recipe.category)
                    .slug
                }`}
              >
                <a>{recipe.category}</a>
              </Link>
            </div>
            <div className="breadcrumb-link opacity-50">{recipe.title}</div>
          </div>
          <article className="article">
            <div className="mx-4 border xl:flex xl:flex-row-reverse xl:gap-10">
              <div className="relative h-auto w-auto bg-black/5 xl:m-4 xl:h-[400px] xl:w-[400px]">
                <Image
                  src={`${IMAGE_BASE}${recipe.recipe_image_url}`}
                  alt={recipe.title}
                  width={400}
                  height={400}
                  layout={`responsive`}
                />
              </div>

              <div className="recipe-info m-4 grow">
                <h1 className="my-4 font-serif text-3xl font-bold text-slate-700 xl:m-4 xl:mx-0 xl:mb-8 xl:text-6xl xl:font-medium">
                  <div dangerouslySetInnerHTML={{ __html: recipe.title }} />
                </h1>
                <ul className="divide-y border xl:grid xl:h-32 xl:grid-cols-3 xl:divide-y-0 xl:divide-x xl:text-xl">
                  <li className="relative h-20 p-4 after:absolute after:right-3 after:bottom-3 after:h-14 after:w-14 after:bg-ingredients after:bg-contain after:bg-no-repeat after:opacity-10 xl:h-full xl:after:h-24 xl:after:w-24">
                    <span>{recipe.difficulty}</span>
                    <span className="bg-cooking"></span>
                  </li>
                  <li className="relative h-20 p-4 after:absolute after:right-3 after:bottom-3 after:h-14 after:w-14 after:bg-cooking after:bg-contain after:bg-no-repeat after:opacity-10 xl:h-full xl:after:h-24 xl:after:w-24">
                    <span>{recipe.cooking_time}</span>
                  </li>
                  <li className="relative h-20 p-4 after:absolute after:right-3 after:bottom-3 after:h-14 after:w-14 after:bg-serving after:bg-contain after:bg-no-repeat after:opacity-10 xl:h-full xl:after:h-24 xl:after:w-24">
                    <span>{recipe.serves}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="xl:flex">
              <div className="recipe-ingredients m-4 basis-1/3 border p-4">
                <h2 className="relative z-0 mb-3 text-2xl font-bold text-slate-700 after:absolute after:-bottom-1 after:left-0 after:-z-10 after:h-5 after:w-12 after:bg-orange-500/30">
                  Bahan-bahan
                </h2>
                <div>
                  <ul className="list-disc divide-y text-sm marker:text-xl marker:text-orange-600">
                    {JSON.parse(recipe.ingredients).map((item, index) => (
                      <li className="relative list-inside py-3" key={index}>
                        {item.ingredients}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="basis-2/3">
                {recipe.notes.length !== 0 && (
                  <>
                    <div className="m-4 border bg-slate-100 p-4">
                      <h2 className="relative z-0 mb-4  text-2xl font-bold text-slate-700 after:absolute after:-bottom-1 after:left-0 after:-z-10 after:h-5 after:w-12 after:bg-orange-500/30">
                        Catatan
                      </h2>
                      <div>
                        {JSON.parse(
                          noLink ? removeLink(recipe.notes) : recipe.notes
                        ).map((note, index) => (
                          <p key={index}>{note.notes}</p>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="recipe-steps m-4 border p-4">
                  <h2 className="relative z-0 mb-3 text-2xl font-bold text-slate-700 after:absolute after:-bottom-1 after:left-0 after:-z-10 after:h-5 after:w-12 after:bg-orange-500/30">
                    Langkah
                  </h2>
                  <div className="xl:p-8">
                    <ol className="flex flex-col gap-8">
                      {JSON.parse(recipe.step).map((item, index) => (
                        <li
                          className="relative flex rounded-3xl border py-8 pl-24 pr-8 shadow"
                          key={index}
                        >
                          <div className="marker:leading-2 relative -mt-5 list-item list-[decimal-leading-zero] pl-2 marker:text-3xl marker:text-orange-500">
                            {item.step}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const categories = await getLocalData(`categories`);
  const recipe = await getLocalData(`recipes`).then((res) =>
    res.find((recipe) => recipe.slug == ctx.params.slug)
  );

  let categoryList = categories.map((cat) => recipe.category == cat.name);

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,
        recipe,
        categoryList,
      },
    },
  };
};

export const getStaticPaths = async (ctx) => {
  const slugs = await getLocalData(`recipes`).then((res) =>
    res.map((recipe) => recipe.slug)
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
