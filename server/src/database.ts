import mysql2, {Connection} from "mysql2/promise"

export class MySqlConnection
{
  private static connection: Connection;
  static async Init() {
    this.connection = await mysql2.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "1234",
      database: "todo_project",
      dateStrings: true,
      
    })

    if(!this.connection) {
      process.exit(1);
    }
  }

  static async Query(query: string, values: any | any[] | { [param: string]: any } = undefined) {
    return await this.connection.query(query, values);
  }

}