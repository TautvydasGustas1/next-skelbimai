import { IComputers } from "./ComputersInterface";
import { IPage } from "./PageInterface";
import { ILinks } from "./LinksInterface";
import { IUserInfo } from "./UserInfoInterface";

export interface IAd {
  content: IComputers[];
  page: IPage;
  links: ILinks[];
  personal_information: IUserInfo;
}
