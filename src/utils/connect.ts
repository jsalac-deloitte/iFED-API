import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbURI = config.get<string>("dbURI");
  try {
    await mongoose.connect(dbURI);
    logger.info(`Database is connected`);
  } catch (errors: any) {
    logger.error("could not connect ");
    console.log(errors);
    process.exit(1);
  }
};

export default connect;
