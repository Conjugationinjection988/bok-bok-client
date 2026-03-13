import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

export const createRoom = (payload) => api.post("/rooms", payload);
export const getPublicRooms = () => api.get("/rooms/public");
export const getRoomById = (roomId) => api.get(`/rooms/${roomId}`);
export const getMessages = (roomId, page = 1, limit = 50) =>
  api.get(`/messages/${roomId}?page=${page}&limit=${limit}`);

export const postMessage = (roomId, payload) =>
  api.post(`/messages/${roomId}`, payload);

export default api;
