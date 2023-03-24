function validateOutput(content) {
    if (content.startsWith('Error')) {
        return false;
    }
    return true;
}

module.exports = validateOutput;
