import { type } from "os";
import Chat from "../models/chatModel";

export const chatRepositoryImp = () => {
  const createChat = async (senderId:string, receiverId:string) => {
    try {
      const existingChat = await Chat.findOne({
        members: { $all: [senderId, receiverId] },
      });

      if (existingChat) {
        console.log("Chat already exists");
        return existingChat;
      }

      const newChat = new Chat({
        members: [senderId, receiverId],
      });

      const savedChat = await newChat.save();
      console.log("New chat created");

      return savedChat;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  };
  const getAllChat = async (userId: string) => {
    return await Chat.find({
      members: { $in: [userId] },
    });
  };
  const getChat = async (firstId: string, secondId: string) => {
    return await Chat.find({
      members: { $all: [firstId, secondId] },
    });
  };
  return {
    createChat,
    getAllChat,
    getChat,
  };
};

export type chatRepositoryType = typeof chatRepositoryImp;
