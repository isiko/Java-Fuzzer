const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const child_process = require('child_process');

const jarPath = process.argv[2] || './jars';
const outputDir = path.resolve(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
console.log(`Output directory: ${outputDir}`);
console.log(`JAR path: ${jarPath}`);

// Load Generators
console.log("Loading Generators");
const generateFiles = require('./generator/generateFiles');
const generateInput = require('./generator/generateInput');
const validateInput = require('./generator/validateInput');

// Load JARs
console.log(`Loading JARs from ${path.resolve(jarPath)}`);
let jarFiles = fs.readdirSync(jarPath);
jarFiles.forEach(jarFile => {
    console.log(`Found JAR: ${jarFile}`);
})
if (jarFiles.length == 0) {
    console.log("No JARs found!");
    return;
}

while (true) {
    console.log();
    // Generate Input
    console.log("Generating Input");
    const inputFiles = generateFiles();
    const input = generateInput(inputFiles);
    const hash = crypto.createHash('sha256').update(input).update(inputFiles.toString()).digest('hex');
    console.log(`Generated Input (Hash: ${hash})`);

    // Validate Input
    if (!validateInput(input, inputFiles)) {
        console.log("Skipping Input (Invalid)");
        continue;
    }

    const currentOutputDir = path.resolve(outputDir, hash);
    if (fs.existsSync(currentOutputDir)) {
        console.log("Skipping Input (Allready exists)");
        continue;
    }

    // Write Input
    console.log(`Writing Inputs to ${currentOutputDir}`);
    fs.mkdirSync(path.resolve(outputDir, hash));
    for (file of inputFiles) {
        fs.writeFileSync(path.resolve(currentOutputDir, file.name), file.content);
    }

    // Generate Outputs
    for (jar of jarFiles) {
        console.log(`Running JAR ${jar}`);
        const date = Date.now();
        const output = child_process.execSync(`java -jar ${path.resolve(jarPath, jar)}`, { 
            timeout: 1000 * 60 * 5,    // 5 Minutes in ms
            cwd: currentOutputDir,     // Working directory
            input: input,              // Input
            stdio: [null, null, null]  // Don't print anything in the console
        });
        const outputHash = crypto.createHash('sha256').update(output).digest('hex');
        let outputFile = path.resolve(currentOutputDir, outputHash + "." +  jar.replace(".jar", ".out"));
        console.log(`Finished JAR ${jar} in ${Date.now() - date}ms -> ${outputHash}`);
        fs.writeFileSync(outputFile, output);
    }
}
