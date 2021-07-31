import { Router, Request, Response, NextFunction } from "express";
import {autho, generateToken} from "../middlewares/tokenTools";
import { MySqlConnection } from "../database";
import { User } from "../models/User";
import Encrypt from "../encrypt";

const router: Router = Router();

router.post("/logout", async (req: Request, res: Response) => {

});

router.post("/login", async (req: Request, res: Response) => {
  const user: User = req.body
  const existingUsers: any= (await MySqlConnection.Query("SELECT * FROM users WHERE email = ?",
                            [user.email]))[0];
  if(existingUsers[0] && await Encrypt.compare(user.password, existingUsers[0].password)) {
    const token = generateToken({
      ID: existingUsers[0].ID,
      username: existingUsers[0].username,
      email: existingUsers[0].email,
      created: existingUsers[0].created
    });
    console.log(token);
    return res.json({ token: token });
  }
  return res.sendStatus(403);
});

router.get("/signup/:username/:email", async (req: Request, res: Response) => {
  const newUser: any = req.params;
  const existingUsers:any = (await MySqlConnection.Query("SELECT username, email FROM users WHERE username = ? OR email = ?",
                            [newUser.username, newUser.email]))[0];
  var existUser: boolean = false;
  var existEmail: boolean = false;
  if(existingUsers[0]) {
    existUser = existingUsers[0].username === newUser.username;
    existEmail = existingUsers[0].email === newUser.email;
  }
  return res.json({existUser, existEmail})
});

router.post("/signup", async (req: Request, res: Response) => {
  const newUser: User = req.body
  newUser.password = await Encrypt.hash(newUser.password)
  const succes = await MySqlConnection.Query("INSERT INTO users SET ?", [req.body])
  if (succes.length) {
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
});

export default router;