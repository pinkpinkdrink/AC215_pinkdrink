import os
gcp_project = os.environ["GCP_PROJECT"]
bucket_name = "a-eye-app-model"
local_models_path = "/persistent/model_weights/"
source_blob_names = ["flickr8_VGG_LSTM" "inception_gru_full_epoch=5/"]
# note: run `pipenv install gsutil` if gsutil is not installed
# run `gsutil config` to get access 
def download_bucket_objects(bucket_name, blob_path, local_path):
    # blob path is bucket folder name
    command = "gsutil cp -r gs://{bucketname}/{blobpath} {localpath}".format(bucketname = bucket_name, blobpath = blob_path, localpath = local_path)
    os.system(command)
    return command
for source_blob_name in source_blob_names:
    download_bucket_objects(bucket_name, source_blob_name, local_models_path)
print("Done!")