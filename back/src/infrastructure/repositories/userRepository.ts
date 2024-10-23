import { User } from "../../types/entities";
import { AccountModel } from "../database/models/AccountModel";
import { UserModel } from "../database/models/UserModel";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const userModel = await UserModel.findByPk(id, {
      include: [AccountModel],
    });
    if (!userModel) return null;
    return userModel.get({ plain: true }) as User;
  }

  async create(user: Partial<User>): Promise<User> {
    const createdUser = await UserModel.create(user as any);
    return createdUser.get({ plain: true }) as User;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    const updatedUser = await user.update(data);
    return updatedUser.get({ plain: true }) as User;
  }
}
