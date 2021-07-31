import mysql2, {Connection} from "mysql2/promise"

export class MySqlConnection
{
  private static connection: Connection;
  static async Init() {
    this.connection = await mysql2.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "123",
      database: "todo_project",
      dateStrings: true,
      
    })

    if(!this.connection) {
      process.exit(1);
    }

    await this.Query("CREATE DATABASE IF NOT EXISTS todo_project");
    await this.Query("USE todo_project");
    await this.Query(`
      CREATE TABLE IF NOT EXISTS users(
      ID INT AUTO_INCREMENT NOT NULL,
      username VARCHAR(30) NOT NULL,
      email VARCHAR(254) NOT NULL,
      password VARCHAR(64) NOT NULL,
      created TIMESTAMP NOT NULL,
      PRIMARY KEY(ID))`);
    await this.Query(`
      CREATE TABLE IF NOT EXISTS tasks(
      ID INT AUTO_INCREMENT NOT NULL,
      user_id INT NOT NULL,
      title VARCHAR(40) NOT NULL,
      done BOOLEAN DEFAULT 0,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      finished TIMESTAMP ,
      deleted TIMESTAMP,
      PRIMARY KEY(ID),
      FOREIGN KEY (user_id) REFERENCES users(ID))`);
  }

  static async Query(query: string, values: any | any[] | { [param: string]: any } = undefined) {
    return await this.connection.query(query, values);
  }

}