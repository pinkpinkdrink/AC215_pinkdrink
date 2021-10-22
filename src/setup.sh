pip install fiftyone
git clone https://github.com/cocodataset/cocoapi.git
cd ./cocoapi/PythonAPI
make
cd ..
mkdir images
mkdir annotations
cd images

wget -c http://images.cocodataset.org/zips/train2017.zip
wget -c http://images.cocodataset.org/zips/val2017.zip
wget -c http://images.cocodataset.org/zips/test2017.zip
wget -c http://images.cocodataset.org/zips/unlabeled2017.zip

unzip train2017.zip
unzip val2017.zip
unzip test2017.zip
unzip unlabeled2017.zip

rm train2017.zip
rm val2017.zip
rm test2017.zip
rm unlabeled2017.zip 

cd ../annotations
wget -c http://images.cocodataset.org/annotations/annotations_trainval2017.zip
wget -c http://images.cocodataset.org/annotations/stuff_annotations_trainval2017.zip
wget -c http://images.cocodataset.org/annotations/image_info_test2017.zip
wget -c http://images.cocodataset.org/annotations/image_info_unlabeled2017.zip

unzip annotations_trainval2017.zip
unzip stuff_annotations_trainval2017.zip
unzip image_info_test2017.zip
unzip image_info_unlabeled2017.zip

rm annotations_trainval2017.zip
rm stuff_annotations_trainval2017.zip
rm image_info_test2017.zip
rm image_info_unlabeled2017.zip
