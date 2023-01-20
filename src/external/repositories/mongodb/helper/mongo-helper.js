"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoHelper = void 0;
const mongodb_1 = require("mongodb");
exports.MongoHelper = {
    client: null,
    async connect(uri) {
        this.client = await mongodb_1.MongoClient.connect(uri);
    },
    async disconnect() {
        await this.client.close();
    },
    async getCollection(name) {
        return await this.client.db().collection(name);
    },
    async clearCollection(name) {
        await this.client.db().collection(name).deleteMany({});
    }
};
