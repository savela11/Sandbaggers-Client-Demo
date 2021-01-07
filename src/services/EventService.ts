import apiClient from "../utility/apiClient";
import { AxiosResponse } from "axios";
import { EventVm } from "@/types/ViewModels/EventVm";
import { CreateEventDto } from "@/types/DTO/EventDto";

const url = "/events";

class EventService {
  static async GetEventsByYear(): Promise<AxiosResponse<Array<EventVm>>> {
    return await apiClient.get(`${url}/EventList`);
  }

  static async CreateEvent(createEventForm: CreateEventDto): Promise<AxiosResponse<EventVm>> {
    return await apiClient.post(`${url}/CreateEvent`, createEventForm);

  }

  static async GetEventById(id: string): Promise<AxiosResponse<EventVm>> {
   return await apiClient.get(`${url}/GetEventById/${id}`)
  }

  static async UpdateEvent(Event: EventVm): Promise<AxiosResponse> {
    return await apiClient.post(`${url}/UpdateEvent`, Event)

  }
}


export default EventService;
