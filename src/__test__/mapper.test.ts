import dedent from 'dedent';
import nock from 'nock';
import { parseSiteMapper, replaceDomain } from '../mapper';

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
  it('should parse a sitemap.xml', async () => {
    const scope = nock('https://example.test')
      .get('/sitemap.xml')
      .reply(200, SITEMAP);

    const res = await parseSiteMapper('https://example.test/sitemap.xml');
    expect(res).toMatchInlineSnapshot(`
      Array [
        "https://example.test/projects/indiv",
        "https://example.test/projects/lent",
      ]
    `);
  });
  it('should replace domain', () => {
    const domains = dedent`
      https://example.test/about/
      https://example.test/services/
      https://example.test/
    `;

    const replaced = replaceDomain(domains, {
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
