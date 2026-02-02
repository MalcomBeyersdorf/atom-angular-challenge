import * as admin from "firebase-admin";
import { Task } from "../models/types";

export class TaskRepository {
  private collection = admin.firestore().collection("tasks");

  async findAllByUser(userEmail: string): Promise<Task[]> {
    const snapshot = await this.collection
      .where("userEmail", "==", userEmail)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Task,
    );
  }

  async create(task: Task): Promise<Task> {
    const docRef = await this.collection.add(task);
    return { ...task, id: docRef.id };
  }

  async update(taskId: string, updates: Partial<Task>): Promise<void> {
    await this.collection.doc(taskId).update(updates);
  }

  async delete(taskId: string): Promise<void> {
    await this.collection.doc(taskId).delete();
  }

  async findById(taskId: string): Promise<Task | null> {
    const doc = await this.collection.doc(taskId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() } as Task;
    }
    return null;
  }
}
