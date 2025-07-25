import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockCourses } from "../mockData/courses";

// Khởi tạo mock adapter
const mock = new MockAdapter(axios, { delayResponse: 1000 }); // giả lập delay 1s

// Mock API: GET /api/courses - trả về toàn bộ danh sách khóa học
mock.onGet("/api/courses").reply(200, mockCourses);

// Mock API: GET /api/courses/:id - trả về chi tiết 1 khóa học
mock.onGet(/\/api\/courses\/\d+/).reply((config) => {
  if (!config.url) {
    return [400, { message: "URL không hợp lệ" }];
  }
  
  const id = config.url.split("/").pop(); // lấy id cuối URL
  const course = mockCourses.find((c) => c.id === id);

  if (course) {
    return [200, course];
  } else {
    return [404, { message: "Không tìm thấy khóa học" }];
  }
});

// Mock API: GET /api/suggestions?userId=xxx - trả về 4 khóa học gợi ý
mock.onGet(/\/api\/suggestions.*/).reply((config) => {
  if (!config.url) {
    return [400, { message: "URL không hợp lệ" }];
  }
  // Gợi ý: trả về 4 khóa học có id 11, 12, 13, 14
  const suggestions = mockCourses.filter(c => ["11", "12", "13", "14"].includes(c.id));
  return [200, suggestions];
});
