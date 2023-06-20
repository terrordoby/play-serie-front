import { axiosConfig } from "../lib/axios.config";

export class UserService {
  static async create(data) {
    try {
      const result = await axiosConfig.post("/users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return result;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async getUserSeries(data ,status) {
    try {
      const result = await axiosConfig.post(`/user/series/?status=${status}`, data);
      return result.data;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async getAllUsers() {
    try {
      const result = await axiosConfig.get("/users");
      return result.data;
    } catch (err) {
      console.log(err.message);
    }
  }
}
