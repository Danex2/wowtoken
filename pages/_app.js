import NextApp from "next/app";
import { Provider as BumbagProvider } from "bumbag";
import { SWRConfig } from "swr";

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <BumbagProvider colorMode="dark" isSSR>
        <SWRConfig
          value={{
            fetcher: (...args) => fetch(...args).then((res) => res.json()),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </BumbagProvider>
    );
  }
}
