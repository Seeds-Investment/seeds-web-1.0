export const countWords = (text: string): number => {
  const trimmedText = text.trim();

  const wordsArray = trimmedText.split(/\s+/);

  const nonEmptyWordsArray = wordsArray.filter(word => word !== '');

  const wordCount = nonEmptyWordsArray.length;

  return wordCount;
};
