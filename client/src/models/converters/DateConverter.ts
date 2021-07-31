import {JsonConverter, JsonCustomConvert} from "json2typescript"
import {toTimeStamp} from "@/utils/timestamp"
@JsonConverter
export class DateConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        return toTimeStamp(date);
    }
    //const out = toTimeStamp(date);
    deserialize(date: string): Date {
        return new Date(date);
    }
    
}