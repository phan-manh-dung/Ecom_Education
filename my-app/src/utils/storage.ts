/**
 * Lấy danh sách ID khóa học yêu thích từ localStorage
 * @returns Array các ID khóa học yêu thích
 */
export const getFavoriteCourses = (): string[] => {
  try {
    const saved = localStorage.getItem('favoriteCourses');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Lỗi khi đọc danh sách yêu thích:', error);
    return [];
  }
};

/**
 * Thêm khóa học vào danh sách yêu thích
 * @param id - ID khóa học
 */
export const addFavoriteCourse = (id: string): void => {
  try {
    const favorites = getFavoriteCourses();
    if (!favorites.includes(id)) {
      const newFavorites = [...favorites, id];
      localStorage.setItem('favoriteCourses', JSON.stringify(newFavorites));
    }
  } catch (error) {
    console.error('Lỗi khi thêm khóa học yêu thích:', error);
  }
};

/**
 * Xóa khóa học khỏi danh sách yêu thích
 * @param id - ID khóa học
 */
export const removeFavoriteCourse = (id: string): void => {
  try {
    const favorites = getFavoriteCourses();
    const newFavorites = favorites.filter(courseId => courseId !== id);
    localStorage.setItem('favoriteCourses', JSON.stringify(newFavorites));
  } catch (error) {
    console.error('Lỗi khi xóa khóa học yêu thích:', error);
  }
};

/**
 * Toggle trạng thái yêu thích khóa học
 * @param id - ID khóa học
 */
export const toggleFavoriteCourse = (id: string): void => {
  try {
    const favorites = getFavoriteCourses();
    if (favorites.includes(id)) {
      removeFavoriteCourse(id);
    } else {
      addFavoriteCourse(id);
    }
  } catch (error) {
    console.error('Lỗi khi toggle khóa học yêu thích:', error);
  }
};

/**
 * Kiểm tra khóa học có được yêu thích không
 * @param id - ID khóa học
 * @returns true nếu đã yêu thích, false nếu chưa
 */
export const isFavoriteCourse = (id: string): boolean => {
  try {
    const favorites = getFavoriteCourses();
    return favorites.includes(id);
  } catch (error) {
    console.error('Lỗi khi kiểm tra trạng thái yêu thích:', error);
    return false;
  }
};

/**
 * Lấy số lượng khóa học yêu thích
 * @returns Số lượng khóa học yêu thích
 */
export const getFavoriteCoursesCount = (): number => {
  return getFavoriteCourses().length;
};

/**
 * Lấy danh sách ID khóa học đã xem từ localStorage
 */
export const getViewedCourses = (): string[] => {
  try {
    const saved = localStorage.getItem('viewedCourses');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Lỗi khi đọc lịch sử xem:', error);
    return [];
  }
};

/**
 * Thêm một khóa học vào lịch sử xem (không trùng lặp, mới nhất lên đầu)
 */
export const addViewedCourse = (id: string): void => {
  try {
    let viewed = getViewedCourses();
    viewed = viewed.filter(courseId => courseId !== id); // Xóa nếu đã có
    viewed.unshift(id); // Thêm mới nhất lên đầu
    if (viewed.length > 20) viewed = viewed.slice(0, 20); // Giới hạn 20 mục gần nhất
    localStorage.setItem('viewedCourses', JSON.stringify(viewed));
  } catch (error) {
    console.error('Lỗi khi thêm lịch sử xem:', error);
  }
};

/**
 * Xóa toàn bộ lịch sử xem
 */
export const clearViewedCourses = (): void => {
  try {
    localStorage.removeItem('viewedCourses');
  } catch (error) {
    console.error('Lỗi khi xóa lịch sử xem:', error);
  }
};

// CART STORAGE
export interface CartItem {
  id: string;
  quantity: number;
}

export const getCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Lỗi khi đọc giỏ hàng:', error);
    return [];
  }
};

export const addToCart = (id: string, quantity: number = 1): void => {
  try {
    const cart = getCart();
    const idx = cart.findIndex(item => item.id === id);
    if (idx > -1) {
      cart[idx].quantity += quantity;
    } else {
      cart.push({ id, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
  }
};

export const removeFromCart = (id: string): void => {
  try {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Lỗi khi xóa khỏi giỏ hàng:', error);
  }
};

export const clearCart = (): void => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error('Lỗi khi xóa giỏ hàng:', error);
  }
};

export const updateCartItemQuantity = (id: string, quantity: number): void => {
  try {
    const cart = getCart();
    const idx = cart.findIndex(item => item.id === id);
    if (idx > -1) {
      cart[idx].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật số lượng:', error);
  }
};
