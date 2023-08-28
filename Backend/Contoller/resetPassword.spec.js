const bcrypt = require('bcrypt');
const mssql = require('mssql');
const { updatePasswordInDatabase } = require('./resetPasswordController');


jest.mock('mssql');
jest.mock('bcrypt');
describe("Updating user password",()=>{
it(' should updatePasswordInDatabase and should execute with the correct inputs', async () => {
  const hashedPwd = 'jk48457ht';
  const poolRequestMock = jest.fn();
  const executeMock = jest.fn();

  bcrypt.hash.mockResolvedValue(hashedPwd);
  poolRequestMock.mockReturnValue({ execute: executeMock });
  mssql.connect.mockResolvedValue({ request: poolRequestMock });

  const userEmail = 'dawudmunyiri@gmail.com.com';
  const newPassword = '12345678';

  await updatePasswordInDatabase(userEmail, newPassword);

  expect(poolRequestMock).toHaveBeenCalled();
  expect(executeMock).toHaveBeenCalledWith('updatePassword');
});
})
