import Layout from "@/components/Layout";
import Link from "next/link";
import { numberWithCommas } from "@/utils/numberFormat";
import useSWR from "swr";

export default function Home() {
  const { data, error } = useSWR("/api/token");
  const { data: regionTokenData } = useSWR(
    "https://cors-anywhere.herokuapp.com/https://wowtokenprices.com/current_prices.json"
  );
  console.table(regionTokenData);
  if (error) {
    return (
      <Layout>
        <div className="flex-1 flex justify-center items-center text-white">
          <h3 className="text-3xl text-center">
            There was an error fetching the token data!
          </h3>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="flex-1 flex justify-center items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-20 w-20 text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            {" "}
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {data?.map((tokenPrice) => {
            return (
              <>
                <div
                  className="bg-gray-700 p-3 text-white rounded-lg hover:bg-gray-900 duration-150"
                  key={tokenPrice.region}
                >
                  <h3 className="text-3xl">{tokenPrice.region}</h3>
                  <p className="text-center text-5xl xl:text-6xl">
                    {numberWithCommas(tokenPrice.price)}
                  </p>
                  <p>
                    {new Date(
                      tokenPrice.last_updated_timestamp
                    ).toLocaleDateString("en-US")}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
