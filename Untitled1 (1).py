#!/usr/bin/env python
# coding: utf-8

# In[1]:


pip install opencv-python


# In[2]:


get_ipython().system('pip install numpy==1.22.1')


# In[3]:


get_ipython().system('pip install tensorflow')


# In[4]:


get_ipython().system('pip install tensorflow==2.9.0')


# In[5]:


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


# In[6]:


EPOCHS = 25
INIT_LR = 1e-3
BS = 32
default_image_size = tuple((256, 256))
image_size = 0
directory_root = "C:/Users/dhivy/Downloads/dataset/datasetgraph"
width=256
height=256
depth=3


# In[7]:


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


import cv2
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
import os
import re

EPOCHS = 25
INIT_LR = 1e-3
BS = 32
default_image_size = tuple((256, 256))
image_size = 0
directory_root = "C:/Users/dhivy/Downloads/dataset"
width = 256
height = 256
depth = 3

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

def is_image(filename):
    return re.match(r".*\.(jpg|jpeg|png|bmp|tiff|JPG)$", filename, re.IGNORECASE) is not None

image_list, label_list = [],[]

try:
    print("[INFO] Loading images ...")
    root_dir = os.listdir(directory_root)

    for directory in root_dir:
        # Remove .DS_Store from list
        if directory == ".DS_Store":
            root_dir.remove(directory)

    for plant_folder in root_dir:
        plant_disease_folder_list = os.listdir(f"{directory_root}/{plant_folder}")

        for disease_folder in plant_disease_folder_list:
            # Remove .DS_Store from list
            if disease_folder == ".DS_Store":
                plant_disease_folder_list.remove(disease_folder)

        for plant_disease_folder in plant_disease_folder_list:
            print(f"[INFO] Processing {plant_disease_folder} ...")
            plant_disease_image_list = os.listdir(f"{directory_root}/{plant_folder}/{plant_disease_folder}")

            for single_plant_disease_image in plant_disease_image_list:
                if is_image(single_plant_disease_image):
                    image_directory = os.path.join(directory_root, plant_folder, plant_disease_folder, "image1.JPG")
                    image_list.append(convert_image_to_array(image_directory))
                    label_list.append(plant_disease_folder)

    print("[INFO] Image loading completed")  
except Exception as e:
    print(f"Error: {e}")


# In[10]:


len(image_list)


# In[11]:


pip install scikit-learn


# In[12]:


from sklearn.preprocessing import LabelBinarizer

# Rest of your code
label_binarizer = LabelBinarizer()
image_labels = label_binarizer.fit_transform(label_list)
pickle.dump(label_binarizer, open('label_transform.pkl', 'wb'))
n_classes = len(label_binarizer.classes_)


# In[13]:


print(label_binarizer.classes_)


# In[14]:


np_image_list = np.array(image_list[0], dtype=np.float32) / 255.0
print("[INFO] Conversion to NumPy array completed")


# In[15]:


from sklearn.model_selection import train_test_split

# Assuming label_list contains the correct labels for each image
print("[INFO] Splitting data to train, test")
x_train, x_test, y_train, y_test = train_test_split(np_image_list, label_list[:len(np_image_list)], test_size=0.2, random_state=42)


# In[16]:


aug = ImageDataGenerator(
    rotation_range=25, width_shift_range=0.1,
    height_shift_range=0.1, shear_range=0.2, 
    zoom_range=0.2,horizontal_flip=True, 
    fill_mode="nearest")


# In[28]:


from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, Activation, BatchNormalization
from keras.optimizers import Adam
from keras.preprocessing.image import ImageDataGenerator
import os

# Define the model
model = Sequential()

# Define the input shape and channel dimension
inputShape = (128, 128, 3)
chanDim = -1

# Add the layers to the model
model.add(Conv2D(32, (3, 3), padding="same", input_shape=inputShape))
model.add(Activation("relu"))
model.add(BatchNormalization(axis=chanDim))
model.add(MaxPooling2D(pool_size=(3, 3)))
model.add(Dropout(0.25))

model.add(Conv2D(64, (3, 3), padding="same"))
model.add(Activation("relu"))
model.add(BatchNormalization(axis=chanDim))

model.add(Conv2D(64, (3, 3), padding="same"))
model.add(Activation("relu"))
model.add(BatchNormalization(axis=chanDim))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Conv2D(128, (3, 3), padding="same"))
model.add(Activation("relu"))
model.add(BatchNormalization(axis=chanDim))

model.add(Conv2D(128, (3, 3), padding="same"))
model.add(Activation("relu"))
model.add(BatchNormalization(axis=chanDim))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(1024))
model.add(Activation("relu"))
model.add(BatchNormalization())
model.add(Dropout(0.5))
model.add(Dense(len(os.listdir('C:/Users/dhivy/Downloads/dataset/datasetgraph'))))
model.add(Activation("softmax"))

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy'])

# Create an instance of ImageDataGenerator for data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2  # 20% of the data will be used for validation
)

# Create a generator for training data
train_generator = train_datagen.flow_from_directory(
    'C:/Users/dhivy/Downloads/dataset/datasetgraph', 
    target_size=(128, 128), 
    batch_size=32, 
    class_mode='categorical',
    subset='training'  # Specify this is for training data
)

# Create a generator for validation data
valid_generator = train_datagen.flow_from_directory(
    'C:/Users/dhivy/Downloads/dataset/datasetgraph', 
    target_size=(128, 128), 
    batch_size=32, 
    class_mode='categorical',
    subset='validation'  # Specify this is for validation data
)

# Fit the model using fit_generator with validation data
history = model.fit(
    train_generator, 
    steps_per_epoch=len(train_generator), 
    epochs=10,
    validation_data=valid_generator,  # Use the validation data here
    validation_steps=len(valid_generator)  # Number of validation steps
)


# In[29]:


model.summary()


# In[30]:


acc = history.history['accuracy']  
val_acc = history.history['val_accuracy']  
loss = history.history['loss']
val_loss = history.history['val_loss']
epochs = range(1, len(acc) + 1)

# Plotting training and validation accuracies
plt.plot(epochs, acc, 'b', label='Training accuracy')
plt.plot(epochs, val_acc, 'r', label='Validation accuracy')
plt.title('Training and Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.show()

# Plotting training and validation losses
plt.plot(epochs, loss, 'b', label='Training loss')
plt.plot(epochs, val_loss, 'r', label='Validation loss')
plt.title('Training and Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()


# In[45]:


for epoch, accuracy, loss_value in zip(range(1, len(acc) + 1), acc, loss):
    print(f"Epoch {epoch}: Training Accuracy = {accuracy}, Training Loss = {loss_value}")


# In[44]:


# Evaluate the model on test data
test_scores = model.evaluate(valid_generator, steps=len(valid_generator))

# Extract test accuracy from the test scores
test_accuracy = test_scores[1]

# Print test accuracy
print(f"Test Accuracy: {test_accuracy}")


# In[ ]:





# In[ ]:




