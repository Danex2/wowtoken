import { Box, PageWithHeader, TopNav, Button, Image, Heading } from "bumbag";

export default function Layout({ children }) {
  return (
    <PageWithHeader
      header={
        <TopNav>
          <TopNav.Section>
            <TopNav.Item>
              <Heading use="h4" padding="1rem">
                WoW Token Prices
              </Heading>
            </TopNav.Item>
            <TopNav.Item
              href="https://github.com/Danex2/wowtoken"
              target="_blank"
            >
              github
            </TopNav.Item>
          </TopNav.Section>
        </TopNav>
      }
    >
      <Box>{children}</Box>
    </PageWithHeader>
  );
}
