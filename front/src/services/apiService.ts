import axios from "axios";
import { auth } from "../config/firebase.config";

export interface ApiService {
  syncUserWithBackend: (firebaseUser: any) => Promise<any>;
}

export class AxiosApiService implements ApiService {
  private api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_API_URL}/api`,
  });

  constructor() {
    this.api.interceptors.request.use(async (config) => {
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async syncUserWithBackend(firebaseUser: any): Promise<any> {
    const token = await firebaseUser.getIdToken();
    const response = await this.api.post(
      "/auth/session",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.user;
  }
}
