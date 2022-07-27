import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { getLocalData, removeLink } from "../../lib/api";

import { ADS_SLOT_ID } from "../../lib/constants";
import Banner from "../../components/Banner";

import Head from "next/head";

export default function Recipe({ data, global }) {
  // console.log(`post`, data.post);
  // console.log(`categoryList`, data.categoryList);
  // console.log(`imageUrls`, data.imageUrls);
  // console.log(`categories`, data.categories);

  let post = data.post;
  let noLink = false;

  return (
    <>
      <Head>
        <title>{`${post.title} | Recipe Guru`}</title>
      </Head>
      <Layout items={global.categories}>
        <div className="container mx-auto">
          <Banner
            className={`banner rectangle mt-4`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.detail}
            responsive="false"
          />
          <div className="breadcrumb m-4 flex gap-6 whitespace-nowrap text-xs xl:text-sm">
            <div className="breadcrumb-link relative after:absolute after:-right-4 after:opacity-50 after:content-['/']">
              <Link href={`/`}>Home</Link>
            </div>
            <div className="breadcrumb-link opacity-50">{post.title}</div>
          </div>
          <article className="article max-w-5xl" data-id={post.id}>
            <h1 className="m-4 text-4xl font-medium text-slate-700">
              <div dangerouslySetInnerHTML={{ __html: post.title }} />
            </h1>

            {/* <Image
            src={resizeImage(post.featured_media.url)}
            alt={post.featured_media.id}
            width={120}
            height={120}
          /> */}

            <div
              className="article-content m-4 border bg-slate-100 p-8"
              dangerouslySetInnerHTML={{
                __html: noLink ? removeLink(post.content) : post.content,
              }}
            />
          </article>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const categories = await getLocalData(`categories`);
  const post = await getLocalData(`posts`).then((res) =>
    res.find((post) => post.slug == ctx.params.slug)
  );
  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));

  let categoryList = categories.map((cat) => post.categories.includes(cat.id));

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,
        post,
        categoryList,
      },
    },
  };
};

export const getStaticPaths = async (ctx) => {
  const slugs = await getLocalData(`posts`).then((res) =>
    res.map((post) => post.slug)
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
