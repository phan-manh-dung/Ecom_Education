import axios from 'axios';

interface Course {
  id: string;
  title: string;
  price: number;
  auth: string;
  image: string;
  time: string;
}

interface CourseDetail extends Course {
  shortDesc: string;
  fullDesc: string;
  rating: number;
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

export const getCourseDetail = async (id: string): Promise<CourseDetail> => {
  try {
    const response = await axios.get(`/api/courses/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Lỗi API:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể tải chi tiết khóa học');
    } else {
      throw new Error('Đã xảy ra lỗi!');
    }
  }
};