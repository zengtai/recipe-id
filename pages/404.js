import Layout from "../components/Layout";

export default function custom404({ global }) {
  return (
    <Layout items={global.categories}>
      <div className="container mx-auto">
        <h1>Oops! That page can&#39;t be found.</h1>
      </div>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
