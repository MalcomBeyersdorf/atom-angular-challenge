import * as admin from "firebase-admin";
import { User } from "../models/types";

export class UserRepository {
  private collection = admin.firestore().collection("users");

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.collection.doc(email).get();
    if (doc.exists) {
      return doc.data() as User;
    }
    return null;
  }

  async create(user: User): Promise<User> {
    // using email as doc ID simplifies uniqueness check
    await this.collection.doc(user.email).set(user);
    return user;
  }
}
