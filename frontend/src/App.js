import React, {useState, useRef} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isLoadedImg, setIsLoadedImg] = useState(false)
  const [grayImage, setGrayImage] = useState(null)
  const [urlGrayImage, setUrlGrayImage] = useState(null)

  const [image, setImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null)
  
  const fileInputRef = useRef(null);

  // Xử lý chọn ảnh RGB từ máy tính
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setUrlImage(URL.createObjectURL(file))
      setIsLoadedImg(true);
    }
  };

  // Xử lý clich chuột nút "Tải ảnh lên"
  const handleClickLoadImage = () => {
    fileInputRef.current.click(); // Kích hoạt cửa sổ chọn ảnh khi nhấp vào nút
  };

  // Xử lý xóa dữ liệu ảnh đang hiện trên màn hình
  const handleClickClear = () => {
    setImage(null);
    setGrayImage(null)
    setIsLoadedImg(false);

    URL.revokeObjectURL(urlImage)
    setUrlImage(null)
    URL.revokeObjectURL(urlGrayImage)
    setUrlGrayImage(null)
  }

  // Xử lý gửi ảnh RGB và nhận ảnh Gray thông qua api process-image
  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append('file', image);
    try {
      const response = await axios.post('http://localhost:5000/api/process-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      });
      const file = new File([response.data], { type: 'image/jpeg' })
      // const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      setGrayImage(file);
      setUrlGrayImage(URL.createObjectURL(file))
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  // Giao diện trang web
  return (
    <div class='App'>
      <div class='Head'>
        <div class='Head_left'>
          <b>Thông tin sinh viên</b>
          <p>Họ tên: Nguyễn Anh Tuấn</p>
          <p>MSSV: 20120395</p>
        </div>
        <div class='Head_center'>
          <b>BÀI TẬP CÁ NHÂN 1</b>
        </div>
        <div class='Head_right'>
          <div class="logo_container">
            <img src={process.env.PUBLIC_URL + "/logo_hcmus.png"}/>
          </div>
        </div>
      </div>

      <div class='Body'>
        <div class='Body_left'>
          <div class="Header">
            <b>Ảnh đầu vào</b>
          </div>
          <div class='Image_container'>
            <div class='Image_box'>
              {image && <img src={urlImage} alt="Selected" />}
            </div>
          </div>
        </div>
        <div class='Body_center'>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <button className={`custom-button ${isLoadedImg ? 'disabled' : ''}`} onClick={handleClickLoadImage}>
            Tải ảnh lên
          </button>
          <button className={`custom-button ${isLoadedImg ? '' : 'disabled'}`} onClick={handleUploadImage}>
            Chuyển đổi
          </button>
          <button className={`custom-button ${isLoadedImg ? '' : 'disabled'}`} onClick={handleClickClear}>
            Làm mới
          </button>
        </div>

        <div class='Body_right'>
          <div class="Header">
            <b>Ảnh xám</b>
          </div>
          <div class='Image_container'>
            <div class='Image_box'>
              {grayImage && <img src={urlGrayImage}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
