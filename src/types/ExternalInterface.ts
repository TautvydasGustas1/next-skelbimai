import { IImages } from "./ImagesInterface";
import { IUserInfo } from "./UserInfoInterface";

export interface IExternal {
  id: number;
  article: string;
  description: string;
  type: string;
  city: string;
  price: number;
  brand: string;
  wireless: string;
  images: IImages[];
  sub_category: string;
  personal_information: IUserInfo;
  categorySlug?: string;
}
