import NextApp from "next/app";
import { SWRConfig } from "swr";
import "../styles/compiled.css";

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
          refreshInterval: 20000,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    );
  }
}
