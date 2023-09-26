import cv2

# Hàm chuyển ảnh RGB sang ảnh xám
def rgb_to_gray(rgb_image):
    r = rgb_image[:,:,0]
    g = rgb_image[:,:,1]
    b = rgb_image[:,:,2]
    # Luma conversion formular
    gray = 0.3*r + 0.6*g + 0.1*b
    return gray.astype('uint8')