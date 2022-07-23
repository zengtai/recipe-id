import { getLocalData, resizeImage, removeLink } from "../lib/api";

export default function Home({ data }) {
  console.log(`posts`, data.posts);
  // console.log(`imageUrls`, data.imageUrls);
  // console.log(`categories`, data.categories);

  let posts = data.posts;
  let imgUrls = [];

  return (
    <>
      <div className="container mx-auto">
        <h1>This is homepage</h1>
        {posts.map((post) => {
          let srcUrl = post.content
            .match(/src=[\'\"]?(?<url>[^\'\"]*)?[\'\"]/gim)
            .map((i) => i.replace(/(src=)|\"/g, ""));
          imgUrls = imgUrls.concat(srcUrl);
          return (
            <article className="article" key={post.id}>
              <h2 className="m-4 font-bold">
                <div dangerouslySetInnerHTML={{ __html: post.title }} />
              </h2>
              <img
                src={resizeImage(post.featured_media.url)}
                alt={post.featured_media.id}
              />
              <div>{post.content}</div>
              {/* <div
                className="m-4 bg-slate-100 p-4"
                dangerouslySetInnerHTML={{ __html: removeLink(post.content) }}
              /> */}
            </article>
          );
        })}
        {/* {imgUrls.map((i) => {
          i = i.replace(/src=/g, "");
        })} */}
        {console.log(imgUrls)}
        {imgUrls.map((i, index) => (
          <img key={index} src={i} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  // const categories = await getLocalData(`categories`);
  const posts = await getLocalData(`posts`);
  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,
        posts: posts.slice(0, 1),
      },
    },
  };
};
