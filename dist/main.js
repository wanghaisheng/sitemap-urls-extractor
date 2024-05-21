"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = require("@actions/core");
const config_1 = require("./config");
const mapper_1 = require("./mapper");
const utils_1 = require("./utils");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = yield config_1.makeConfig();
        const urls = yield mapper_1.parseSiteMapper(config.siteMapURL);
        let output = urls.join('\n');
        if (config.replaceDomain) {
            utils_1.invariant(config.replaceDomain, 'expect replaceDomain');
            output = mapper_1.replaceDomain(output, config.replaceDomain);
        }
        core_1.setOutput('urls', output);
    });
}
exports.main = main;
main().catch(e => {
    core_1.debug(`error: ${JSON.stringify(e)}`);
    core_1.debug(e.stack);
    core_1.setFailed(e.message);
});
