"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("@/main/middleware");
exports.default = (app) => {
    app.use(middleware_1.bodyParser);
    app.use(middleware_1.cors);
    app.use(middleware_1.contentType);
};
