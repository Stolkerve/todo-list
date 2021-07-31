import { JsonObject, JsonProperty } from "json2typescript";
import { DateConverter } from "./converters/DateConverter";

@JsonObject("User")
export default class User {
  @JsonProperty("ID", Number, true)
  ID?: number = undefined;

  @JsonProperty("username", String, true)
  username?: string = undefined;

  @JsonProperty("email", String, true)
  email?:string = undefined;

  @JsonProperty("password", String, true)
  password?:string = undefined;

  @JsonProperty("created", DateConverter, true)
  created?: Date = undefined;
}