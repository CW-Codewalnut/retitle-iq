# ReTitleIQ

Retitle IQ is a web application built with React, Vercel AI SDK, and LLM integration created to help SEO analysts with an agentic AI assistant. The tool generates highly effective, SEO-optimized titles for the blog posts using LLMs. It analyzes the blog content, the target keyword, compares against the effective titles of competitors, and finally applies sophisticated prompting techniques to suggest multiple compelling title options.

## Overview

Writing blog titles that rank well on search engines and motivate human readers to click is challenging. ReTitleIQ aims to simplify this process by:

1.  **Understanding Your Content:** Accepts blog content via direct text input, URL fetching, or file uploads (supporting Markdown, Text, PDF, DOCX).
2.  **Analyzing Competition:** Fetches real-time Search Engine Results Page (SERP) data for your primary keyword to understand what's already ranking.
3.  **Leveraging AI:** Utilizes state-of-the-art latest LLMs (Gemini 2.5, Claude Sonnet 3.7, GPT-4.1, o4 Mini, Grok 3, Deepseek via various providers) with detailed, expert-level prompting based on SEO and copywriting best practices.
4.  **Generating Creative Titles:** Provides a list of recommended titles, comparing them against competitor titles and offering justifications for the choices and scoring.

## Key Features

- **AI-Powered Title Generation:** Uses LLMs to brainstorm and refine blog titles.
- **Flexible Content Input:**
  - Paste blog content directly.
  - Provide a blog URL.
  - Upload files (`.md`, `.txt`, `.pdf`, `.docx`).
- **Competitor SERP Analysis:** Integrates with Serp API to fetch and analyze top-ranking competitor titles.
- **Multiple LLM Support:** Choose from various models, including standard thinking/reasoning enabled models (e.g., Claude 3.7 Sonnet Thinking, Gemini 2.5 Pro Thinking).
- **User Authentication:** Secure user management via Clerk.
- **Persistent Chat History:** Stores past generations, accessible via an infinite-scrolling sidebar list.
- **File Handling:** Includes client-side validation, preview, and server-side upload and conversion.
- **Modern UI:** Built with Shadcn UI, Tailwind CSS, and Radix UI for a clean and responsive experience.
- **Usage Limits:** Implements daily generation limits per user, reset automatically via a cron job.
- **AI Reasoning Display:** Shows the detailed "thinking" process for LLMs.
- **Robust Backend:** Leverages Prisma with SQLite, server-side rendering via React Router routes.

## Demo
<a href="https://www.youtube.com/watch?v=fMGOHq0YcHg" target="_blank" rel="noopener noreferrer">
	<img
		src="https://github.com/user-attachments/assets/f2528de5-342f-4812-8f7c-1428e8b83955"
		width="640"
		height="360"
		alt="demo"
	/>
</a>

Example Inputs:

1. **Keyword** - seo checklist for website launch

   **Blog Content** - https://www.leadwalnut.com/blog/seo-checklist-for-website-launch

2. **Keyword** - react with java

   **Blog Content** - https://www.codewalnut.com/learn/how-to-build-react-app-with-java-backend

## Tech Stack

- **FrontEnd:**
  - React 19
  - React Router 7
  - Tailwind CSS 4
  - Shadcn UI
  - Radix UI
  - Vercel AI SDK
  - SWR
  - TypeScript
- **Backend:**
  - Node.js
  - Supabase (Storage with AWS S3 SDK)
  - Prisma
  - SQLite
  - Clerk
  - Vercel AI SDK (with Google Generative AI, Anthropic and OpenRouter providers)
  - Cloudflare Browser Rendering
  - Pandoc
  - Serper API / Google CSE API (SERP Data)
- **Tooling:**
  - Vite
  - ESLint
  - Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- Bun
- [Pandoc](https://pandoc.org/installing.html): Required for converting uploaded `.docx`, `.md`, and `.txt` files to PDF server-side. Ensure it's installed and accessible in your system's PATH.
- [WeasyPrint](https://pypi.org/project/weasyprint/): PDF Engine for Pandoc conversions
- Access to an S3-compatible object storage provider.
- API Keys for:
  - Clerk
  - LLM Providers (Google Generative AI, Anthropic, OpenRouter)
  - SERP Provider (Serper.dev or Google Custom Search Engine)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/CW-Codewalnut/retitle-iq.git
    cd retitle-iq
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```

### Environment Variables

1.  Create a `.env` file in the root of the project.

    ```bash
    cp -r .env.example .env
    ```

2.  Add the corresponding environment variables.

### Database Setup

1.  **Sync the schema:**
    ```bash
    bunx prisma db push
    ```

### Running the Development Server

```bash
bun dev
```

## Detailed Workflow

![diagram](https://github.com/user-attachments/assets/d07c4def-64e4-44ed-9a95-4efa0befae3c)

This workflow outlines the step-by-step process from user input to the final display of the generated titles.

1.  **Start: User Submits Input:**

    - The user interacts with the frontend, providing:
      - A **Primary Keyword**.
      - **Blog Content** via one of three methods: pasting text, providing a URL, or uploading a file (`.md`, `.txt`, `.pdf`, `.docx`).
      - Selection of a specific **Language Model (LLM)**.

2.  **Input Handling & Preparation:**

    - The server receives the input data.
    - **Input Extraction:** Extracts the keyword, content (text, URL, or file details), and selected LLM.
    - **Content Type Handling:**
      - **URL:** If a URL is provided, Cloudflare Browser Rendering API is used to generate a **PDF version** of the content.
      - **File:** If a file is uploaded:
        - If it's not already a PDF, **Pandoc** is used server-side to convert it into PDF.
        - The resulting PDF (original or converted) is uploaded to an S3-compatible storage (currently Supabase).
      - **Text:** The raw text is used directly.
    - **SERP Data Fetching:** Fetches up to 20 top Google Search Engine Results Page (SERP) results for the primary keyword using the configured provider (Serper or Google CSE - currently Serper). Results are cached in the database for a defined (currently 3 hours) duration to reduce API calls.
    - **Database Logging:** A new `Chat` entry and the initial `Message` (containing the user's input details and file references, if any) for the logged in user (Clerk provided `userId`) are created in the database.

3.  **LLM Prompts Construction:**

    - **System Prompt Assembly:** A detailed system prompt is constructed dynamically. This prompt uses **XML tags** for clear structure and separation of concerns:
      - **`<documents>`:** An extensive research document has been prepared by LeadWalnut SEO experts outlining guidelines, proven strategies, methods, templates, and checklists for title generation. A Summarized version of this document is provided to the LLM, structured as XML.
      - **`<instructions>`:** Contains the core task instructions, outlining the processes the LLM should perform (analyze content, analyze SERPs, score competitors, brainstorm, refine, select).
      - **`<output_format>`:** This section defines the **required XML output structure**. It includes:
        - Instructions for the LLM to strictly adhere to the format.
        - Specification of outer (`<output>`) and inner tags (`<thinking>` (if applicable), `<titles>`, `<error>` (if applicable)).
        - Detailed specification for the **JSON expected within the `<titles>` tag**, including field names (`competitorTitles`, `finalRecommendedTitles`), types, and descriptions for each field (`name`, `title`, `score`, `justification`).
        - **Example Output:** Provides concrete examples (`<ExampleOutput>`) of the expected final XML structure for both success and error scenarios.
      - **Model Type Adaptation:** The instructions are adjusted based on the selected model type:
        - **Thinking Model:** Models with native reasoning capabilities are expected to naturally reason and arrive at the output.
        - **Non-Thinking Model:** Standard models without reasoning ability are explicitly **instructed to think step by step inside a `<thinking>` tag** (thinking out loud). For this purpose, non-thinking models are provided with a sample thinking output of a thinking model.
    - **User Input Preparation:** The user's keyword, the blog content (text or S3 URL for the PDF), and the fetched SERP results (as a JSON string) are formatted as the user message content.
    - **Final Prompt Assembly:** The system prompts and the user message are combined into the final list of messages for the API call.

4.  **LLM Interaction:**

    - The constructed prompt messages are sent to the selected LLM provider via the AI SDK's `streamText` function.

5.  **AI Model Processing - Conceptual LLM Steps:**

    - **Analyze Blog Content:** The LLM processes the provided content.
    - **Analyze SERP Results & Identify Gaps:** It examines the competitor data.
    - **Score Competitor Titles:** It evaluates and scores the competitor titles based on the guidelines.
    - **Brainstorm Diverse Title Drafts:** It generates a large number of initial title ideas.
    - **Iteratively Refine & Self-Critique Titles:** It applies the self-critique instructions from the prompt to improve the drafts.
    - **Select Final 6 Titles:** It chooses the best 6 titles.
    - **Format Output:** It structures the results according to the specified `<output_format>` XML and the final JSON payload within `<titles>`.

6.  **Response Handling & Display (Streaming & Parsing):**
    - **Stream Consumption:** The frontend `useChat` hook from AI SDK consumes the streaming response from the backend API endpoint.
    - **Data Stream Annotations:** Additional metadata (like the model used, source blog URL, raw SERP results) is sent from the backend as annotations alongside the main text stream using `stream.writeMessageAnnotation`.
    - **Database Update:** Upon completion of the stream (`onFinish` callback in `streamText`), the full assistant message, including the final text, parsed reasoning (if applicable), and annotations, is saved to the database.
    - **Response Parsing:** As the API streams back the response from the LLM (formatted as XML), the FrontEnd processes it:
      - **XML Extraction:** The FrontEnd extracts content from `<thinking>` and `<titles>` tags using regex.
      - **Partial JSON Handling:** The content within the `<titles>` tag contains a JSON payload. When the response is streaming, this JSON might be incomplete at any given moment during the stream. To handle this, the extracted (potentially partial) JSON is passed to the `fixJson` utility (adopted from AI SDK internals). This utility fixes the partial JSON and returns a **syntactically valid JSON** which is then parsed using `JSON.parse`.
      - **Final Output:** The parsed JSON is then used to display the final output in the UI.
    - **Frontend Rendering:**
      - It displays the thinking process (if available and extracted).
      - It renders the competitor titles and their scores/justifications in a UI similar to Google results.
      - It displays the final recommended titles in a similar UI.
      - UI elements update progressively as the response streams and parsing occurs.

This detailed workflow leverages structured prompting with XML, explicit output formatting examples, and robust stream parsing with JSON fixing to reliably extract and display complex, structured data from the LLM, even without leveraging first party Structured Outputs. We are intentionally avoiding structured outputs as from our testing and experience, they don't yield as good results as the free text approach for creative tasks.
