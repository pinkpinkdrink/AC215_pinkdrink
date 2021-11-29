import argparse
import os


from google.cloud import storage
from google.cloud import texttospeech

def synthesis(language_code, text_files):
    print("synthesis")
    # Instantiates a client

    client = texttospeech.TextToSpeechClient()
    counter = 1
    audio_paths = []
    
    for text_file in text_files:
        print(text_file)
        audio_name = 'output' +'_'+str(counter)+ '.mp3'
        audio_path = os.path.join('audios', audio_name)

        synthesis_input = texttospeech.SynthesisInput(text=text_file)
            # Build the voice request
        voice = texttospeech.VoiceSelectionParams(
            language_code=language_code, ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )
            # Select the type of audio file you want returned
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )
            # Perform the text-to-speech request on the text input with the selected
            # voice parameters and audio file type
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
            # Save the audio file
            
        with open(audio_path, "wb") as out:
            # Write the response to the output file.
            out.write(response.audio_content)
            print('Audio content written to file '+ audio_path)
        counter += 1
        audio_paths.append(audio_path)
    return audio_paths
