import { CreatedByUserVm } from "@/types/ViewModels/Models/UserVm";


export interface EventGalleryVm {
  eventId: number;
  mainImg: string;
  name: string;
  year: string;
  images: Array<GalleryImgVm>
}

export interface GalleryWithNoImageVm {
  eventId: number
  year: string
  name: string;
  mainImg: string;
  numOfImages: number
}

export interface GalleryImgVm {
  imageId: string
  createdBy: CreatedByUserVm
  createdOn: string;
  likes: Array<LikeImgVm>
  comments: Array<CommentImgVm>
  image: string;
}


export interface LikeImgVm {
  userId: string;
  fullName: string;
}

export interface CommentImgVm {
  commentId: string;

}
