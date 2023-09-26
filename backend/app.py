from flask import Flask, request, send_file
from io import BytesIO
from flask_cors import CORS
from utils import rgb_to_gray
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/api/process-image', methods=['POST'])
def process_image():
    try:
        file = request.files['file']
    except KeyError:
        return "No file part in the request", 400

    # Đọc ảnh từ file gửi từ frontend
    img = np.array(Image.open(file).convert('RGB'))

    # Chuyển RGB sang Gray
    gray = rgb_to_gray(img)
    gray = np.stack((gray, gray, gray), axis=-1)
    gray = Image.fromarray(gray)

    # Lưu ảnh vào một buffer
    gray_io = BytesIO()
    gray.save(gray_io, 'JPEG')
    gray_io.seek(0)

    # Trả về ảnh Gray
    return send_file(gray_io, mimetype='image/jpeg')

if __name__ == "__main__":
    app.run(debug=True)