import { firebase } from "..";
import { User } from "../models/types";

export class UserRepository {
  private collection = firebase.firestore().collection("users");

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection
      .where("email", "==", email.toLowerCase())
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as User;
  }

  async create(user: User): Promise<User> {
    await this.collection.add({
      ...user,
      email: user.email.toLowerCase(),
    });

    return user;
  }
}
