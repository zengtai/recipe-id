import Layout from "../../components/Layout";
import { getLocalData, getAllRemoteData } from "../../lib/api";
import { API_URL, getRemoteData } from "../../lib/api";

export default function Home(
  {
    // data,
    // postsLength,
    // categoryLength,
  }
) {
  // console.log(`data`, data);
  // console.log(`posts`, data.posts.length);
  // console.log(`categories`, data.categories.length);

  // console.log(`categoryLength`, categoryLength);
  // console.log(`postsLength`, postsLength);

  return (
    <>
      <Layout>
        <div className="container mx-auto"></div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  // const posts = await getLocalData(`posts`);
  // const categories = await getLocalData(`categories`);
  // const posts = await getRemoteData(API_URL, `posts`);
  // const categories = await getRemoteData(API_URL, `categories`);

  // const categoryLength = await getAllRemoteData(API_URL, `categories`);
  // const postsLength = await getAllRemoteData(API_URL, `posts`);

  return {
    props: {
      // data: {
      //   posts: posts,
      //   categories: categories,
      // },
      // postsLength,
      // categoryLength,
    },
  };
};
