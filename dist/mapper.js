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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceDomain = exports.parseSiteMapper = void 0;
const sitemapper_1 = __importDefault(require("sitemapper"));
function parseSiteMapper(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const site = new sitemapper_1.default({ url });
        const urls = yield site.fetch();
        return urls.sites;
    });
}
exports.parseSiteMapper = parseSiteMapper;
function replaceDomain(output, { from, to }) {
    return output.replace(new RegExp(from, 'g'), to.replace(/\/$/, ''));
}
exports.replaceDomain = replaceDomain;
