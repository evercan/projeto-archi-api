"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const util_1 = require("@/presentation/controllers/util");
class Authentication {
    constructor(tokenManager) {
        this.tokenManager = tokenManager;
    }
    async handle(request) {
        try {
            const { accessToken, requesterId } = request;
            if (!accessToken || !requesterId) {
                return (0, util_1.forbidden)(new Error('Invalid token or requester id.'));
            }
            const decodedTokenOrError = await this.tokenManager.verify(accessToken);
            if (decodedTokenOrError.isLeft()) {
                return (0, util_1.forbidden)(decodedTokenOrError.value);
            }
            const payload = decodedTokenOrError.value;
            if (payload.id === requesterId) {
                return (0, util_1.ok)(payload);
            }
            return (0, util_1.forbidden)(new Error('User not allowed to perform this operation.'));
        }
        catch (error) {
            return (0, util_1.serverError)(error);
        }
    }
}
exports.Authentication = Authentication;
