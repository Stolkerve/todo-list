import jsonConverter from "@/services/tools/JsonConverter"

export default class Methods {
  static async get(url: string, header: Headers = new Headers): Promise<Response> {
    const res = await fetch(url, {
      method: "GET",
      headers: header,
      mode: 'cors',
      cache: 'default'
    });
    return res
  }

  static async post(url: string, body: string, header: Headers = new Headers()): Promise<Response>
  {
    header.append("Content-Type", "application/json");
    const res = await fetch(url, {
        method: "POST",
        headers: header,
        mode: 'cors',
        cache: 'default',
        body: body
      }
    );
    return res;
  }

  static async put(url: string, body: string, header: Headers = new Headers()): Promise<Response> {
    header.append("Content-Type", "application/json");
    const res = await fetch(url, {
      method: "PUT",
      headers: header,
      mode: 'cors',
      cache: 'default',
      body: body,
    });
    return res;
  }

  static async delete(url: string, header: Headers = new Headers()): Promise<Response> {
    const res = await fetch(url, {method: "DELETE", headers: header, mode: 'cors', cache: 'default'});
    return res
  }
}