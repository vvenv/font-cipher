import { describe, expect, it } from "vitest";
import { decrypt, encrypt } from "./cipher";

describe('cipher', () => {
  it('should encrypt input with specific shift', () => {
    expect(encrypt('foo', 3)).toMatchInlineSnapshot(`"irr"`);
    expect(encrypt('foo', 4)).toMatchInlineSnapshot(`"jss"`);
  });

  it('should decrypt input with specific shift', () => {
    expect(decrypt('irr', 3)).toMatchInlineSnapshot(`"foo"`);
    expect(decrypt('jss', 4)).toMatchInlineSnapshot(`"foo"`);
  });
});
