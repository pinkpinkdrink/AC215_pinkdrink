import tensorflow as tf
import pickle
import numpy as np
import keras
from keras.applications.inception_v3 import preprocess_input

max_cap_len = 15  # Determines max length of captioning sentences
img_dimension = 299 # Determines the height and width of images
num_words = 10000 # Determines vocab size to tokenize and train on
LSTM_size = 512 
encoding_size = 512

def load_img(path):
  img = tf.io.read_file(path)
  img = tf.image.decode_jpeg(img, channels=3)
  img = tf.image.resize(img, (img_dimension, img_dimension))
  return img




incep = keras.applications.inception_v3.InceptionV3(input_shape=(img_dimension,img_dimension,3),
                                                    include_top=False)
incep.trainable=False

encoder = keras.models.Sequential([
                                   keras.layers.Lambda(preprocess_input,input_shape=(img_dimension,img_dimension,3),name="preprocessing_layer"),
                                   incep,
                                   keras.layers.Dense(encoding_size,activation='relu',name="encoding_layer"),
                                   keras.layers.Reshape((8*8,encoding_size),name="reshape_layer")
],name="Encoder")


W1 = keras.layers.Dense(512,name="W1")
W2 = keras.layers.Dense(512,name="W2")
V = keras.layers.Dense(1,name="V")
repeater = keras.layers.RepeatVector(8*8)
doter = keras.layers.Dot(axes=1)
concatenator = keras.layers.Concatenate()

def attention_step(enc,h_prev):
  h = repeater(h_prev)
  score = tf.nn.tanh(W1(enc)+ W2(h))

  alphas =tf.nn.softmax(V(score),axis=1)

  context = doter([alphas,enc])
  return context

encodings = keras.layers.Input(shape=(8*8,encoding_size))

init_h = keras.layers.Input(shape=(LSTM_size))
init_c = keras.layers.Input(shape=(LSTM_size))

teacher_forcing = keras.layers.Input(shape=(1))

embedding_layer = keras.layers.Embedding(num_words+1,256,)


context_prev_tar_concat_layer = keras.layers.Concatenate()
decoder_lstm_layer = keras.layers.LSTM(LSTM_size,return_state=True,dropout=0.2)
decoder_dense_layer = keras.layers.Dense(num_words+1,activation='softmax')

h = init_h

c = init_c

context = attention_step(encodings,h)

embedds = embedding_layer(teacher_forcing)

decoder_lstm_input = context_prev_tar_concat_layer([context,embedds])
  
h , _ , c = decoder_lstm_layer(decoder_lstm_input,initial_state=[h,c])
  
out = decoder_dense_layer(h)

decoder = keras.models.Model([encodings,init_h,init_c,teacher_forcing],[out,h,c])



# Loading the best validation accuracy score weights
encoder.load_weights("/persistent/model_weights/MSCOCO_Inception_LSTM/encoder.hdf5")
decoder.load_weights("/persistent/model_weights/MSCOCO_Inception_LSTM/decoder.hdf5")

with open('/persistent/model_weights/MSCOCO_Inception_LSTM/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def predict(path):
    image = load_img(path)#/255.0
    encodings = encoder.predict(tf.reshape(image,(1,img_dimension,img_dimension,3)))
    texts = ["<sos>"]
    h = np.zeros((1,LSTM_size))
    c = np.zeros((1,LSTM_size))
    for _ in range(max_cap_len + 1):
        dec_inp = np.array(tokenizer.word_index.get(texts[-1])).reshape(1,-1)
        #print(dec_inp)
        props,h,c = decoder.predict([encodings,h,c ,dec_inp])
        props= props[0]
        idx = np.argmax(props)
        texts.append(tokenizer.index_word.get(idx))
        if idx == tokenizer.word_index['<eos>']:
            break
    if tokenizer.word_index.get(texts[-1]) != tokenizer.word_index['<eos>']:
        texts.append('<eos>')
    caption = ' '.join(texts)[6:-6]
  
    return caption
