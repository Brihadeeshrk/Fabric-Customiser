import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning={true}>
      <Head />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Arial&family=Geneva&family=Helvetica&family=Lobster&family=Verdana&family=Times+New+Roman&family=Montserrat&family=PT+Sans&family=Ubuntu&family=Open+Sans&family=Playfair+Display&family=Comic+Neue&family=Oxygen&family=Play&family=Gloria+Hallelujah&family=Amaranth&family=Arcade&family=Handlee&family=Domine&family=Satisfy&display=swap"
        rel="stylesheet"
      />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
