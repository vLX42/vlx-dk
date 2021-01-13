import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SZ0CH728WN"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SZ0CH728WN');
          `,
          }}
        ></script>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap"
          rel="stylesheet"
        ></link>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
