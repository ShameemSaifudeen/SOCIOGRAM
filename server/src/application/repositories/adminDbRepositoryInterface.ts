import { AdminRepositoryMongoDB} from "../../frameworks/database/Mongodb/repositories/adminRepository"

export const adminDbRepository = (
  repository: ReturnType<AdminRepositoryMongoDB>
) => {
 
  const getAdminByUserName = async (userName: string) =>await repository.getAdminByUserName(userName);
  return {
  
    getAdminByUserName,
  
  };
};
export type AdminDbInterface = typeof adminDbRepository;
