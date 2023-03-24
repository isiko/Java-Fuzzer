// Should return a String representing the input for the Programm
// The Parameters are exactly the output of the corresponding generators.

function generateInput(files){
    let output = "load .\nsimulate 10000\n";
    for (car of files[2].raw) {
        output += `position ${car.id}\n`;
    }
    output += "quit";
    return output;
}

module.exports = generateInput;
