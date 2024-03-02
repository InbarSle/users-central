import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '@users-central/shared';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {

    private logger = new Logger();

    constructor(@InjectModel('User') private userModel: Model<UserDocument>) { }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        try {
            this.logger.log(createUserDto, 'Create new user');
            const newUser = new this.userModel(createUserDto);
            return this.sanitizeUser(await newUser.save());
        } catch (e) {
            this.logger.error(e);
            throw new HttpException('Unable to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        try {
            this.logger.log( JSON.stringify(updateUserDto, null, 2), 'Update new user');
            const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
            return this.sanitizeUser(updatedUser);
        } catch (e) {
            this.logger.error(e);
            throw new HttpException(`Unable to find and update user ${id}`, HttpStatus.NOT_FOUND);
        }
    }

    async getAllUser(): Promise<IUser[]> {
        try {
            this.logger.log('Get all users');

            const usersData = await this.userModel.find().exec();

            return usersData?.map(user => this.sanitizeUser(user));
        } catch (e) {
            this.logger.error(e)
            throw new HttpException(`Unable to get all users`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUser(id: string): Promise<IUser> {
        try {
            this.logger.log(`Get user ${id}`);
            const user = await this.userModel.findById(id);

            return this.sanitizeUser(user);
        } catch (e) {
            this.logger.error(e)
            throw new HttpException(`Unable to find user ${id}`, HttpStatus.NOT_FOUND);
        }
    }

    sanitizeUser(user: UserDocument): IUser {
            return {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                address: user.address,
                location: {
                    lat: user.location.lat,
                    long: user.location.long
                }
            }
        }
    }
