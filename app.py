from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sidekick import Sidekick

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

sidekick = Sidekick()

@app.on_event("startup")
async def startup():
    await sidekick.setup()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    success_criteria: str
    history: list[Message]


class ChatResponse(BaseModel):
    role: str
    content: str


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    result = await sidekick.run_superstep(
        message=req.message,
        success_criteria=req.success_criteria,
        history=[m.dict() for m in req.history],
    )

    # sidekick.run_superstep returns the full history list: [..., user, reply, feedback]
    # We want to extract the assistant's reply and the evaluator's feedback.
    # The last two items in the list are the reply and the feedback (both role='assistant').
    
    # Check if we have enough items
    if len(result) >= 2:
        assistant_reply = result[-2]["content"]
        evaluator_feedback = result[-1]["content"]
        combined_content = f"{assistant_reply}\n\n---\n*{evaluator_feedback}*"
    else:
        # Fallback if result structure is unexpected
        combined_content = str(result)

    return {
        "role": "assistant",
        "content": combined_content,
    }
