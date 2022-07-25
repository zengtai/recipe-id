import Layout from "../../components/Layout";
import Image from "next/image";
import { getLocalData, resizeImage, removeLink } from "../../lib/api";

export default function Recipe({ data }) {
  console.log(`post`, data.post);
  // console.log(`imageUrls`, data.imageUrls);
  // console.log(`categories`, data.categories);

  let post = data.post;
  let noLink = false;

  return (
    <Layout>
      <div className="container mx-auto">
        <article className="article" data-id={post.id}>
          <h2 className="m-4 font-bold">
            <div dangerouslySetInnerHTML={{ __html: post.title }} />
          </h2>
          <Image
            src={resizeImage(post.featured_media.url)}
            alt={post.featured_media.id}
            width={120}
            height={120}
          />

          <div
            className="m-4 bg-slate-100 p-4"
            dangerouslySetInnerHTML={{
              __html: noLink ? removeLink(post.content) : post.content,
            }}
          />
        </article>
      </div>
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  // const categories = await getLocalData(`categories`);
  const post = await getLocalData(`posts`).then((res) =>
    res.find((post) => post.slug == ctx.params.slug)
  );
  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,
        post,
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
