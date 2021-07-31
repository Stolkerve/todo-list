import User from "@/models/User";
import Methods from "@/services/methods";
import jsonConverter from "@/services/tools/JsonConverter";
import Tools from "@/services/tools/Tools";
import UserModule from "@/store/UserModule";

import { getModule } from "vuex-module-decorators";

export default class AuthService {
  static url = `${Tools.SERVER_URL}api/auth/`;

  static async addUser(newUser: User): Promise<boolean | undefined> {
    try {
      const res = await Methods.post(`${this.url}signup`, JSON.stringify(jsonConverter.serializeObject(newUser, User)));
      if(res.status === 200) {
        return false;
      }
      else {
        return true;
      }
    } catch(e: any) {
      console.error(e);
    }
  }

  static async existUser(newUser: any): Promise<any | undefined> {
    try {
      const res = await Methods.get(`${this.url}signup/${newUser.username}/${newUser.email}`);
      const json = await res.json();
      return json;
    } catch(e: any) {
      console.error(e);
    }
  }

  static async login(user: User) {
    try {
      const res = await Methods.post(`${this.url}login`, JSON.stringify(jsonConverter.serializeObject(user, User)));
      if(res.status === 200) {
        const json = await res.json();
        getModule(UserModule).setToken(await json.token);
        return true;
      }
      else {
        return false;
      }
    } catch(e: any) {
      console.error(e);
    }
  }
}