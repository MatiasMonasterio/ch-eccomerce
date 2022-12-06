import type { IUser } from "../../domain";
import { BASE_URL } from "../../config/app";

export default {
  toDTO: (user: IUser) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      age: user.age,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      image: user.image ? `${BASE_URL}/uploads/${user.image}` : user.image,
    };
  },
};
