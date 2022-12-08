import bcrypt from "bcrypt";

const hash = async (value: string): Promise<string> => {
  return await bcrypt.hash(value, bcrypt.genSaltSync(10));
};

const compare = async (data: string, encryped: string): Promise<boolean> => {
  return await bcrypt.compare(data, encryped);
};

export default { hash, compare };
