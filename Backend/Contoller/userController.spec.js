
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

    
    const mockExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
    const mockRequest = jest.fn(() => ({ input: jest.fn().mockReturnThis(), execute: mockExecute }));
    const mockPool = { request: mockRequest };
    require('mssql').connect.mockResolvedValue(mockPool);

    const req = { body: { 
      userName:'David Munyiri',
      userEmail:'dawud@gmail.com',
      profilePic:'https://me.jpg',
      userPassword:'12345678',
      userPhone:'2547567889'

    } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Registered succesfully' });
  });

  it("Should Enable a user to Login and return a token", async () => {
    const user = {
      userId: "787rnyhcg3gv8bg34cr",
      userName: "Mahubali",
      userEmail: "mahubali@gmail.com",
      userPhone: "0986215464",
      role: "NULL",
      userPassword: "ouiweuiriuew907ajbf",
      profilePic: "NULL",
    };
    const req = {
      body: {
        userEmail: user.userEmail,
        userPassword: "12345678",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: 1,
        recordset: [user],
      }),
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
    jest.spyOn(jwt, "sign").mockReturnValueOnce("mockedToken");

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Logged in successful",
      token: "mockedToken",
      role:'admin',
      userId:'9ihy677',
      profilePic:'https://me.jpg'
    });
  })

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
