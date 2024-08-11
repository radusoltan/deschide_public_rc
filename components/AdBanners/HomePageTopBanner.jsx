"use client"

import {useEffect} from "react";

export const HomePageTopBanner = () => {

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return <ins className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-format="fluid"
              data-ad-layout-key="-6t+ed+2i-1n-4w"
              data-ad-client="ca-pub-4088962893903575"
              data-ad-slot="7676499094"></ins>
}