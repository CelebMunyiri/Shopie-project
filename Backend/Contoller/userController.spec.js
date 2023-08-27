
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser, updateUser } = require('./userController');

// Mocking dependencies
jest.mock('mssql');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('should register a user successfully', async () => {
    // Set up mock implementation for bcrypt.hash
    bcrypt.hash.mockResolvedValue('hashedPassword');

    // Mock mssql pool request and execute
    const mockExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
    const mockRequest = jest.fn(() => ({ input: jest.fn().mockReturnThis(), execute: mockExecute }));
    const mockPool = { request: mockRequest };
    require('mssql').connect.mockResolvedValue(mockPool);

    const req = { body: { /* ... user data ... */ } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Registered succesfully' });
  });

  it('should log in a user successfully', async () => {
    // Set up mock implementation for bcrypt.compare
    bcrypt.compare.mockResolvedValue(true);

    // Mock mssql pool request and execute
    const mockRecordset = [{ /* ... user data ... */ }];
    const mockExecute = jest.fn().mockResolvedValue({ recordset: mockRecordset });
    const mockRequest = jest.fn(() => ({ input: jest.fn().mockReturnThis(), execute: mockExecute }));
    const mockPool = { request: mockRequest };
    require('mssql').connect.mockResolvedValue(mockPool);

    // Set up mock implementation for jwt.sign
    jwt.sign.mockReturnValue('mockedToken');

    const req = { body: { userEmail:'davidmunyiri2019@outlook.com',userPassword:'12345678' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Logged in successful',
      token: 'mockedToken',
      role: 'admin',
      userId: '0oju7gyu',
      profilePic: 'https://img',
    });
  });

  it('should update user details successfully', async () => {
    // Set up mock implementation for bcrypt.hash
    bcrypt.hash.mockResolvedValue('hashedPassword');

    // Mock mssql pool request and execute
    const mockExecute = jest.fn().mockResolvedValueOnce({ rowsAffected: 1 });
    const mockRequest = jest.fn(() => ({ input: jest.fn().mockReturnThis(), execute: mockExecute }));
    const mockPool = { request: mockRequest };
    require('mssql').connect.mockResolvedValue(mockPool);

    const req = { params: { userId: 'kfuj8883u' }, body: { /* ... user update data ... */ } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Details updated succsessfully' });
  });
});
