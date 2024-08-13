import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
  const hashPass = await bcrypt.hash(password, 10);
  return hashPass;
};

const comparePassword = async (password: string, hashpassword: string) => {
  const result = await bcrypt.compare(password, hashpassword);
  return result;
};

export { hashPassword, comparePassword };
