import store from "@/store/store";
import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({dynamic: true, store, name: "UserModule"})
export default class UserModule extends VuexModule {
  public token: string | null = null;
  public username?: string;

  @Mutation
  public setUserName(name: string | undefined) {
    this.username = name ? name : undefined;
  }

  @Mutation
  public setToken(token: string) {
    this.token = token;
  }

  get isLoggedIn() {
    return !!this.token;
  }

  get getToken() {
    return this.token;
  }
  
  get getUserName() {
    return this.username;
  }
}

export const userModule: UserModule = getModule(UserModule);