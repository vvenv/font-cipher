/**
 * Encrypt a string with Caesar cipher
 */
export const encrypt = (input: string, shift: number) => {
  let output = '';

  for (let i = 0; i < input.length; i++) {
    const asciiCode = input.charCodeAt(i);

    // Only encrypt printable ASCII characters
    if (asciiCode >= 32 && asciiCode <= 126) {
      const encryptedChar = String.fromCharCode(
        ((asciiCode - 32 + shift) % 95) + 32,
      );

      output += encryptedChar;
    } else {
      // keep unprintable characters as is
      output += input[i];
    }
  }

  return output;
};

/**
 * Decrypt a string with Caesar cipher
 */
export const decrypt = (input: string, shift: number) => {
  let output = '';

  for (let i = 0; i < input.length; i++) {
    const asciiCode = input.charCodeAt(i);

    // Only decrypt printable ASCII characters
    if (asciiCode >= 32 && asciiCode <= 126) {
      const decryptedChar = String.fromCharCode(
        ((asciiCode - 32 - shift + 95) % 95) + 32,
      );

      output += decryptedChar;
    } else {
      // keep unprintable characters as is
      output += input[i];
    }
  }

  return output;
};
