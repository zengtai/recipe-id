import App from "next/app";

import { useEffect } from "react";
import { useRouter } from "next/router";

import { getLocalData } from "../lib/api";
import { GA_ID } from "../lib/constants";

import Script from "next/script";

import * as gtag from "../lib/gtag";

import NProgress from "nprogress";
import "../styles/globals.css";
import "../public/nprogress.css";

const MyApp = ({ Component, pageProps }) => {
  const Router = useRouter();
  useEffect(() => {
    const handleRouteStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleRouteDone = (url) => {
      gtag.pageview(url);
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, [Router.events]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  try {
    // 获取全部分类数据
    const allCategories = await getLocalData(`categories`);

    // 获取全部文章
    const posts = await getLocalData(`posts`);

    // 获取全部菜谱
    const recipes = await getLocalData(`recipes`);

    // 提取文章分类id合集
    let postsCategoriesIds = [].concat(posts.map((item) => item.categories));

    // 提取菜谱分类名称合集
    let recipesCategoriesNames = [];
    recipes.map((item) => recipesCategoriesNames.push(item.category));

    // 文章分类id合集去重
    postsCategoriesIds = [...new Set(postsCategoriesIds)];

    // 菜谱分类名称合集去重
    recipesCategoriesNames = [...new Set(recipesCategoriesNames)];

    // 获取文章分类数据
    let postsCategories = allCategories.filter((cat) =>
      postsCategoriesIds.includes(cat.id)
    );

    // 获取菜谱分类数据
    let recipesCategories = allCategories.filter((cat) =>
      recipesCategoriesNames.includes(cat.name)
    );

    // 合并文章分类、菜谱分类数据
    let categories = [].concat(postsCategories, recipesCategories);

    // 总集去重
    categories = [...new Set(categories)];

    return {
      ...appProps,
      pageProps: { global: { categories } },
    };
  } catch (e) {
    return { ...appProps };
  }
};

export default MyApp;
