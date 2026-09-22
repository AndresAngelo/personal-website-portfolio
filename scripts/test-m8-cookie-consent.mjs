import assert from 'node:assert/strict';
import fs from 'node:fs';

const component = fs.readFileSync('src/components/CookieConsent.astro', 'utf8');
const privacy = fs.readFileSync('src/pages/privacy-policy.astro', 'utf8');
const layout = fs.readFileSync('src/layouts/Layout.astro', 'utf8');

assert.match(component, /cookie-consent/);
assert.match(component, /data-cookie-accept/);
assert.match(component, /data-cookie-reject/);
assert.match(component, /localStorage\.setItem\(STORAGE_KEY, value\)/);
assert.match(component, /localStorage\.getItem\(STORAGE_KEY\)/);
assert.match(component, /aea-cookie-consent/);
assert.match(component, /privacy-policy#cookies/);
assert.match(component, /settings\.addEventListener/);
assert.match(layout, /<CookieConsent \/>/);
assert.match(privacy, /id="cookies"/);

console.log('M8 cookie consent contract: PASS');
