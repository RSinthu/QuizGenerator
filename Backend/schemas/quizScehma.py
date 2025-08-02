from pydantic import BaseModel
from typing import List

class youtubeQuiz(BaseModel):
    url:str
    specificArea : str
    no : int
    difficulty : str


class QuizQuestion(BaseModel):
    id: int
    question: str
    options: List[str]
    correct: int
    difficulty: str

class QuizResponse(BaseModel):
    quiz: List[QuizQuestion]