import { ILinks } from "./LinksInterface";
import { IImages } from "./ImagesInterface";
import { IUserInfo } from "./UserInfoInterface";

export interface IMonitors {
  id: number;
  article: string;
  description: string;
  type: string;
  city: string;
  price: number;
  brand: string;
  model: string;
  refresh_rate: string;
  resolution: string;
  response_time: string;
  images: IImages[];
  sub_category: string;
  links: ILinks[];
  personal_information: IUserInfo;
  categorySlug?: string;
}
