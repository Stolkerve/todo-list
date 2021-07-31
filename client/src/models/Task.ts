import {JsonObject, JsonProperty} from "json2typescript"
import {DateConverter} from "@/models/converters/DateConverter"
import { BoolConverter } from "./converters/BoolConverter";

@JsonObject("Task")
export default class Task
{
  @JsonProperty("ID", Number, true)
  ID?: number = undefined;

  @JsonProperty("user_id", Number, true)
  user_id?: number = undefined;

  @JsonProperty("title", String, true)
  title?: String = undefined;

  @JsonProperty("done", BoolConverter, true)
  done?: Boolean = undefined;

  @JsonProperty("created", DateConverter, true)
  created?: Date = undefined;

  @JsonProperty("finished", DateConverter, true)
  finished?: Date = undefined;

  @JsonProperty("deleted", DateConverter, true)
  deleted?: Date = undefined;
  
  canEdit?: Boolean = false;
}