import glob
import cv2
from flask import Flask, request, jsonify, send_from_directory
import tensorflow as tf
import numpy as np
from PIL import Image
import openai
import os
import speech_recognition as sr                                             

# Initialize Flask app
app = Flask(__name__)   

# Set your OpenAI API key from environment variable
openai.api_key = os.getenv('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')

## Load the TensorFlow Lite model
interpreter = tf.lite.Interpreter(model_path='model_unquant.tflite')
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Paths for ISL images and videos
ISL_IMAGES_PATH = r'C:\ISL TOOL\Indian'
ISL_VIDEOS_PATH = r'C:\ISL TOOL\Indian Sign Language Video and Text dataset for sentences (ISLVT)'

def preprocess_image(img):
    img = img.resize((224, 224))
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Normalize to [0, 1]
    return img_array

def predict_image(img):
    img_array = preprocess_image(img)
    interpreter.set_tensor(input_details[0]['index'], img_array)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    predicted_label = np.argmax(output_data[0])
    return chr(65 + predicted_label)  # Assuming the model outputs an index corresponding to A-Z

def form_word_with_openai(letters):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Form a meaningful word from the letters: {''.join(letters)}",
            max_tokens=10
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error communicating with OpenAI: {e}")
        return None

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            img = Image.open(file.stream).convert('RGB')
            prediction = predict_image(img)
            return jsonify({'predicted_letter': prediction}), 200
        except Exception as e:
            return jsonify({'error': f'Error processing image: {e}'}), 500

@app.route('/form_word', methods=['POST'])
def form_word():
    data = request.json
    letters = data.get('letters', [])
    if not letters:
        return jsonify({'error': 'No letters provided'}), 400

    word = form_word_with_openai(letters)
    if word:
        return jsonify({'translated_word': word}), 200
    else:
        return jsonify({'error': 'Could not form a meaningful word'}), 500

@app.route('/image_to_isl', methods=['POST'])
def image_to_isl():
    input_text = request.json.get('text', '')
    if input_text:
        process_text_to_isl(input_text)
        return jsonify({'status': 'Processed text to ISL'}), 200
    else:
        return jsonify({'error': 'No text provided'}), 400

@app.route('/text_to_isl', methods=['POST'])
def text_to_isl():
    mode = request.json.get('mode', '')
    if mode == "1":
        input_text = request.json.get('text', '')
        process_text_to_isl(input_text)
    elif mode == "2":
        recognized_text = recognize_speech()
        if recognized_text:
            process_text_to_isl(recognized_text)
    return jsonify({'status': 'Processed voice to ISL'}), 200

def find_sign_language_video(text):
    video_files = glob(os.path.join(ISL_VIDEOS_PATH, '*.mov'))
    for video in video_files:
        if text.lower() in os.path.basename(video).lower():
            return video
    return None

def display_isl_images(words):
    for word in words:
        image_files = [os.path.join(ISL_IMAGES_PATH, f"{char.upper()}.jpg") for char in word if char.isalpha()]

        for img_path in image_files:
            img = cv2.imread(img_path)
            if img is None:
                print(f"Failed to load image: {img_path}")
                continue
            cv2.imshow("ISL Alphabet", img)
            cv2.waitKey(1000)

        black_screen = np.zeros((480, 640, 3), dtype=np.uint8)
        cv2.imshow("ISL Alphabet", black_screen)
        cv2.waitKey(1000)

def process_text_to_isl(input_text):
    video_path = find_sign_language_video(input_text)
    if video_path:
        play_video(video_path)
    else:
        words = input_text.split()
        display_isl_images(words)

def play_video(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error opening video file: {video_path}")
        return

    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            cv2.imshow('ISL Video', frame)
            if cv2.waitKey(25) & 0xFF == ord('q'):
                break
        else:
            break

    cap.release()
    cv2.destroyAllWindows()

def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening for speech...")
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        print("Could not understand the audio")
    except sr.RequestError as e:
        print(f"Request error: {e}")
    return None

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'up'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)