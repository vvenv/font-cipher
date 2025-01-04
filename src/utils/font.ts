import { Font, FontEditor, woff2 } from 'fonteditor-core';

export const generateFonts = async (file: File, original: string, shift: number) => {
  await woff2.init('/woff2.wasm');

  const buffer = await file.arrayBuffer();

  const font = Font.create(buffer, {
    type: (file.name.split('.').pop() as FontEditor.FontType) || 'ttf',
    subset: Array.from(new Set([...original].map((char) => char.charCodeAt(0)))),
  });

  const ttfObject = font.get();

  ttfObject.glyf.forEach((glyf) => {
    if (glyf.unicode !== undefined) {
      glyf.unicode = [((glyf.unicode[0] - 32 + shift) % 95) + 32];
    }
  });

  font.set(ttfObject);

  const ttfFile = new File([font.write({
    type: 'ttf',
  })], 'encrypted.ttf', { type: 'font/ttf' });

  const eotFile = new File([font.write({
    type: 'eot',
  })], 'encrypted.eot', { type: 'application/vnd.ms-fontobject' });

  const woffFile = new File([font.write({
    type: 'woff',
  })], 'encrypted.woff', { type: 'font/woff' });

  const woff2File = new File([font.write({
    type: 'woff2',
  })], 'encrypted.woff2', { type: 'font/woff2' });

  return [woff2File, woffFile, ttfFile, eotFile];
}
