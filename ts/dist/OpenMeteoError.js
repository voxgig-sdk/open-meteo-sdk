"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenMeteoError = void 0;
class OpenMeteoError extends Error {
    isOpenMeteoError = true;
    sdk = 'OpenMeteo';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.OpenMeteoError = OpenMeteoError;
//# sourceMappingURL=OpenMeteoError.js.map