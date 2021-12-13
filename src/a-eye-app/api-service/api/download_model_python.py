import os
from google.cloud import storage

gcp_project = os.environ["GCP_PROJECT"]
bucket_name = "a-eye-app-model"
project_id = "bionic-region-328100"
local_models_path = "../persistent/model_weights/"
source_blob_names = ["flickr8_VGG_LSTM","inception_gru_full_epoch=5","MSCOCO_Inception_LSTM"]

def findOccurrences(s, ch): # to find position of '/' in blob path ,used to create folders in local storage
    return [i for i, letter in enumerate(s) if letter == ch]

def download_from_bucket(bucket_name, blob_path, local_path, project_id):    
    # Create this folder locally
    if not os.path.exists(local_path):
        os.makedirs(local_path)        

    storage_client = storage.Client(project = project_id) # PROJECT ID 
    bucket = storage_client.get_bucket(bucket_name)
    blobs=list(bucket.list_blobs(prefix=blob_path))

    startloc = 0
    for blob in blobs:
        startloc = 0
        folderloc = findOccurrences(blob.name.replace(blob_path, ''), '/') 
        if(not blob.name.endswith("/")):
            if(blob.name.replace(blob_path, '').find("/") == -1):
                downloadpath=local_path + '/' + blob.name.replace(blob_path, '')
                
                blob.download_to_filename(downloadpath)
            else:
                for folder in folderloc:
                    
                    if not os.path.exists(local_path + '/' + blob.name.replace(blob_path, '')[startloc:folder]):
                        create_folder=local_path + '/' +blob.name.replace(blob_path, '')[0:startloc]+ '/' +blob.name.replace(blob_path, '')[startloc:folder]
                        startloc = folder + 1
                        os.makedirs(create_folder)
                    
                downloadpath=local_path  + blob.name.replace(blob_path, '')
                print('downloading: ', downloadpath)
                blob.download_to_filename(downloadpath)
             
   

def download():
    for i in source_blob_names: 
        blob_path = i
        local_dir = os.path.join(local_models_path, i )#trainingData folder in local
        download_from_bucket(bucket_name, blob_path, local_dir, project_id)
