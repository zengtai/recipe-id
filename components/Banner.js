import { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

const Banner = ({
  className,
  style,
  layout,
  format,
  client = ADS_ID,
  slot,
  responsive,
  layoutKey,
  auto,
  tag,
}) => {
  useEffect(() => {
    try {
      let adsbygoogle = window.adsbygoogle || [];
      if (adsbygoogle.loaded == true) {
        adsbygoogle.push({});
        console.log(`${tag} is pushed for ${slot} by adsbygoogle`);
      } else if (adsbygoogle == undefined) {
        console.log(`adsbygoogle is undefined`);
      }
      console.log(`adsbygoogle`, adsbygoogle);
    } catch (e) {
      console.error(`Adsense Error: `, e);
    }
    // console.log(`useEffect works`);
  }, [tag, slot]);

  return auto ? (
    <div className={`ad-container`}>
      <ins
        className={`adsbygoogle bg-black/10`}
        style={style}
        data-ad-layout={layout}
        data-ad-format={format}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  ) : (
    <div className={`${className} ad-container`}>
      <ins
        className={`adsbygoogle AdContainer bg-black/10`}
        style={style}
        data-ad-layout={layout}
        data-ad-format={format}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
};

export default Banner;
