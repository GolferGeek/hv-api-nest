import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: any): Promise<User> {
    // first check if user already exists
    const existingUser = await this.userModel
      .findOne({ auth0Id: createUserDto.auth0Id })
      .exec();
    if (existingUser) {
      return existingUser;
    }
    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(_id: string): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async update(_id: string, updateUserDto: any): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(_id, updateUserDto, { new: true })
      .exec();
  }

  async remove(_id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(_id).exec();
  }
}
