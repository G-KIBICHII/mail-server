import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    newUser.save();
    return newUser;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(idorUsername: string) {
    let user;
    // Try to find by ID first
    if(Types.ObjectId.isValid(idorUsername)){
      user = await this.userModel.findById(idorUsername).exec();
    }

    // If not found by ID, try to find by username
    if (!user) {
      user = await this.userModel.findOne({ username: idorUsername }).exec();
    }

    if (!user) {
      throw new NotFoundException(`User with identifier ${idorUsername} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const  result = await this.userModel.findByIdAndDelete(id).exec();
    if(!result){
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return result;
  }


   async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
