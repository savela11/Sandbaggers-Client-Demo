import apiClient from "../utility/apiClient";
import { AxiosResponse } from "axios";
import { EventGalleryVm, GalleryWithNoImageVm } from "@/types/ViewModels/EventGallery";

const url = "/Gallery";

class GalleryService {
  static async Galleries(): Promise<AxiosResponse<Array<GalleryWithNoImageVm>>> {
    return await apiClient.get(`${url}/Galleries`);
  }

  static async Gallery(eventId: string): Promise<AxiosResponse<EventGalleryVm>> {
    return await apiClient.get(`${url}/Gallery/${eventId}`);
  }
}

export default GalleryService;
