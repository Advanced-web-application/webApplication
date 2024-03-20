import env from "dotenv";
env.config();
import express, { Express } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserRoute from "./routes/user_route";
import PostRoute from "./routes/post_route";
import authRoute from "./routes/auth_route";
import restAPIRoute from "./routes/restAPI_route";
import fileRoute from "./routes/file_route";
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    const url = process.env.DB_URL;
    mongoose.connect(url!).then(() => {
      const app = express();
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
      })
      const options = {
        definition: {
          openapi: "3.0.0",
          info: {
            title: "Web Advanced Application development 2023 REST API",
            version: "1.0.1",
            description: "REST server including authentication using JWT and refresh token",
          },
          servers: [{ url: "https://node12.cs.colman.ac.il/", },],
        },
        apis: ["./src/routes/*.ts"],
      };
      const specs = swaggerJsDoc(options);
      app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    
      app.use("/user", UserRoute);
      app.use("/post", PostRoute);
      app.use("/auth", authRoute);
      app.use("/restAPI", restAPIRoute);
      app.use("/file", fileRoute);
      app.use("/public", express.static("public"));
      app.use(express.static('dist/client'))
      app.get('*',function (req, res) {
        res.sendfile('dist/client/index.html');
      });
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
