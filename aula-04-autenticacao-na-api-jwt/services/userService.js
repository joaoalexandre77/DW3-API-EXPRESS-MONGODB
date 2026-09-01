import User from "../models/Users.js";

class userService {
    async create(email, password) {
        try {
            const newUser = new User({
                email: email,
                password: password
            });
        await newUser.save();
        } catch (error) {
            console.error(error);
        }
    }
}

export default new userService();