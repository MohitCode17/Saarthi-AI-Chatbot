/**
 * Steps
 * 1. Load the documents
 * 2. Chunk the documents
 * 3. Generate the embeddings
 * 4. Store the vector embeddings - vector database
 *
 * Then using it on chatbot...
 */
import path from "path";
import { fileURLToPath } from "url";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME);

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});

export async function indexTheDocument(filePath) {
  const loader = new PDFLoader(filePath, { splitPages: false });
  const doc = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const texts = await textSplitter.splitText(doc[0].pageContent);

  const documents = texts.map((chunk) => {
    return {
      pageContent: chunk,
      metadata: doc[0].metadata,
    };
  });

  await vectorStore.addDocuments(documents);

  console.log("Done");
}

const pdfPath = path.resolve(__dirname, "../sit.pdf");
// indexTheDocument(pdfPath);
