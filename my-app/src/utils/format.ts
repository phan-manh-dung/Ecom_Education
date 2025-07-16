/**
 * Format giá tiền theo định dạng Việt Nam
 * @param price - Giá tiền (number)
 * @returns Chuỗi giá đã format (VD: "12,000,000 VNĐ")
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN') + ' VNĐ';
};

/**
 * Format thời gian khóa học
 * @param time - Thời gian (string)
 * @returns Chuỗi thời gian đã format
 */
export const formatTime = (time: string): string => {
  return time || 'Chưa cập nhật';
};

/**
 * Format rating thành phần trăm
 * @param rating - Điểm đánh giá (number)
 * @returns Chuỗi phần trăm (VD: "4.8 (96% hài lòng)")
 */
export const formatRating = (rating: number): string => {
  return `${rating} (${Math.round(rating * 20)}% hài lòng)`;
}; 