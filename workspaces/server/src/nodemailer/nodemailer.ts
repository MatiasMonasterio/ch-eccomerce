import type { IUser, ICart } from "../domain";

import logger from "../logger";
import emailConfig from "../config/email";
import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: emailConfig.address,
    pass: emailConfig.password,
  },
});

const newUserRegister = async (user: IUser) => {
  logger.info(emailConfig);

  try {
    const info = await transporter.sendMail({
      from: "Coderhouse Eccomerce",
      to: emailConfig.adminAdress,
      subject: "New user register",
      html: JSON.stringify(user),
    });

    logger.info(info);
  } catch (error) {
    logger.error(error);
  }
};

const purchase = async (cart: ICart, user: IUser) => {
  const mailOptions = {
    from: "Coderhouse Eccomerce",
    to: emailConfig.adminAdress,
    subject: `New purchase from ${user.name} ${user.email}`,
    html: JSON.stringify(cart.products),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(info);
  } catch (error) {
    logger.error(error);
  }
};

export default { newUserRegister, purchase };
