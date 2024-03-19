"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
(0, app_1.default)().then((app) => {
    // const options = {
    //   definition: {
    //     openapi: "3.0.0",
    //     info: {
    //       title: "Web Advanced Application development 2023 REST API",
    //       version: "1.0.1",
    //       description: "REST server including authentication using JWT and refresh token",
    //     },
    //     servers: [{ url: "https://node12.cs.colman.ac.il/", },],
    //   },
    //   apis: ["./src/routes/*.ts"],
    // };
    // const specs = swaggerJsDoc(options);
    // app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
    if (process.env.NODE_ENV !== 'production') {
        console.log('development');
        http_1.default.createServer(app).listen(process.env.PORT);
    }
    else {
        console.log('PRODUCTION');
        const options2 = {
            key: fs_1.default.readFileSync('../client-key.pem'),
            cert: fs_1.default.readFileSync('../client-cert.pem')
        };
        https_1.default.createServer(options2, app).listen(process.env.HTTPS_PORT);
    }
});
//# sourceMappingURL=server.js.map