from fastapi import APIRouter
from app.services.ai_services import ask_ai

router = APIRouter()

@router.post("/chat")
def chat(data: dict):
    query = data.get("query")

    answer = ask_ai(query)

    return {
        "reply": answer
    }