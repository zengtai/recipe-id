// import NextImage from "next/image";

// const customLoader = ({ src }) => {
//   return src;
// };

// export default function Image(props) {
//   return <NextImage {...props} loader={customLoader} unoptimized="true" />;
// }

export default function Image({ src, alt, width, height, lazy }) {
  // return <NextImage {...props} loader={customLoader} unoptimized="true" />;
  // return <img {...props} />;

  // let srcId = alt.replace(/\s/g, "");
  return (
    <picture>
      <img
        width={width ? width : "100%"}
        height={height ? height : "100%"}
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
      />
    </picture>
  );
}
