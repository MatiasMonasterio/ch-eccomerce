import mongoose from "mongoose";

import logger from "../../logger";
import mongoConfig from "../../config/mongo";

export default class MongoInstance {
  private static instance: MongoInstance;

  private constructor() {
    /** */
  }

  static async connect() {
    if (!MongoInstance.instance) {
      MongoInstance.instance = new MongoInstance();

      try {
        await mongoose.connect(mongoConfig.uri);
        logger.info("MongoDB connection successful");
      } catch (error) {
        throw new Error(`MongoDB connection error ${error}`);
      }
    }
  }

  static async disconnect() {
    mongoose.disconnect();
  }
}
