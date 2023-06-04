import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../../types/socketInterfaces';
import { AuthService } from "../services/authService";
// import { groupMessageRepositoryMongoDb } from '../database/mongoDb/repositories/groupMessageRepositoryMongoDb';
let activeUsers: any[] = [];

const socketConfig = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`.bg_magenta);
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to:", receiverId);
      console.log("Data:", data);
      if (user) {
        console.log(user.socketId,"::::::::::::::");
        
        io.to(user.socketId).emit("receive-message", data);
      }
    });
  });
};

export default socketConfig;
