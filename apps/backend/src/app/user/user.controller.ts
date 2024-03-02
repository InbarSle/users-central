import { Body, Controller, Post, Get, Param, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
     createStudent( @Body() createUserDto: CreateUserDto){
       return this.userService.createUser(createUserDto);
    }

    @Put('/:id')
    updateStudent(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUser();
    }

    @Get("/:id")
    getUser(@Param('id') id: string) {
        return this.userService.getUser(id);
    }
}

