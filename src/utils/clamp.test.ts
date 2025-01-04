import { expect, it } from "vitest";
import { clamp } from "./clamp";

  it('should clamp number', () => {
    expect(clamp(5, 1, 3)).toBe(3);
    expect(clamp(3, 1, 5)).toBe(3);
    expect(clamp(1, 3, 5)).toBe(3);
  });
