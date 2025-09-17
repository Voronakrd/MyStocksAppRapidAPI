import 'dotenv/config';

export default {
  expo: {
    name: "MyStocksApp",
    slug: "mystocksapp",
    version: "1.0.0",
    orientation: "portrait",
    sdkVersion: "51.0.0",
    platforms: ["ios", "android", "web"],
    extra: {
      RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
      RAPIDAPI_HOST: process.env.RAPIDAPI_HOST,
    },
  },
};
