#!/usr/bin/env python
# coding: utf-8

# In[1]:


pip install opencv-python


# In[2]:


get_ipython().system('pip install split-folders')


# In[3]:


get_ipython().system('pip install numpy==1.22.1')


# In[4]:


get_ipython().system('pip install tensorflow')


# In[5]:


get_ipython().system('pip install tensorflow==2.9.0')


# In[6]:


import numpy as np
import pickle
import cv2
import keras
from os import listdir
from tensorflow.keras.preprocessing.image import img_to_array
from keras.layers import BatchNormalization
from sklearn.preprocessing import LabelBinarizer
from keras.models import Sequential
from keras.layers.convolutional import Conv2D
from keras.layers.convolutional import MaxPooling2D
from keras.layers.core import Activation, Flatten, Dropout, Dense
from keras import backend as K
from tensorflow.keras.preprocessing.image import img_to_array
from keras.preprocessing.image import ImageDataGenerator
from keras.optimizers import Adam
from keras.preprocessing import image
from tensorflow.keras.utils import img_to_array
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt


# In[7]:


EPOCHS = 25
INIT_LR = 1e-3
BS = 32
default_image_size = tuple((256, 256))
image_size = 0
directory_root = "C:/Users/dhivy/Downloads/dataset/datasetgraph"
width=256
height=256
depth=3


# In[8]:


def convert_image_to_array(image_dir):
    try:
        image = cv2.imread(image_dir)
        if image is not None:
            image = cv2.resize(image, default_image_size)
            return img_to_array(image)
        else:
            return np.array([])
    except Exception as e:
        print(f"Error: {e}")
        return None


# In[9]:


import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import V0GG16
from tensorflow.keras.layers import Dense, Flatten, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import RMSprop

# Set directory path
data_dir = "C:/Users/dhivy/Downloads/dataset/datasetgraph"

# Image size
image_size = (128, 128)
input_shape = image_size + (3,)  # Add channel dimension

# Batch size
batch_size = 32

# Load pre-trained VGG16 model
base_model = VGG16(weights='imagenet', include_top=False, input_shape=input_shape)

# Fine-tune the convolutional base
for layer in base_model.layers[:15]:
    layer.trainable = False
for layer in base_model.layers[15:]:
    layer.trainable = True

# Add custom classification layers on top of VGG16
x = Flatten()(base_model.output)
x = Dense(512, activation='relu')(x)
x = Dropout(0.5)(x)

# Define the number of classes based on your dataset
num_classes = 4

predictions = Dense(num_classes, activation='softmax')(x)

# Create transfer learning model
model = Model(inputs=base_model.input, outputs=predictions)

# Compile the model with RMSprop optimizer
optimizer = RMSprop(lr=0.0001)
model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])

# Data augmentation and splitting for training and testing data
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=40,
    width_shift_range=0.3,
    height_shift_range=0.3,
    shear_range=0.3,
    zoom_range=0.3,
    horizontal_flip=True,
    fill_mode='nearest',
    validation_split=0.2  # 20% of the data will be used for validation
)

# Load all data using the generator
train_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training'  # specify this is for training data
)

test_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation'  # specify this is for testing data
)

# Train the model
history = model.fit(
    train_generator,
    epochs=20,
    validation_data=test_generator
)


# In[12]:


# Evaluate the model on the test data
test_loss, test_accuracy = model.evaluate(test_generator)
print("Test Accuracy:", test_accuracy)
print("Test Loss:", test_loss)


# In[14]:


import matplotlib.pyplot as plt

# Plot training and validation accuracy
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.title('Training and Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.show()


# In[15]:


plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Training and Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.show()


# In[16]:



# Plot training and validation loss
plt.plot(history.history['loss'], label='Training Loss')
plt.title('Training and Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()


# In[17]:


plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Training and Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()


# In[20]:


# Print training and test accuracy
train_accuracy = history.history['accuracy']
test_accuracy = history.history['val_accuracy']

print("Training Accuracy:")
for epoch, acc in enumerate(train_accuracy, 1):
    print(f"Epoch {epoch}: {acc}")


# In[19]:


print("\nTest Accuracy:")
for epoch, acc in enumerate(test_accuracy, 1):
    print(f"Epoch {epoch}: {acc}")


# In[ ]:




