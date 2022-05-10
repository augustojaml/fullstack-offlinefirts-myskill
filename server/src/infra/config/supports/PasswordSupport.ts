import { compare, hash } from 'bcrypt';

export const PasswordSupport = {
  generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  },

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  },
};
