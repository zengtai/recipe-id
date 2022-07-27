import Image from "./Image";
import Link from "next/link";
import dayjs from "dayjs";
import { resizeImage } from "../lib/api";

export default function List({ items, categories }) {
  return items.map((item) => {
    if (item.categories) {
      let cat = categories
        .filter((cat) => item.categories.includes(cat.id))
        .map((i) => (
          <span
            className="bg-slate-200 px-1 py-0.5 text-xs"
            key={i.name}
            dangerouslySetInnerHTML={{ __html: i.name }}
          />
        ));
      return (
        <article
          className="article mx-4 flex flex-col justify-between border bg-white p-4 shadow-lg"
          key={item.id}
          data-id={item.id}
        >
          <div>
            <Link href={`/article/${item.slug}`}>
              <a
                // title={ post.title }
                title={item.featured_media.url}
              >
                <Image
                  src={resizeImage(item.featured_media.url)}
                  alt={item.title}
                  width={400}
                  height={400}
                  layout={`responsive`}
                />
              </a>
            </Link>
            <h3 className="my-4 text-lg font-medium text-slate-700 no-underline">
              <Link href={`/article/${item.slug}`}>
                <a title={item.title}>
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
                </a>
              </Link>
            </h3>
            <div className="mb-2 flex flex-wrap gap-2">{cat}</div>
          </div>
          <div className="my-6 flex items-end justify-between">
            <div className="mb-0.5 text-xs text-slate-500">
              Updated on {dayjs(item.date_gmt).format("MMM DD, YYYY")}
            </div>
            <div className="text-right text-slate-700">
              <Link href={`/article/${item.slug}`}>
                <a className="read-more whitespace-nowrap" title={item.title}>
                  Read More
                </a>
              </Link>
            </div>
          </div>
        </article>
      );
    } else {
      return (
        <article
          className="article mx-4 flex flex-col justify-between border bg-white p-4 shadow-lg"
          key={item.title}
        >
          <div>
            <Link href={`/recipe/${item.slug}`}>
              <a
                // title={ post.title }
                title={item.title}
              >
                <Image
                  src={resizeImage(item?.["recipe_image_url"])}
                  alt={item.title}
                  width={400}
                  height={400}
                  layout={`responsive`}
                  lazy
                />
              </a>
            </Link>
            <h3 className="my-4 text-lg font-medium text-slate-700 no-underline">
              <Link href={`/recipe/${item.slug}`}>
                <a title={item.title}>
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
                </a>
              </Link>
            </h3>
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="bg-slate-200 px-1 py-0.5 text-xs">
                {item.category}
              </span>
            </div>
          </div>
          <div className="my-6 flex items-end justify-end">
            <div className="text-right text-slate-700">
              <Link href={`/recipe/${item.slug}`}>
                <a className="read-more whitespace-nowrap" title={item.title}>
                  Read More
                </a>
              </Link>
            </div>
          </div>
        </article>
      );
    }
  });
}
