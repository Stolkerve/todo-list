import express, {Application} from "express";
import morgan from "morgan";
import cors from "cors";

import { MySqlConnection } from "./database";
import TodoListRouterRouter from "./routers/TodoListRouter";
import AuthRouter from "./routers/AuthRouter";


export default class App
{
  private server: Application;

  constructor() {
    MySqlConnection.Init();

    this.server = express();

    this.middlewares();
    this.routers();
  }

  middlewares(): void {
    this.server.use(morgan("dev"));
    this.server.use(express.json());
    this.server.use(cors());
  }

  routers(): void {
    this.server.use("/api/todo-list/", TodoListRouterRouter);
    this.server.use("/api/auth/", AuthRouter);
  }

  run(port: any): void {
    this.server.listen(port, () => {
      console.info(`El servidor esta corriendo en el puerto ${port}`)
    });
  }
}
