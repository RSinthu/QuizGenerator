from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import summarizeRoutes


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(summarizeRoutes.router,prefix="/summary")


@app.get("/")
async def root():
    return {"message": "System is running"}
