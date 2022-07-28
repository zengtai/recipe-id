import * as fs from "fs";
import path from "path";

export const API_URL = `https://resepkoki.id/wp-json/wp/v2/`;

export async function fetcher(url) {
  try {
    const json = fetch(url).then((res) => res.json());
    return json;
  } catch (e) {
    console.error(e.messenge);
  }
}

let remoteDataLength = 0;

export async function getRemoteData(url, type, page) {
  const remoteData = await fetch(`${url}${type}?page=${page ? page : 1}`).then(
    async (res) => {
      remoteDataLength = res.headers.get(`x-wp-total`);
      return {
        data: await res.json(),
        total: remoteDataLength,
      };
    }
  );
  console.log(`get remote data`);
  return remoteData;
}

export const getLocalData = async (type) => {
  const MODE = ``; // 控制是否强制更新
  // const mode = `renew`;
  const localDataPath = path.join(process.cwd(), `data`, `${type}.json`);
  try {
    if (!fs.existsSync(localDataPath)) {
      console.log(`没有发现本地文件`);

      getAllRemoteData(API_URL, type);
      // let remoteData = await getRemoteData(API_URL, type);

      // fs.writeFileSync(
      //   localDataPath,
      //   JSON.stringify(
      //     localDataPath,
      //     JSON.stringify({
      //       data: formatData(remoteData, type),
      //       total: remoteData.length,
      //     })
      //   )
      // );
    } else {
      if (MODE && MODE == `renew`) {
        console.log(`强制更新`);

        getAllRemoteData(API_URL, type);

        console.log(`强制更新完毕`);
      }
      // let remoteContentLength = await getRemoteContentLength();
      // if (
      //   JSON.parse(fs.readFileSync(localDataPath)).contentLength !==
      //   remoteContentLength
      // ) {
      //   let remoteData = await getRemoteData();
      //   console.log(
      //     `renew now: remote -`,
      //     remoteContentLength,
      //     ` vs local - `,
      //     JSON.parse(fs.readFileSync(localDataPath)).contentLength
      //   );
      //   console.log(`renew data`);
      //   fs.writeFileSync(localDataPath, JSON.stringify(remoteData));
      // }
    }
    return JSON.parse(fs.readFileSync(localDataPath)).data;
    // switch (type) {
    //   case `categories`:
    //     return slug
    //       ? {
    //           category: localData.data.categories.find(
    //             (item) => item.slug === slug
    //           ).name,
    //           data: localData.data.basicData
    //             .filter((item) => item.category.slug === slug)
    //             .map((item) => {
    //               let tmp = Object.assign({}, item);
    //               delete tmp.category;
    //               return tmp;
    //             }),
    //         }
    //       : localData.data.categories;
    //   case `posts`:
    //     let slugs = localData.data.basicData.map((item) => item.slug);
    //     return slug
    //       ? {
    //           data: localData.data.fullData.find((item) => item.slug === slug),
    //           related: localData.data.basicData
    //             .filter((item) => item.slug !== slug)
    //             .slice(0, 56),
    //         }
    //       : slugs;
    //   default:
    //     return localData;
    // }
    // return data;
  } catch (error) {
    console.error(error);
  }
};

function formatData(data, type) {
  let tmpData = [];
  // let tmpImgData = [];
  // let tmpCoverData = [];
  switch (type) {
    case `categories`:
      data.map((item) => {
        let tmp = {};
        tmp.id = item.id;
        tmp.name = item.name;
        tmp.slug = item.slug;
        tmp.count = item.count;
        tmp.parent = item.parent;
        tmpData.push(tmp);
      });
      return tmpData;
    case `posts`:
      data.map((item) => {
        let tmp = {};
        tmp.id = item.id;
        tmp.title = item.title?.rendered;
        tmp.slug = item.slug;
        tmp.content = item.content?.rendered;
        tmp.excerpt = item.excerpt?.rendered;
        tmp.categories = item.categories;
        tmp.date_gmt = item.date_gmt;
        tmp.modified_gmt = item.modified_gmt;
        tmp.meta = { description: item.yoast_head_json?.description };
        tmp.featured_media = {
          id: item.featured_media,
          url: item.jetpack_featured_media_url,
        };
        // let coverUrls = item.jetpack_featured_media_url.replace(
        //   /\.(jpg|png|jpeg)\?fit=(\d+)%2C(\d+)&/g,
        //   ".$1?fit=400,400&"
        // );
        // let imgUrls = item.content?.rendered.match(
        //   /src=[\'\"]?(?<url>[^\'\"]*)?[\'\"]/gim
        // );
        // imgUrls = imgUrls
        //   ? imgUrls.map((i) => i.replace(/(src=)|\"/g, ""))
        //   : [];
        // tmpCoverData = tmpCoverData.concat(coverUrls);
        // tmpImgData = tmpImgData.concat(imgUrls);

        tmpData.push(tmp);
      });
      return {
        tmpData,
        // tmpImgData,
        // tmpCoverData,
      };
    default:
      break;
  }
}

export async function getAllRemoteData(url, type, per_page = 10) {
  const localDataPath = path.join(process.cwd(), `data`, `${type}.json`);
  // const localImageDataPath = path.join(process.cwd(), `data`, `images.json`);
  // const localCoverDataPath = path.join(process.cwd(), `data`, `covers.json`);
  let localDataLength = 0;
  try {
    localDataLength = fs.existsSync(localDataPath)
      ? JSON.parse(
          fs.readFileSync(localDataPath, (err) => {
            if (err) throw err;
            console.log("读取成功");
          })
        ).length
      : 0;
  } catch (e) {
    console.error(e);
  }

  const remoteDataLength = await fetch(`${url}${type}`).then((res) =>
    res.headers.get(`x-wp-total`)
  );

  const totalPage = Math.ceil(remoteDataLength / per_page);
  console.log(`totalPage`, totalPage);
  let remoteData = [];

  for (let page = 1; page <= totalPage; page++) {
    let data = await fetch(
      `${url}${type}?per_page=${per_page}&page=${page}`
    ).then((res) => res.json());

    remoteData = remoteData.concat(data);

    if (type == "posts") {
      let tmp = formatData(remoteData, type);
      fs.writeFile(
        localDataPath,
        JSON.stringify({
          data: tmp.tmpData,
          total: remoteData.length,
        }),
        (err) => {
          if (err) throw err;
          console.log("文章已保存");
        }
      );
      // fs.writeFile(
      //   localImageDataPath,
      //   JSON.stringify({
      //     data: tmp.tmpImgData,
      //     total: tmp.tmpImgData.length,
      //   }),
      //   (err) => {
      //     if (err) throw err;
      //     console.log("文章内图片地址已保存");
      //   }
      // );
      // fs.writeFile(
      //   localCoverDataPath,
      //   JSON.stringify({
      //     data: tmp.tmpCoverData,
      //     total: tmp.tmpCoverData.length,
      //   }),
      //   (err) => {
      //     if (err) throw err;
      //     console.log("文章封面图片地址已保存");
      //   }
      // );
    } else {
      fs.writeFile(
        localDataPath,
        JSON.stringify({
          data: remoteData,
          total: remoteData.length,
        }),
        (err) => {
          if (err) throw err;
          console.log("文章分类已保存");
        }
      );
    }

    console.log(
      `当前抓取第 ${page} / ${totalPage} 页，已成功获取 ${remoteData.length} 条数据`
    );
  }
  console.log(`抓取完成！`, remoteData.length);

  if (!fs.existsSync(localDataPath)) {
    console.log(`WTF??`);
  } else {
    if (localDataLength < remoteDataLength) {
      console.log(`本地数据少于远程数据`);
    }
  }

  return localDataLength || `没事了`;
}

export function resizeImage(url, width = 400, height = 400) {
  return url.replace(/fit=(.*)/g, `resize=${width},${height}&ssl=1`);
}

export const removeLink = (data) => {
  return data.replace(/(<\/?a[^>]*>)(?!.*\1)/gi, ``);
};

export const getCategoryNameById = async (id) => {
  const categories = await getLocalData(`categories`);
  return categories.filter((cat) => cat.id == id).name;
};
