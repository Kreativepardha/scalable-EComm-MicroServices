import { UserService } from '../src/services/userService';
import { UserRepository } from '../src/repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../src/repositories/userRepository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<UserRepository>;

  beforeAll(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService();
  });

  it('should register a new user with a hashed password', async () => {
    const userData = { name: 'Test User', email: 'test@example.com', password: 'password123' };
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    userRepositoryMock.create.mockResolvedValue({ ...userData, password: 'hashedPassword', _id: '12345' });

    const user = await userService.registerUser(userData);
    expect(user.password).toBe('hashedPassword');
    expect(userRepositoryMock.create).toHaveBeenCalledWith({ ...userData, password: 'hashedPassword' });
  });

  it('should login a user and return a token', async () => {
    const userData = { _id: '12345', email: 'test@example.com', password: 'hashedPassword' };
    userRepositoryMock.findByEmail.mockResolvedValue(userData as any);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('testToken');

    const result = await userService.loginUser('test@example.com', 'password123');
    expect(result.token).toBe('testToken');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
  });

  // Additional tests for findUserById, updateUser, deleteUser
});
