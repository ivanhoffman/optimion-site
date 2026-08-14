import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID;

export default function OpenAIAdsPixel() {
  if (!PIXEL_ID) return null;

  return (
    <Script id="openai-ads-pixel" strategy="afterInteractive">
      {`
        (function(w,d,s,u){
          if(w.oaiq)return;
          var q=function(){q.q.push(arguments)};
          q.q=[];w.oaiq=q;
          var js=d.createElement(s);js.async=true;js.src=u;
          var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(js,f);
        })(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
        oaiq("init", { pixelId: ${JSON.stringify(PIXEL_ID)} });
        oaiq("measure", "page_viewed", {
          type: "contents",
          contents: [{ id: window.location.pathname || "/", name: document.title, content_type: "page" }]
        });
      `}
    </Script>
  );
}

