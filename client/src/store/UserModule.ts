import store from "@/store/store";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({dynamic: true, store, name: "UserModule"})
export default class UserModule extends VuexModule {
  public token: string | null = null;
  // public username?: string;

  // @Mutation
  // public setUsername(name: string) {

  // }

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
  
}
