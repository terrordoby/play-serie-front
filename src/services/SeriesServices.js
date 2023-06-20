import { axiosConfig } from "../lib/axios.config";

export class SeriesService {

  static async create(data) {
    try {
      const response = await axiosConfig.post("/serie", data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAll() {
    try {
      const response = await axiosConfig.get("/serie");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async getSerieById(id){
    try {
      const response = await axiosConfig.get(`/serie/edit/${id}`);
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async getSerieByIdView(id){
    try {
      const response = await axiosConfig.get(`/serie/${id}`);
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async updateSerie(id, formData) {
    try {
      const response = await axiosConfig.patch(`/serie/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addStatusToSerie(data) {
    try {
      const response = await axiosConfig.post("/status", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async deleteSerieList(data) {
    try {
      const response = await axiosConfig.delete("/serie/list-status", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async deleteSerie(id) {
    try {
      const response = await axiosConfig.delete(`/serie/${id}`);
      return response;
    } catch (err) {
      console.log(err.message);
    }
  }
}
