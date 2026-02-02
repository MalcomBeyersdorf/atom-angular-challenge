import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";

// DI could be better but keeping it simple for now
const userService = new UserService(new UserRepository());

export class UserController {
  static async checkUser(req: Request, res: Response) {
    try {
      const email = req.params.email as string;
      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }
      const user = await userService.findUser(email);
      res.json({ exists: !!user, user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }
      const user = await userService.createUser(email);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === "User already exists") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
