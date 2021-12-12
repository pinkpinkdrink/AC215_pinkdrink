AC215-Project: A-Eye App
==============================
Anita Mahinpei, Yingchen Liu

Overview
--------
The A-Eye App is an automated image captioning app that allows users to upload an image to be captioned. The app uses three different machine learning models to generate different captions for the image. The app also provides a text-to-speech functionality that reads out the generated captions for visually impaired users. Captions can be generated in English, French, Spanish, or Chinese.

The A-Eye App constitutes three docker containers: 
1. api-service: This container contains the backend logic for the app. The API has one endpoint to change the app's language settings, one endpoint to generate captions for an input image and one endpoint that returns the associated audio files for each of the generated captions.
2. frontend-react: This is the UI container for app that uses React. The UI allows users to upload an image, view the captions and caption audios for the uploaded image and change the language settings of the app.
3. deployment: This container is used for automatic Kubernetes and GCP deployment of the app.

There is also a deprecated container, frontend-simple. This UI container is written in HTML and Javascript and is not kept up-to-date.


Project Organization
------------
The main code for the app can be found under the `src` directory. Under `src`, each docker container has a dedicated subdirectory of the same name with associated scripts that can be used to create the container. The `models` directory contains Jupyter Notebooks that were used to train the image captioning models used in the app. The `notebooks` directory contains any other notebooks used in the process of creating this app such as the EDA notebook. 

      .
      ├── LICENSE
      ├── Makefile
      ├── README.md
      ├── .gitignore
      ├── models
      │   ├── Flickr8Production.ipynb
      │   ├── Flickr8Model.ipynb
      │   ├── image_captioning_inception(frozen)_gru.ipynb
      │   └── image_captioning_inception_LSTM.ipynb
      ├── notebooks
      │   └── MSCOCO-EDA.ipynb
      ├── references
      ├── requirements.txt
      ├── setup.py
      ├── src
      │   ├── __init__.py
      │   ├── build_features.py
      │   ├── setup.sh
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


Instructions to Deploy Locally
------------
In command line,  
```console
$ cd src/a-eye-app/api-service
```
Start backend container: 
```console
$ sh docker-shell.sh
```
Inside backend container, start backend server:
```console
$ unicorn_server
```
In a separate shell:
In command line,
```console
$ cd src/a-eye-app/frontend-react
```
Start frontend container:
```console
$ sh docker-shell.sh
```
Inside frontend container, start frontend server:
```console
$ yarn install
$ yarn start
```
then you will find the application at `localhost:3000` in the browser and the backend server is running at `localhost:9000`.


Deploy A-Eye-App to K8s Cluster
------------

## API's to enable in GCP for Project
Search for each of these in the GCP search bar and click enable to enable these API's
* Compute Engine API
* Service Usage API
* Cloud Resource Manager API
* Google Container Registry API
* Kubernetes Engine API

## Start Deployment Docker Container
-  `cd deployment`
- Run `sh docker-shell.sh` or `docker-shell.bat` for windows
- Check versions of tools
`gcloud --version`
`kubectl version`
`kubectl version --client`

- Check if make sure you are authenticated to GCP
- Run `gcloud auth list`

## Build and Push Docker Containers to GCR
**This step is only required if you have NOT already done this**
```
ansible-playbook deploy-docker-images.yml -i inventory.yml
```
# Deploy to Kubernetes Cluster
We will use ansible to create and deploy the  app into a Kubernetes Cluster


### Create & Deploy Cluster
```
ansible-playbook deploy-k8s-cluster.yml -i inventory.yml --extra-vars cluster_state=present
```

### Try some kubectl commands
```
kubectl get all
kubectl get all --all-namespaces
kubectl get pods --all-namespaces
```

```
kubectl get componentstatuses
kubectl get nodes
```

### If you want to shell into a container in a Pod
```
kubectl get pods --namespace=a-eye-app-cluster-namespace
kubectl get pod api-5d4878c545-47754 --namespace=a-eye-app-cluster-namespace
kubectl exec --stdin --tty api-5d4878c545-47754 --namespace=a-eye-app-cluster-namespace  -- /bin/bash
```

### View the App
* Copy the `nginx_ingress_ip` from the terminal from the create cluster command
* Go to `http://<YOUR INGRESS IP>.sslip.io`

### Delete Cluster
```
ansible-playbook deploy-k8s-cluster.yml -i inventory.yml --extra-vars cluster_state=absent
```

<p><small>Project based on the <a target="_blank" href="https://drivendata.github.io/cookiecutter-data-science/">cookiecutter data science project template</a>. #cookiecutterdatascience</small></p>
