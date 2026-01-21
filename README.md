# Saarthi — Institute Support Chatbot 🤖🎓

Saarthi is an **agent-based institute support chatbot** built for **Saarthi Institute of Technology (SIT)**. It simulates a real-world institute helpdesk by intelligently routing user queries to the correct department — **Frontdesk, Marketing, or Learning Support** — with **strict role boundaries and zero hallucination tolerance**.

This project is designed as a **production-style GenAI system**, not a toy chatbot.

---

## ✨ Key Features

- **Agent-based architecture (LangGraph)**
- **Frontdesk routing agent** (decision-maker, not an answerer)
- **Marketing Support Agent** (offers, fees, admissions)
- **Learning Support Agent with RAG** (courses, syllabus, curriculum)
- **Strict role boundaries** — no cross-domain leakage
- **PDF-based knowledge ingestion**
- **Tool calling with deterministic limits**
- **Clean React chat UI with agent attribution**

---

## 🏗️ System Architecture

```
User
  ↓
Frontend (React)
  ↓
Express API (/api/chat)
  ↓
LangGraph State Machine
  ├── Frontdesk Agent
  │     ├── RESPOND
  │     ├── → Marketing Support
  │     └── → Learning Support
  │
  ├── Marketing Support Agent
  │     └── getOffers Tool
  │
  └── Learning Support Agent
        └── RAG Retriever (Pinecone + PDF)
```

Each agent is **role-isolated**, stateless beyond conversation context, and governed by **explicit system instructions**.

---

## 🧠 Agent Responsibilities

### 1️⃣ Frontdesk Agent

- First point of contact
- Handles greetings & casual queries
- **Routes** marketing and learning queries
- Does **not** answer domain-specific questions

Routing Output:

- `MARKETING`
- `LEARNING`
- `RESPOND`

---

### 2️⃣ Marketing Support Agent

Handles:

- Admissions
- Fees & pricing
- Discounts & offers
- Scholarships

Rules:

- Answers **only from provided context or tools**
- Uses `getOffers` tool for discounts
- Redirects learning-related queries

---

### 3️⃣ Learning Support Agent (RAG-powered)

Handles:

- Courses & programs
- Syllabus & curriculum
- Learning paths

Rules:

- Uses **only retrieved documents**
- Max 3 retrieval attempts
- No hallucination if data is missing

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- LangChain
- LangGraph
- Groq LLM (openai/gpt-oss-120b)
- Pinecone Vector Database
- OpenAI Embeddings

### Frontend

- React
- Tailwind CSS
- React Markdown (GFM)

---

## 🖥️ UI Highlights

- Agent name shown with every assistant reply
- Typing indicator
- Quick-start suggestion buttons
- Auto-resizing input box
- Clean, dark-mode friendly layout

---

## 🧪 Design Principles

- ❌ No hallucinations
- ❌ No self-routing loops
- ❌ No agent role leakage
- ✅ Deterministic control flow
- ✅ Production-like guardrails

> **Philosophy:** AI should behave like a trained support team — not a know-it-all assistant.

---

## 👨‍💻 Author

**Mohit Gupta**
Backend & GenAI Developer

If this project resonates with you, feel free to ⭐ the repo or reach out.

## [LinkedIn](https://www.linkedin.com/in/mohit-gupta-519755245/) | [GitHub](https://github.com/MohitCode17)
