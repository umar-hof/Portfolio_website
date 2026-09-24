"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureAttribution, track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Analytics wiring.
 *
 * Nothing loads unless NEXT_PUBLIC_GA_MEASUREMENT_ID or NEXT_PUBLIC_GTM_ID is
 * set, so the site ships zero third-party JavaScript by default. GTM wins when
 * both are present (GA can be configured inside it).
 *
 * Also the single place that:
 *   • captures UTM/referrer attribution on each navigation, and
 *   • converts any click on a `data-cta` element into a `cta_click` event, so
 *     buttons stay server components instead of being client-wrapped.
 */
export function Analytics() {
  const pathname = usePathname();

  // Attribution on every navigation.
  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  // Delegated CTA tracking — one listener for the whole app.
  useEffect(() => {
    if (!GA_ID && !GTM_ID) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const el = target.closest<HTMLElement>("[data-cta]");
      if (!el) return;

      const label = el.dataset.cta;
      if (!label) return;

      track("cta_click", {
        cta: label,
        path: window.location.pathname,
        destination: el.getAttribute("href") ?? undefined,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID && !GTM_ID) return null;

  if (GTM_ID) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    );
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`}
      </Script>
    </>
  );
}
