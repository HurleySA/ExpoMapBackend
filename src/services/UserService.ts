
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../helpers/dto';
import { schemaCreateUser } from '../helpers/schemas';
import { AppError } from '../erros/AppError';
import { prismaClient } from '../database/prismaClient';

class UserService {
  async createUser({
    username,
    email,
    password,
    isAdmin
  }: IUser) {
    const user = {
      username,
      email,
      password,
      isAdmin
    };
    
    const validation = schemaCreateUser.validate(user,{
      abortEarly:false
    })
    if(validation.error) {
        throw new AppError(validation.error.message, StatusCodes.BAD_REQUEST);
    }

    const createdUser = await prismaClient.user.create({
      data: user
    });

    // @ts-expect-error
    delete createdUser.password;
    return createdUser;
  }

  async validateInsert(userToCreate: IUser) {
    const user = await prismaClient.user.findFirst({
      where: {
        username: userToCreate.username
      }
    });

    if (user) {
      throw new AppError('Username already exists', StatusCodes.BAD_GATEWAY);
    }
  }

  async getUserById(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    });
    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }

    // @ts-expect-error
    delete user.password;
    return user;
  }

  async getAllUsers() {
    const users = await prismaClient.user.findMany();
    const usersWithoutPasswords = users.map(user => {
      // @ts-expect-error
      delete user.password;
      return user;
    });
    return users;
  }

  async updateUser(
    id: string,
    newData: IUser
  ) {
    const {
      password,
      isAdmin
    } = newData;
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      throw new AppError('User not found', StatusCodes.NOT_FOUND);
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id
      },
      data: {
        password,
        isAdmin,
      }
    });
    // @ts-expect-error
    delete updatedUser.password;
    return updatedUser;
  }

  async verifyIfExists(id: string) {
    await prismaClient.user.findFirstOrThrow({
      where: {
        id
      }
    });
  }

  async deleteUser(id: string): Promise<any> {
    const user = await prismaClient.user.findUnique({
         where:{
             id:id
         }
     })
     if(!user){
         throw new AppError("User not found.", StatusCodes.NOT_FOUND);
     }

     const deletedUser = await prismaClient.user.delete({
         where: {
           id 
        }
     })
     return deletedUser;
 }

}

export { UserService };