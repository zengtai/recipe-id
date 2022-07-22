import { getLocalData } from "../lib/api";

export default function Home({ data }) {
  console.log(`categories`, data.categories);
  return (
    <>
      <h1>This is homepage</h1>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const categories = await getLocalData(`categories`);
  return {
    props: {
      data: {
        categories,
      },
    },
  };
};
