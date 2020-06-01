function markdownParser(markdown) {
    // Split input
    const splitStr = markdown.split(' ');
    // The first element will be the hash indication
    const hashes = splitStr[0];
    const hashLength = hashes.length;
    console.log(`splitStr: ${splitStr}\nhashes: ${hashes}`);

    // Check if input is valid
    if (splitStr.length > 1 && hashes[0] === '#' && hashLength < 7 && hashLength > 0) {
        // Store rest of text
        let textEntry = '';
        for (let i = 1; i < splitStr.length; i++) {
            if (i === 1)
                if (i > 1) {
                    textEntry += ' ';
                }
            textEntry += splitStr[i];
        }
        // Format output with number of hashes
        return `<h${hashLength}>${textEntry}</h${hashLength}>`;
    } else {
        return markdown;
    }
}

markdownParser('  #### Space Jam');