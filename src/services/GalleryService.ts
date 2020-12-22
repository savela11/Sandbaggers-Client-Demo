import apiClient from "../utility/apiClient";
import { AxiosResponse } from "axios";
import { GalleryWithNoImageVm } from "@/types/ViewModels/EventGallery";

const url = "/Gallery";

class GalleryService {
  static async Galleries(): Promise<AxiosResponse<Array<GalleryWithNoImageVm>>> {
    return await apiClient.get(`${url}/Galleries`);
  }
}

export default GalleryService;
