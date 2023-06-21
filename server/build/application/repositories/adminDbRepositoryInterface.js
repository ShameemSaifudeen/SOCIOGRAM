"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDbRepository = void 0;
const adminDbRepository = (repository) => {
    const getAdminByUserName = async (userName) => await repository.getAdminByUserName(userName);
    return {
        getAdminByUserName,
    };
};
exports.adminDbRepository = adminDbRepository;
