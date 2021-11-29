"""
Module that contains the command line app.
"""
import argparse
import os
import shutil
from google.cloud import storage
from googletrans import Translator

# text_files = ['hello','my name is mike']
# language = "fr"
def translate(language, input_text):
    print("translate")

    translator = Translator()
    count = 0

    #translation_path = 'output' + str(count) + '.txt'
    if(len(input_text)!=0):
    
        input_text = input_text.replace('.','. ')
        results = translator.translate(input_text, src="en", dest=language)

        # with open(translation_path,'w') as f:
        #     f.write(results.text)
        #     print(results.text)

        # count+=1
    return results.text
