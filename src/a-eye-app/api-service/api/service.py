from fastapi import FastAPI, Query
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
import asyncio
import os
from fastapi import File, Cookie
from tempfile import TemporaryDirectory
from api import translator, download_model_python
from api.text2audio import synthesis
from api import model, model2, model3


# Setup FastAPI app
app = FastAPI(
    title="API Server",
    description="API Server",
    version="v1"
)

@app.on_event("startup")
async def startup():
    if not os.path.isdir('/persistent/model_weights'):
        download_model_python.download()
    else:
        print('Model weights have been downloaded')
    if not os.path.isdir('/persistent/language'):
        os.mkdir('/persistent/language')
        file = open('/persistent/language/language_setting.txt', "w") 
        file.write('en-US')


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
async def predict(file: bytes = File(...), language: str = Query(..., description="Language")):
    print("predict file:", len(file), type(file))

    if language == 'French':
        language_code = 'fr'
    elif language == 'Spanish':
        language_code = 'es'
    elif language == 'Chinese':
        language_code = 'zh-CN'
    else:
        language_code ='en-US'

    print('language_code:', language_code)
  
    with TemporaryDirectory() as image_dir:
        image_path = os.path.join(image_dir, "test.png")
        with open(image_path, "wb") as output:
            output.write(file)

        # Make prediction
        caption1 = model.predict(image_path)
        caption2 = model2.predict(image_path)
        caption3 = model3.predict(image_path)
        if language_code != "en-US":
            translation1 = translator.translate(language_code, caption1)
            translation2 = translator.translate(language_code, caption2)
            translation3 = translator.translate(language_code, caption3)
            translations = [translation1,translation2,translation3]
        else:
            translations = [caption1,caption2,caption3]
        
        audio_paths = synthesis(language_code, translations)
     
        prediction_results = {"prediction_captions" : translations,
                              "audio_paths": audio_paths}

    return prediction_results

@app.get("/text2audio")
async def text2audio(path: str = Query(..., description="Audio path")):
    print(path)
    return FileResponse(path, media_type="audio/mp3")

