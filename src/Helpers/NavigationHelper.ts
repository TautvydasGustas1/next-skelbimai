import Router from "next/router";
import { NextPageContext, GetServerSidePropsContext } from "next/types";

class NavService {
  public redirectUser(
    dest: string,
    ctx: NextPageContext | GetServerSidePropsContext
  ) {
    const res = ctx.res;
    if (res) {
      res.writeHead(302, { Location: dest });
      res.end();
    } else {
      Router.push(dest);
    }
  }
}

export default NavService;
