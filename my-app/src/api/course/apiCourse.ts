import axios from 'axios';

interface Course {
  id: string;
  title: string;
  price: number;
  auth: string;
  image: string;
  time: string;
}


export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get('/api/courses');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Lỗi API:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể tải danh sách khóa học');
    } else {
      throw new Error('Đã xảy ra lỗi!');
    }
  }
};