"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const post_route_1 = __importDefault(require("./routes/post_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const restAPI_route_1 = __importDefault(require("./routes/restAPI_route"));
const file_route_1 = __importDefault(require("./routes/file_route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const initApp = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.once("open", () => console.log("Connected to Database"));
        db.on("error", (error) => console.error(error));
        const url = process.env.DB_URL;
        mongoose_1.default.connect(url).then(() => {
            const app = (0, express_1.default)();
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "*");
                res.header("Access-Control-Allow-Headers", "*");
                next();
            });
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
            const specs = (0, swagger_jsdoc_1.default)(options);
            app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
            app.use("/user", user_route_1.default);
            app.use("/post", post_route_1.default);
            app.use("/auth", auth_route_1.default);
            app.use("/restAPI", restAPI_route_1.default);
            app.use("/file", file_route_1.default);
            app.use("/public", express_1.default.static("public"));
            app.use(express_1.default.static('dist/client'));
            app.get('*', function (req, res) {
                res.sendfile('dist/client/index.html');
            });
            resolve(app);
        });
    });
    return promise;
};
exports.default = initApp;
//# sourceMappingURL=app.js.map