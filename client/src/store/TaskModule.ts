import Task from "@/models/Task";
import store from "@/store/store";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({dynamic: true, store, name: "TaskModule"})
export default class TaskModule extends VuexModule {
  public tasks: Task[] = [];

  @Mutation
  public editTask(task: Task) {
    var index: number = this.tasks.findIndex(t => t.ID === task.ID);
    this.tasks.splice(index, 1, task);
  }

  @Mutation
  public deleteTask(id: number) {
    var index: number = this.tasks.findIndex(t => t.ID === id);
    //if(index > -1) {
    this.tasks.splice(index, 1)
    //}else new Error("Invalid index");
  }

  @Mutation
  public addTask(newTask: Task) {
    var index: number = this.tasks.findIndex(t => t.ID === newTask.ID);
    this.tasks.push(newTask);
    //if(index == -1) {
    //}else new Error("Invalid index");
  }

  public get getTasks() {
    return this.tasks;
  }

  @Mutation
  public setTasks(newTasks: Task[]) {
    this.tasks = newTasks;
  }

}
