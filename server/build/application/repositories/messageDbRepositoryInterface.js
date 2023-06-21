"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDbInterface = void 0;
const messageDbInterface = (repository) => {
    const createMessage = async (chatId, senderId, message) => await repository.createMessage(chatId, senderId, message);
    const getMessage = async (chatId) => await repository.getMessage(chatId);
    return {
        createMessage,
        getMessage
    };
};
exports.messageDbInterface = messageDbInterface;
