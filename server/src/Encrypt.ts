import bcrypt from "bcrypt"
export default class Encrypt {
  private static saltRounds = 10;
  static async hash(text: string | undefined) {
    if(text) { return bcrypt.hash(text, this.saltRounds) };
    return undefined
  }

  static async compare(text: string | undefined, hash: string) {
    if(text) { return bcrypt.compare(text, hash) }
    return undefined
  }
}