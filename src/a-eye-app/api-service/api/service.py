from fastapi import FastAPI, Query
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
import asyncio
import os
from fastapi import File
from tempfile import TemporaryDirectory
from api import model


# Setup FastAPI app
app = FastAPI(
    title="API Server",
    description="API Server",
    version="v1"
)

# Enable CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
@app.get("/")
async def get_index():
    return {
        "message": "Welcome to the API Service"
    }

@app.post("/predict")
async def predict(file: bytes = File(...)):
    print("predict file:", len(file), type(file))

    # Save the image
    with TemporaryDirectory() as image_dir:
        image_path = os.path.join(image_dir, "test.png")
        with open(image_path, "wb") as output:
            output.write(file)

        # Make prediction
        prediction_results = model.predict(image_path)

    return prediction_results

@app.get("/text2audio")
async def text2audio(path: str = Query(..., description="Audio path")):
    print(path)
    return FileResponse(path, media_type="audio/mp3")

@app.post("/set-language")
async def setLanguage(language: str = Query(..., description="Language")):
    print(language)
    # TODO: save language setting for later access
    return 'Language was set to {}'.format(language)