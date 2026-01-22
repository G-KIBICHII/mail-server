import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { seedUserDto } from './dto/seed.dto';
import { faker } from '@faker-js/faker';
import { MatchPassword } from 'src/auth/dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    newUser.save();
    return newUser;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return result;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).select('+password').exec();
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).select('+password').exec();
  }
  async findByPhoneNumber(phoneNumber: any): Promise<User | null> {
    return await this.userModel.findOne({ phoneNumber }).select('+password').exec();
  }

  async createSeedUser(seedUserDto: seedUserDto) {
    // delete all users first
    await this.userModel.deleteMany({}).exec();
    const users: Partial<User>[] = [];
    const plainPassword = 'Password@123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    // create seed user 20  using faker 
    for (let i = 1; i <= 50; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const username = `user${i}`;
      const email = faker.internet.email({ firstName, lastName });
      const phoneNumber = faker.phone.imei();
      const password = 'Password@123';
      users.push({
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password: hashedPassword,
      });

    }
    await this.userModel.insertMany(users);
    return { message: 'Seed users created successfully' };

  }
}