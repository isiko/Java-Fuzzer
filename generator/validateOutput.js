// Description: Validates the output of the generator
// The content of an output file is passed as a parameter.
// The function should return true if the output is valid and false if it is not.
// If any output is invalid, the corresponding input will be marked as invalid by the summarizer and will not be coundted as "different".

function validateOutput(content) {
    if (content.startsWith('Error')) {
        return false;
    }
    return true;
}

module.exports = validateOutput;
