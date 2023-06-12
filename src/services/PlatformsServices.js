import { axiosConfig } from "../lib/axios.config";

export class PlatFormService {
  static async getAll() {
    try {
      const response = await axiosConfig.get("/platforms");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
}
