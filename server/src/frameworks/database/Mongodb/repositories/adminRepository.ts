// import { UserInterface } from "../../../../types/userInterface";
import { log } from "console";
import Admin from "../models/adminModel";

export const adminRepositoryMongoDB = () => {
 
  const getAdminByUserName = async (userName: string) => {
    const admin: any = await Admin.findOne({ userName });
    console.log(admin);
    
    return admin;
  };
  
 

  return {
   
    getAdminByUserName,
    // getUserById,
   
  };
};

export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB;
