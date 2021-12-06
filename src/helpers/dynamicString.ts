export const dynamicString = (arrayOfWords: string[], str: string): string => {
    arrayOfWords.forEach(word => {
        str = str.replace('{value}', word)
    });
    return str
}