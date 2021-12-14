AC215-Project: A-Eye App
==============================
Anita Mahinpei, Yingchen Liu

## Overview

The A-Eye App is an automated image captioning app that allows users to upload an image to be captioned. The app uses three different machine learning models to generate different captions for the image. The app also provides a text-to-speech functionality that reads out the generated captions for visually impaired users. Captions can be generated in English, French, Spanish, or Chinese.

The A-Eye App constitutes three docker containers: 
1. api-service: This container contains the back-end logic for the app. The API has one endpoint to generate captions for an input image in the user-selected language and one endpoint that returns the associated audio files for each of the generated captions. The back-end code is fully written in Python and uses the Google Cloud APIs for translation and text-to-speech conversion. 
2. frontend-react: This is the UI container for the app. The UI allows users to upload an image, view the captions and audios for the uploaded image, and change the language settings of the app. The front-end code is written in Javascript and CSS and uses the React library.
3. deployment: This container is used to deploy the app to GCP using Ansible scripts.

There is also a deprecated container, frontend-simple. This UI container is written in HTML and Javascript and is not kept up-to-date.

For more information about the app development process refer to our [medium article ](https://medium.com/@amahinpei/a-eye-image-captioning-app-3bf7c1d11e91) and our [app demo](https://youtu.be/1GRi85gAUbw).

## Project Organization

The main code for the app can be found under the `src` directory. Under `src`, each docker container has a dedicated subdirectory of the same name with associated scripts that can be used to create the container. The `models` directory contains Jupyter Notebooks that were used to train the image captioning models used in the app. The `notebooks` directory contains any other notebooks used in the process of creating this app such as the EDA notebook. 

      .
      ├── .gitignore
      ├── LICENSE
      ├── Makefile
      ├── models
      │   ├── Flickr8Model.ipynb
      │   ├── Flickr8Production.ipynb
      │   ├── image_captioning_inception(frozen)_gru.ipynb
      │   └── image_captioning_inception_LSTM.ipynb
      ├── notebooks
      │   ├── calculate_bleuscore.ipynb
      │   └── MSCOCO-EDA.ipynb
      ├── README.md
      ├── references
      │   └── README.md
      ├── requirements.txt
      ├── setup.py
      ├── src
      │   ├── __init__.py
      │   └── a-eye-app
      │     ├── api-service
      │     ├── deployment
      │     ├── frontend-react
      │     └── frontend-simple
      ├── submissions
      │   ├── milestone1_pinkdrink.pdf
      │   ├── milestone2_pinkdrink
      │   ├── milestone3_pinkdrink
      │   └── milestone4_pinkdrink
      └── test_project.py


## Deployment Instructions

Prior to deployment, you must create these two empty directories:
```console
$ mkdir src/a-eye-app/secrets
$ mkdir src/a-eye-app/persistent-folder
```
You must then obtain the following files and put them under the secrets folder:
* `ssh-key-deployment`
* `ssh-key-deployment.pub`
* `bucket-reader.json`
* `deployment.json`
* `gcp-service.json`

### **Local Deployment**
------------

In the command line,  
```console
$ cd src/a-eye-app/api-service
```
Start the backend container: 
```console
$ sh docker-shell.sh
```
Inside the backend container, start the backend server:
```console
$ uvicorn_server
```
In a separate shell, in the command line,
```console
$ cd src/a-eye-app/frontend-react
```
Start the frontend container:
```console
$ sh docker-shell.sh
```
Inside the frontend container, start the frontend server:
```console
$ yarn install
$ yarn start
```
Then you will find the application at `localhost:3000` in the browser and the backend server is running at `localhost:9000`.


### **K8s Cluster Deployment**
------------

**Start The Deployment Docker Container**
-  `cd deployment`
- Run `sh docker-shell.sh` or `docker-shell.bat` for windows
- Check versions of tools
`gcloud --version`
`kubectl version`
`kubectl version --client`

- Check if make sure you are authenticated to GCP
- Run `gcloud auth list`

**Build and Push Docker Containers to GCR**
```
ansible-playbook deploy-docker-images.yml -i inventory.yml
```

**Create & Deploy Cluster**
```
ansible-playbook deploy-k8s-cluster.yml -i inventory.yml --extra-vars cluster_state=present
```

**If you want to shell into a container in a Pod**
```
kubectl get pods --namespace=a-eye-app-cluster-namespace
kubectl get pod api-5d4878c545-47754 --namespace=a-eye-app-cluster-namespace
kubectl exec --stdin --tty api-5d4878c545-47754 --namespace=a-eye-app-cluster-namespace  -- /bin/bash
```

**View the App**
* Copy the `nginx_ingress_ip` from the terminal from the create cluster command
* Go to `http://<YOUR INGRESS IP>.sslip.io`

#### Delete Cluster
```
ansible-playbook deploy-k8s-cluster.yml -i inventory.yml --extra-vars cluster_state=absent
```

### **GCP VM Deployment**
------------
Note: you have to obtain access to the A-Eye App Project on GCP to successfully complete the VM deployment instructions.

**Build and Push Docker Containers to GCR**
```
ansible-playbook deploy-docker-images.yml -i inventory.yml
```

**Create Compute Instance (VM) Server in GCP**
```
ansible-playbook deploy-create-instance.yml -i inventory.yml --extra-vars cluster_state=present
```

Once the command runs successfully get the IP address of the compute instance from GCP Console and update the appserver>hosts in inventory.yml file.

**Provision Dev Server in GCP**
```
ansible-playbook deploy-provision-instance.yml -i inventory.yml
```

**Setup Docker Containers in the  Compute Instance**
```
ansible-playbook deploy-setup-containers.yml -i inventory.yml
```

You can SSH into the server from the GCP console and see status of containers
```
sudo docker container ls
sudo docker container logs api-service -f
```

To get into a container run:
```
sudo docker exec -it api-service /bin/bash
```

**Setup Webserver on the Compute Instance**
```
ansible-playbook deploy-setup-webserver.yml -i inventory.yml
```
Once the command runs go to `http://<External IP>/` 

**Delete the Compute Instance / Persistent disk**
```
ansible-playbook deploy-create-instance.yml -i inventory.yml --extra-vars cluster_state=absent
```

## Model Code Adapted From

* [How to Develop a Deep Learning Photo Caption Generator from Scratch](https://machinelearningmastery.com/develop-a-deep-learning-caption-generation-model-in-python/)
* [Tensorflow Image Captioning with Visual Attention Tutorial](https://github.com/tensorflow/docs/blob/master/site/en/tutorials/text/image_captioning.ipynb)
* [A tensorflow 2.0 with keras implementation trained on MS COCO dataset](https://github.com/Abdalrahman112/Image-captioning)
<p><small>Project based on the <a target="_blank" href="https://drivendata.github.io/cookiecutter-data-science/">cookiecutter data science project template</a>. #cookiecutterdatascience</small></p>
