import { ISnackBar } from '@/types/UI/SnackBar'

export interface IUIState {
    header: IHeader
    pageLoading: boolean
    snackBar: ISnackBar
    deviceSize: string,
    modal:IModal
}

export interface IPageLoadStatus {
    status: boolean
    timeout: number | null
}


export interface IHeader {
    current?: string
    title: string
    isShowing: boolean
    bgColor?: string
}

export interface IModal {
    title: string;
    classes: string;
    body: string;
    footer: string | null;
}