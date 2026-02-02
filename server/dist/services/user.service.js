"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findUser(email) {
        return this.userRepository.findByEmail(email);
    }
    async createUser(email) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const newUser = {
            email,
            createdAt: new Date() // Firestore converts JS Date to Timestamp
        };
        return this.userRepository.create(newUser);
    }
}
exports.UserService = UserService;
