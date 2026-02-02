"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const user_repository_1 = require("../repositories/user.repository");
// DI could be better but keeping it simple for now
const userService = new user_service_1.UserService(new user_repository_1.UserRepository());
class UserController {
    static async checkUser(req, res) {
        try {
            const email = req.params.email;
            if (!email) {
                res.status(400).json({ error: 'Email is required' });
                return;
            }
            const user = await userService.findUser(email);
            res.json({ exists: !!user, user });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async createUser(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ error: 'Email is required' });
                return;
            }
            const user = await userService.createUser(email);
            res.status(201).json(user);
        }
        catch (error) {
            if (error.message === 'User already exists') {
                res.status(409).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}
exports.UserController = UserController;
