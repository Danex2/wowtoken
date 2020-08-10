export default async (req, res) => {
  try {
    const blizzard = require("blizzard.js").initialize({
      key: process.env.BLIZZARD_CLIENT_ID,
      secret: process.env.BLIZZARD_CLIENT_SECRET,
    });

    const regions = ["us", "eu", "kr", "tw", "cn"];

    blizzard.getApplicationToken().then(async (response) => {
      blizzard.defaults.token = response.data.access_token;
      const tokenDataForRegion = regions.map(async (region) => {
        return blizzard.wow.token({ origin: region });
      });
      const tokenDataResponse = Promise.all(tokenDataForRegion);
      const tokenData = await tokenDataResponse;
      const formattedTokenData = tokenData.map((token) => ({
        ...token.data,
        region: token.data._links.self.href.split("-")[1],
        price: +token.data.price.toString().substring(0, 6),
      }));
      return res.status(200).json(formattedTokenData);
    });
  } catch (error) {
    console.error(error);
  }
};
