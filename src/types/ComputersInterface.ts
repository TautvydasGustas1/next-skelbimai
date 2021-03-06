import { ILinks } from "./LinksInterface";
import { IImages } from "./ImagesInterface";
import { IUserInfo } from "./UserInfoInterface";

export interface IComputers {
  id: number;
  article: string;
  description: string;
  type: string;
  city: string;
  price: number;
  cpu: string;
  motherboard: string;
  gpu: string;
  ram: string;
  memory: string;
  images: IImages[];
  sub_category: string;
  links: ILinks[];
  personal_information: IUserInfo;
  categorySlug?: string;
}
