export interface Task {
  ID?: number;
  user_id?: number;
  title: string;
  done?: boolean;
  created?: Date;
  finished?: Date;
  deleted?: Date;
}