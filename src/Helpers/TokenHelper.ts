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
    if (token === undefined) {
      return false;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: () => true,
    };

    const res = await axios.get(`/api/users/information/v1`, config);
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
      //Change state or remove the cookie
      Cookies.remove("auth");
      //redirect
      navService.redirectUser("/login", ctx);
    }
    return token;
  }

  public async authenticateAdmin(ctx: NextPageContext, token?: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const res = await axios.get("/api/users/v1/admin", config);
      const navService = new NavService();

      if (!res.data.is_admin) {
        navService.redirectUser("/404", ctx);
      }
    } catch (error) {
      const navService = new NavService();
      navService.redirectUser("/404", ctx);
    }
  }

  public parseCookies(req: IncomingMessage | undefined) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
  }
}

export default TokenService;
