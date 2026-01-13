import { tool } from "@langchain/core/tools";
import { vectorStore } from "./docsIndex.js";
import z from "zod";

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

const retriver = vectorStore.asRetriever();

export const knowledgeRetriever = retriver.asTool({
  name: "learning_retriver_base",
  description:
    "Search and return information about syllabus, courses, FAQs, career doubts.",
  schema: z.string().describe("The user query to search in the knowledge base"),
});
