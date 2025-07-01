# SideKick – AI-Powered Personal Assistant

**SideKick** is an intelligent research and automation assistant built using OpenAI's GPT-4o, LangGraph, and LangChain. It autonomously solves user tasks by planning actions, using external tools, and self-evaluating results — all through a modern Gradio interface.

## Features

- LangGraph-Based Assistant: Dynamic task flow with memory, feedback, and retry loops
- Tool-Enabled Reasoning:
  - Web browsing with Playwright
  - Google search (Serper)
  - Wikipedia queries
  - Python code execution
  - File upload and management
  - Push notifications (via Pushover)
- Gradio Interface: Simple chat interface for interaction
- Custom Success Criteria: Automatically evaluates results based on user-defined goals

## Tech Stack

- Python
- OpenAI GPT-4o
- LangGraph and LangChain
- Gradio
- Playwright
- Serper.dev API
- Pushover API

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aj1seven/SideKick.git
cd SideKick
```

pip install -r requirements.txt
playwright install


Create a .env file from the example:

```bash
cp .env.example .env
```

Run the Application

```bash
python app.py
```
