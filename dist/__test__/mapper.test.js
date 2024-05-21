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
const dedent_1 = __importDefault(require("dedent"));
const nock_1 = __importDefault(require("nock"));
const mapper_1 = require("../mapper");
const SITEMAP = `
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://example.test/projects/indiv</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://example.test/projects/lent</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;
describe('mapper', () => {
    it('should parse a sitemap.xml', () => __awaiter(void 0, void 0, void 0, function* () {
        const scope = nock_1.default('https://example.test')
            .get('/sitemap.xml')
            .reply(200, SITEMAP);
        const res = yield mapper_1.parseSiteMapper('https://example.test/sitemap.xml');
        expect(res).toMatchInlineSnapshot(`
      Array [
        "https://example.test/projects/indiv",
        "https://example.test/projects/lent",
      ]
    `);
    }));
    it('should replace domain', () => {
        const domains = dedent_1.default `
      https://example.test/about/
      https://example.test/services/
      https://example.test/
    `;
        const replaced = mapper_1.replaceDomain(domains, {
            from: `https://example.test`,
            to: 'https://btools.no/',
        });
        expect(replaced).toMatchInlineSnapshot(`
      "https://btools.no/about/
      https://btools.no/services/
      https://btools.no/"
    `);
    });
});
