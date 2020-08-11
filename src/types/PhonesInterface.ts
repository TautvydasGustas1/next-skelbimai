import { ILinks } from "./LinksInterface";
import { IImages } from "./ImagesInterface";
import { IUserInfo } from "./UserInfoInterface";

export interface IPhones {
  id: number;
  article: string;
  description: string;
  type: string;
  city: string;
  price: number;
  os: string;
  model: string;
  ram: string;
  manufacturer: string;
  memory: string;
  camera: string;
  images: IImages[];
  sub_category: string;
  links: ILinks[];
  personal_information: IUserInfo;
}
