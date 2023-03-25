// This function takes the output of the JARs and tries to unify it.
// This is usefull if the JARs output different things for the same input, for example in the case of Error Messages.

const os = require("os");

function unifyOutput(output) {
    console.log(output);
    let outputLines = output.split(os.EOL);
    console.log(outputLines);
    for (let i = 0; i < outputLines.length; i++) {
        if (outputLines[i].startsWith("Error:")) {
            outputLines[i] = "Error: <Error Message>";
        }
    }

    return outputLines.join(os.EOL);
}

module.exports = unifyOutput;
