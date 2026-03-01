
# 🚀 DocuSync-AI

**Your Intelligent Document Assistant.** DocuSync-AI is an autonomous agent designed to vectorize,and answer complex questions from your private documents in real-time. Stop searching through PDFs; start chatting with them.

---

## ✨ Features

* **Intelligent RAG:** Advanced context retrieval ensures answers are grounded in your specific documents.
* **Modern UI:** A clean, mobile-responsive dark-mode interface built with Next.js and Tailwind CSS.
* **Streaming Responses:** AI responses feel natural with real-time text streaming.
* **Vector Ready:** Easily plug in your preferred vector database for long-term document memory.

## 🛠 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **AI Logic:** Gemini API (or your preferred LLM)
* **Processing:** PDF.js / LangChain

## 📦 Getting Started

### Prerequisites

* Node.js 18.x or higher.
* An API Key from your chosen AI provider (e.g., Google AI Studio).

### Installation

1. Clone the repo:
```bash
git clone https://github.com/your-username/docusync-ai.git
cd docusync-ai

```


2. Install dependencies:
```bash
npm install

```


3. Set your environment variables:
Create a `.env.local` file and add:
```text
GEMINI_API_KEY=your api keys

```


4. Run the development server:
```bash
npm run dev

```



## 🧠 How it Works

1. **Upload:** You upload a PDF or text file via the sidebar.
2. **Chunking:** The agent splits the document into semantic chunks and vectorizes them.
3. **Retrieval:** When you ask a question, the agent performs a similarity search to find the most relevant document passages.
4. **Generation:** The AI synthesizes an answer based strictly on the retrieved context.

## 🤝 Contribution

Contributions are welcome! Please feel free to open a Pull Request or create an Issue if you find a bug or have a feature request.

---

## Screenshots ui for both mobile and desktop

### Before messages on desktop

<img width="923" height="604" alt="Screenshot From 2026-02-27 23-00-07" src="https://github.com/user-attachments/assets/65160807-cc39-4940-8baf-d9634be33fef" />

---
### After messages on Desktop

<img width="1055" height="579" alt="Screenshot From 2026-03-01 00-58-56" src="https://github.com/user-attachments/assets/81079868-3276-42ed-afb3-9653eb49611b" />

<img width="923" height="604" alt="Screenshot From 2026-02-27 23-02-05" src="https://github.com/user-attachments/assets/3250b58f-553b-4395-820a-778554d26903" />

---
### After messages on Mobile device

<img width="291" height="487" alt="Screenshot From 2026-03-01 01-00-19" src="https://github.com/user-attachments/assets/5079f049-d699-4f72-ab19-61bde7d0ff36" />

<img width="299" height="506" alt="Screenshot From 2026-02-27 23-03-36" src="https://github.com/user-attachments/assets/c959de08-63cd-40f3-b3ee-4ecf7edd4b11" />

* **License:** MIT

