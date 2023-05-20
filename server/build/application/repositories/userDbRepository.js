"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = async (user) => {
        console.log("mm");
        console.log(user);
        return await repository.addUser(user);
    };
    const getUserByEmail = async (email) => await repository.getUserByEmail(email);
    const getUserById = async (id) => await repository.getUserById(id);
    const getUserByUserName = async (userName) => await repository.getUserByUserName(userName);
    return {
        addUser,
        getUserByEmail,
        getUserByUserName,
        getUserById,
    };
};
exports.userDbRepository = userDbRepository;
