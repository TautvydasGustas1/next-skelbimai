import { IImages } from "./ImagesInterface";
import { IUserInfo } from "./UserInfoInterface";

export interface IConsol {
  id: number;
  article: string;
  description: string;
  type: string;
  city: string;
  price: number;
  model: string;
  memory: string;
  color: string;
  images: IImages[];
  sub_category: string;
  personal_information: IUserInfo;
  categorySlug?: string;
}
