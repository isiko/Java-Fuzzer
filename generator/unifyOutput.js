// This function takes the output of the JARs and tries to unify it.
// This is usefull if the JARs output different things for the same input, for example in the case of Error Messages.

const os = require("os");

function unifyOutput(output) {
    let outputLines = output.split(os.EOL);
    for (let i = 0; i < outputLines.length; i++) {
        if (outputLines[i].startsWith("Error:")) {
            outputLines[i] = "Error: <Error Message>";
        }
    }

    return outputLines.join(os.EOL);
}

module.exports = unifyOutput;
