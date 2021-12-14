export const dynamicString = (arrayOfWords: string[], str: string, plural?): string => {
    if (arrayOfWords)
        arrayOfWords.forEach(word => {
            str = str.replace('{value}', word)
        });
    if (plural) {
        str = str.replace('{plural}', 's')
    } else {
        str = str.replace('{plural}', '')
    }
    return str
}