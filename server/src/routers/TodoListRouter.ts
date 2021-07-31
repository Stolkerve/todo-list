import {Router, Request, Response} from "express"
import { MySqlConnection } from "../database";
import { Task } from "../models/Task";
import {autho, generateToken} from "../middlewares/tokenTools";

const router = Router();

router.get("/", autho, async (req: Request, res: Response) => {
  const tasks: any = await MySqlConnection.Query(
    "SELECT tasks.* FROM tasks INNER JOIN users ON users.id = tasks.user_id WHERE users.id = ?", [res.locals.user.ID]);
  if(tasks[0]) {  
    return res.json(tasks[0]);
  }
  return res.sendStatus(500);
});

router.get("/history", autho, async (req: Request, res: Response) => {
  return res.json((await MySqlConnection.Query("SELECT * FROM tasks WHERE deleted IS NOT NULL"))[0]);
});

router.post("/", autho, async (req: Request, res: Response) => {
  const newTask: Task = req.body;
  newTask.user_id = res.locals.user.ID;
  await MySqlConnection.Query("INSERT INTO tasks SET ?", [newTask])
  const lastTask = (await MySqlConnection.Query("SELECT * FROM tasks WHERE ID = (SELECT MAX(ID) FROM tasks WHERE user_id = ?)",
    [newTask.user_id]))[0];
  return res.json(lastTask);
});

router.put("/:id", autho, async (req: Request, res: Response) => {
  const newTask: Task = req.body;
  const id = req.params.id
  await MySqlConnection.Query("UPDATE tasks SET ? WHERE ID = ?", [newTask, id]);
  return res.json("updated");
});

router.delete("/:id", autho, async (req: Request, res: Response) => {
  const id = req.params.id
  await MySqlConnection.Query("DELETE FROM tasks WHERE ID = ?", [id]);
  return res.json("deleted")
});

export default router