import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializedUser from "./middleware/deserializedUser";

const app = express();
const port = config.get<number>("port");

app.use(express.json());
app.use(deserializedUser);

//DB Connection

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
