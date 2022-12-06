import type { IUser } from "../../domain";

import logger from "../../logger";
import twilioClient from "../twilio";
import twilioConfig from "../../config/twilio";

const purchase = async (user: IUser): Promise<void> => {
  const opts = {
    body: `New purchase from ${user.name} ${user.email}`,
    from: `whatsapp:${twilioConfig.phone}`,
    to: `whatsapp:${twilioConfig.adminPhone}`,
  };

  try {
    const message = await twilioClient.messages.create(opts);
    logger.info(message);
  } catch (error) {
    logger.error(error);
  }
};

const userPurchase = async (user: IUser): Promise<void> => {
  const opts = {
    body: `Su pedido ha sido recibido y se encuentra en proceso`,
    from: `whatsapp:${twilioConfig.phone}`,
    to: `whatsapp:${user.phone}`,
  };

  try {
    const message = await twilioClient.messages.create(opts);
    logger.info(message);
  } catch (error) {
    logger.error(error);
  }
};

export default { purchase, userPurchase };
