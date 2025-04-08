import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUserByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUserByUsername) {
      throw new ConflictException('A user with this username already exists.');
    }

    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUserByEmail) {
      throw new ConflictException('A user with this email already exists.');
    }

    return this.userRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.deleted) throw new NotFoundException('User not found.');

    return user;
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user || user.deleted) throw new NotFoundException('User not found.');

    return user;
  }

  async deleteOneByEmail(email: string) {
    let user = await this.userRepository.findOne({ where: { email } });

    if (!user || user.deleted) throw new NotFoundException('User not found.');

    user.deleted = true;

    return this.userRepository.save(user);
  }

  async deleteOneById(id: string) {
    let user = await this.userRepository.findOne({ where: { id } });

    if (!user || user.deleted) throw new NotFoundException('User not found.');

    user.deleted = true;

    return this.userRepository.save(user);
  }
}
