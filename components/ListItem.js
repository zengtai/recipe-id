import Link from "next/link";
import Image from "./Image";
import Banner from "./Banner";
import { IMAGE_BASE } from "../lib/constants";

export default function ListItem({ item, SLOT_ID, tag }) {
  return (
    <>
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
                src={`${IMAGE_BASE}${item.recipe_image_url}`}
                alt={item.title}
                width={400}
                height={400}
                layout={`responsive`}
                lazy
              />
            </a>
          </Link>
          <div className="mt-3 flex gap-4 text-sm opacity-50">
            <div className="bg-serving bg-contain bg-no-repeat pl-7">
              {item.serves}
            </div>
            <div className="bg-cooking bg-contain bg-no-repeat pl-7">
              {item.cooking_time}
            </div>
          </div>
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
        <div className="my-3 flex items-end justify-end">
          <div className="text-right text-slate-700">
            <Link href={`/recipe/${item.slug}`}>
              <a
                className="read-more block whitespace-nowrap"
                title={item.title}
              >
                Read More
              </a>
            </Link>
          </div>
        </div>
      </article>
      {SLOT_ID ? (
        // <Banner
        //   // className={`ad-container`}
        //   slot={SLOT_ID}
        //   style={{ display: `block` }}
        //   layoutKey={`+3u+p1-56-75+1gi`}
        //   // layoutKey={`-5b+bt-55-75+1gf`}
        //   layout={`fluid`}
        //   tag={tag}
        //   index={index}
        // />
        <Banner
          className={`mt-4`}
          style={{ display: "flex", justifyContent: "center" }}
          slot={SLOT_ID}
          responsive="true"
          auto
          tag={tag}
        />
      ) : null}
    </>
  );
}
