export class StringUtils {
  /**
   * Capitalizes the first letter of a string.
   * @param input The string to capitalize.
   * @returns The string with the first letter capitalized.
   * @example
   * StringUtils.capitalizeFirstLetter({ input: 'hello' }); // "Hello"
   */
  public static capitalizeFirstLetter({ input }: { input: string }): string {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  /**
   * Reverses a string.
   * @param input The string to reverse.
   * @returns The reversed string.
   * @example
   * StringUtils.reverse({ input: 'hello' }); // "olleh"
   */
  public static reverse({ input }: { input: string }): string {
    return input.split('').reverse().join('');
  }

  /**
   * Checks if a string is a palindrome.
   * @param input The string to check.
   * @returns `true` if the string is a palindrome, otherwise `false`.
   * @example
   * StringUtils.isPalindrome({ input: 'racecar' }); // true
   */
  public static isPalindrome({ input }: { input: string }): boolean {
    const cleaned = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === StringUtils.reverse({ input: cleaned });
  }

  /**
   * Truncates a string to a specified length and adds an ellipsis if necessary.
   * @param input The string to truncate.
   * @param maxLength The maximum length of the truncated string.
   * @returns The truncated string with ellipsis if needed.
   * @example
   * StringUtils.truncate({ input: 'This is a long string', maxLength: 10 }); // "This is a..."
   */
  public static truncate({
    input,
    maxLength,
  }: {
    input: string;
    maxLength: number;
  }): string {
    return input.length > maxLength
      ? input.slice(0, maxLength).trimEnd() + '...'
      : input;
  }

  /**
   * Converts a string to kebab-case.
   * @param input The string to convert.
   * @returns The kebab-cased string.
   * @example
   * StringUtils.toKebabCase({ input: 'Hello World' }); // "hello-world"
   */
  public static toKebabCase({ input }: { input: string }): string {
    return input
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  /**
   * Converts a string to snake_case.
   * @param input The string to convert.
   * @returns The snake-cased string.
   * @example
   * StringUtils.toSnakeCase({ input: 'Hello World' }); // "hello_world"
   */
  public static toSnakeCase({ input }: { input: string }): string {
    return input
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/\s+/g, '_')
      .toLowerCase();
  }

  /**
   * Converts a string to camelCase.
   * @param input The string to convert.
   * @returns The camelCased string.
   * @example
   * StringUtils.toCamelCase({ input: 'Hello World' }); // "helloWorld"
   */
  public static toCamelCase({ input }: { input: string }): string {
    return input
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, match) => match.toUpperCase());
  }

  /**
   * Converts a string to title case.
   * @param input The string to convert.
   * @returns The title-cased string.
   * @example
   * StringUtils.toTitleCase({ input: 'hello world' }); // "Hello World"
   */
  public static toTitleCase({ input }: { input: string }): string {
    return input
      .toLowerCase()
      .split(' ')
      .map((word) => StringUtils.capitalizeFirstLetter({ input: word }))
      .join(' ');
  }

  /**
   * Counts the occurrences of a substring in a string.
   *
   * This function returns the number of times a specified substring appears in the given string.
   *
   * @param input The string to search within.
   * @param substring The substring to count.
   * @returns The number of occurrences of the substring.
   *
   * @example
   * countOccurrences({ input: 'hello world hello', substring: 'hello' }); // 2
   * countOccurrences({ input: 'abc abc abc', substring: 'abc' }); // 3
   */
  public static countOccurrences({
    input,
    substring,
  }: {
    input: string;
    substring: string;
  }): number {
    return (input.match(new RegExp(substring, 'g')) || []).length;
  }

  /**
   * Replaces all occurrences of a substring in a string.
   *
   * This function replaces every instance of a specified substring in the input string with the given replacement string.
   *
   * @param input The string to search within.
   * @param substring The substring to replace.
   * @param replacement The string to replace the substring with.
   * @returns The string with all occurrences of the substring replaced.
   *
   * @example
   * replaceAll({ input: 'hello world hello', substring: 'hello', replacement: 'hi' }); // "hi world hi"
   * replaceAll({ input: 'abc abc abc', substring: 'abc', replacement: '123' }); // "123 123 123"
   */
  public static replaceAll({
    input,
    substring,
    replacement,
  }: {
    input: string;
    substring: string;
    replacement: string;
  }): string {
    return input.split(substring).join(replacement);
  }

  /**
   * Replaces the first `x` occurrences of a substring in a string.
   *
   * This function allows you to replace only a specified number of occurrences of a substring within the input string.
   *
   * @param input The string to search within.
   * @param substring The substring to replace.
   * @param replacement The string to replace the substring with.
   * @param occurrences The number of occurrences to replace.
   * @returns The string with the first `x` occurrences replaced.
   *
   * @example
   * replaceOccurrences({ input: 'hello world hello', substring: 'hello', replacement: 'hi', occurrences: 1 }); // "hi world hello"
   * replaceOccurrences({ input: 'abc abc abc', substring: 'abc', replacement: '123', occurrences: 2 }); // "123 123 abc"
   */
  public static replaceOccurrences({
    input,
    substring,
    replacement,
    occurrences,
  }: {
    input: string;
    substring: string;
    replacement: string;
    occurrences: number;
  }): string {
    let count = 0;
    return input.replace(new RegExp(substring, 'g'), (match) => {
      if (count < occurrences) {
        count++;
        return replacement;
      }
      return match;
    });
  }

  /**
   * Replaces placeholders in a string with corresponding values from a replacement map.
   *
   * This function scans the input string for placeholders enclosed in curly braces (`{}`) and replaces them
   * with corresponding values from a provided replacements object.
   *
   * @param string The input string containing placeholders to be replaced.
   * @param replacements An object mapping placeholder keys (without braces) to their replacement values.
   * @returns A new string with placeholders replaced by their corresponding values from the replacements object.
   *
   * @example
   * const input = "Hello, {name}! You have {count} new messages.";
   * const replacements = { name: "John", count: "5" };
   * const result = replaceOcurrencies(input, replacements);
   * console.log(result); // "Hello, John! You have 5 new messages."
   *
   * @example
   * const input = "Welcome, {user}! Your balance is {balance}.";
   * const replacements = { user: "Alice", balance: "$100" };
   * const result = replaceOcurrencies(input, replacements);
   * console.log(result); // "Welcome, Alice! Your balance is $100."
   */
  public static replaceOcurrencies(
    string: string,
    replacements: Record<string, string>,
  ): string {
    return string.replace(/\{([^}]+)\}/g, (match, key) => {
      return replacements[key] ?? match;
    });
  }
}
