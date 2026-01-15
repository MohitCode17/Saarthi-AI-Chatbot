import express from "express";
import cors from "cors";
import { agent } from "./agent/graph.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message)
    return res
      .status(400)
      .json({ message: "Invalid query, message is required field." });

  const result = await agent.invoke({
    messages: [
      {
        role: "human",
        content: message,
      },
    ],
  });

  const lastMessage = result.messages.at(-1);

  // 🔑 DETERMINE AGENT
  let agentName = "Frontdesk";

  if (result.nextRepresentative === "MARKETING") {
    agentName = "Marketing";
  } else if (result.nextRepresentative === "LEARNING") {
    agentName = "Learning";
  }

  res.status(200).json({
    message: lastMessage.content,
    agent: agentName,
  });
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running at port: ${port}`));
