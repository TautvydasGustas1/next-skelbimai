import { NextPageContext } from "next/types";
import Cookies from "js-cookie";
import axios from "axios";
import NavService from "./NavigationHelper";
import cookie from "cookie";
import { IncomingMessage } from "http";

class TokenService {
  public saveToken(token: string) {
    Cookies.set("auth", token);
    return Promise.resolve();
  }

  public async checkAuthToken(token: string | undefined): Promise<Boolean> {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: () => true,
    };

    const res = await axios.get(`/api/users/information/v1`, config);
    console.log(res);

    if (res.status === 200 || res.status === 400) {
      return true;
    }

    return false;
  }
  public async authenticateTokenSsr(ctx: NextPageContext) {
    let token: string | undefined = "";

    if (ctx.req) {
      const cookies = this.parseCookies(ctx.req);
      token = cookies.auth;
    } else {
      token = Cookies.get("auth");
    }

    const response = await this.checkAuthToken(token);
    if (!response) {
      const navService = new NavService();
      navService.redirectUser("/login", ctx);
    }
    return token;
  }

  public parseCookies(req: IncomingMessage | undefined) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
  }
}

export default TokenService;
