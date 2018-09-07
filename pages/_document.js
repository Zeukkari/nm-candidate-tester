import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyCustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Norigin Media</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          {this.props.styleTags}
        </Head>

        <body
          style={{
            margin: '0px',
            backgroundColor: '#202020',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
