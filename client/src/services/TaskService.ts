import Tools from "@/services/tools/Tools"
import Task from "@/models/Task"
import Methods from "@/services/methods"
import jsonConverter from "@/services/tools/JsonConverter"
import UserModule from "@/store/UserModule";
import { getModule } from "vuex-module-decorators";

export default class TaskService {
  private static url = `${Tools.SERVER_URL}api/todo-list/`;
  private static userModule: UserModule = getModule(UserModule);
  private static createHeader() {
    return new Headers({"authorization": this.userModule.getToken ? this.userModule.getToken : ""});
  }

  static async getTask(): Promise<Task[] | undefined> {
    try {
      const res = await Methods.get(this.url, this.createHeader())
      const json = await res.json();
      return jsonConverter.deserializeArray(json, Task);
    } catch(err: any) {
      console.error(err);
      return undefined;
    }
  }

  static async postTask(newTask: Task) : Promise<Task | undefined> {
    try {
      const res = await Methods.post(this.url, JSON.stringify(jsonConverter.serializeObject(newTask, Task)), this.createHeader());
      const json = jsonConverter.deserializeArray(await res.json(), Task);
      return json[0];
    } catch(err: any) {
      console.error(err);
      return undefined;
    }
  }

  static async deleteTask(id: Number) {
    try {
      const res = await Methods.delete(`${this.url}${id}`, this.createHeader());
    } catch(err: any) {
      console.error(err);
    }
  }

  static async updateTask(newTask: Task, id: number) {
    try {
      const body = JSON.stringify(jsonConverter.serializeObject(newTask, Task));
      const res = await Methods.put(`${this.url}${id}`, body, this.createHeader());
    } catch(err) {
      console.error(err);
    }
  }
}