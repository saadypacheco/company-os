import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://altiora.vercel.app"),
    title: {
      default: `Saady Pacheco — ${locale === "en" ? "Software Architect · AI · Automation" : locale === "pt" ? "Arquiteto de Software · IA · Automação" : "Arquitecto de Software · IA · Automatización"}`,
      template: "%s | Saady Pacheco",
    },
    description: t("subtitle"),
    keywords: locale === "en"
      ? ["software development", "artificial intelligence", "automation", "LATAM", "Argentina", "Bolivia"]
      : locale === "pt"
        ? ["desenvolvimento de software", "inteligência artificial", "automação", "LATAM", "Argentina", "Bolívia"]
        : ["desarrollo de software", "inteligencia artificial", "automatización", "LATAM", "Argentina", "Bolivia"],
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "pt" ? "pt_BR" : "es_AR",
      siteName: "Saady Pacheco",
    },
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/es`,
        en: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/en`,
        pt: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/pt`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "es" | "en" | "pt")) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});
            `}</Script>
          </>
        )}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');
          `}</Script>
        )}
        {LINKEDIN_PARTNER_ID && (
          <Script id="linkedin-insight" strategy="afterInteractive">{`
            _linkedin_partner_id="${LINKEDIN_PARTNER_ID}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);
          `}</Script>
        )}
      </body>
    </html>
  );
}
