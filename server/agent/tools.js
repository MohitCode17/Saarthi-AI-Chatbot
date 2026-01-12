import { tool } from "@langchain/core/tools";

export const getOffers = tool(
  () => {
    // May be call api to get offers and coupon discount from saarthi server....
    return JSON.stringify([
      {
        code: "LAUNCH30",
        discount: "30",
      },
      {
        code: "EARLY20",
        discount: "20",
      },
      {
        code: "FIRST_100",
        discount: "25",
      },
    ]);
  },
  {
    name: "getOffers",
    description: "Call this tool to get the available discounts and offers",
  }
);
