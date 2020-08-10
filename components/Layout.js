import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col p-5">
      <Head>
        <title>World of Warcract Token Prices</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
      <footer>Some footer text</footer>
    </div>
  );
}
