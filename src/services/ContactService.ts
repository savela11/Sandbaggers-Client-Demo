import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { ContactVm } from "@/types/ViewModels/ContactVm";


const url = '/Contact'


 class ContactService {
  static async Contacts(): Promise<AxiosResponse<Array<ContactVm>>> {
    return await apiClient.get(url + `/Contacts`)
  }

}


export default ContactService
