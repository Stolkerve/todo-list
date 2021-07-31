import {JsonConverter, JsonCustomConvert} from "json2typescript"

@JsonConverter
export class BoolConverter implements JsonCustomConvert<Boolean> {
    serialize(boolean: boolean): any {
        return boolean === true ? 1 : 0;
    }
    
    deserialize(boolean: any): Boolean {
        return boolean === 1 ? true : false;
    }
    
}