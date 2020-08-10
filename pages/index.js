import Layout from "@/components/Layout";
import { Card, Paragraph, Spinner, Flex, Stack, Columns, Box } from "bumbag";
import { numberWithCommas } from "@/utils/numberFormat";
import useSWR from "swr";

export default function Home() {
  const { data, error } = useSWR("/api/token", {
    refreshInterval: 10000,
  });

  if (!data) {
    return (
      <Layout>
        <Flex alignY="center" alignX="center" height="100%">
          <Spinner alignX="center" fontSize="10rem" />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Columns
        alignX="center"
        alignY="center"
        height="100%"
        width="100%"
        orientation="horizontal"
        padding="2rem"
      >
        {data?.map((token) => (
          <Columns.Column>
            <Box>
              <Card
                key={token.region}
                title={token.region.toUpperCase()}
                width="100%"
                footer={
                  <Paragraph fontWeight="bold" alignX="right">
                    {new Date(token.last_updated_timestamp).toLocaleDateString(
                      "en-US"
                    )}
                  </Paragraph>
                }
              >
                <Paragraph
                  alignX="center"
                  fontSize={{
                    default: "5rem",
                    "max-tablet": "3rem",
                  }}
                >
                  {numberWithCommas(token.price)}
                </Paragraph>
              </Card>
            </Box>
          </Columns.Column>
        ))}
      </Columns>
    </Layout>
  );
}
