import api from "../utils/api";

const postService = {
  createPost: async (data) => {
    try {
      const res = await api.post("/posts", data);
      return res.data;
    } catch (error) {
      console.error("Lỗi tạo bài viết:", error);
      throw error;
    }
  },

  getPosts: async (page = 1, limit = 10) => {
    try {
      const res = await api.get(`/posts?page=${page}&limit=${limit}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi lấy danh sách bài viết:", error);
      throw error;
    }
  },

  getPostById: async (id) => {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi lấy bài viết:", error);
      throw error;
    }
  },

  updatePost: async (id, data) => {
    try {
      const res = await api.put(`/posts/${id}`, data);
      return res.data;
    } catch (error) {
      console.error("Lỗi cập nhật bài viết:", error);
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const res = await api.delete(`/posts/${id}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi xóa bài viết:", error);
      throw error;
    }
  },

  updatePostStatus: async (id, status) => {
    try {
      const res = await api.put(`/posts/status/${id}`, { status });
      return res.data;
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái bài viết:", error);
      throw error;
    }
  },
};

export default postService;
