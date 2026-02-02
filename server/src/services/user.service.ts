import { User } from "../models/types";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findUser(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(email: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const newUser: User = {
      email,
      createdAt: new Date(), // Firestore converts JS Date to Timestamp
    };
    return this.userRepository.create(newUser);
  }
}
