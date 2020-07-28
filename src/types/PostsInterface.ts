import { IComputers } from "./ComputersInterface";
import { IPage } from "./PageInterface";
import { ILinks } from "./LinksInterface";

export interface IAd {
  content: IComputers[];
  page: IPage;
  links: ILinks[];
}
