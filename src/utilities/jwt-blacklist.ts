const JWT_BLACKLIST: { [a: string]: string } = {};

const add = (token: string): void => {
  JWT_BLACKLIST[token] = "";
};

const exist = (token: string): boolean => {
  return Object.prototype.hasOwnProperty.call(JWT_BLACKLIST, token);
};

export default { add, exist };
