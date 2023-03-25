# Simple Java Fuzzer

A simple tool to compare JAR files.

## Introduction
This tool was build as a way to compare solutions for the Final Exams of the programming-cours at KIT.

## Requirements
### NodeJS
The script was written using NodeJS, so you should have some version of that installed.
I currently don't use any external dependencies, so you don't need `npm install`

### Java
As the solutions are using Java, you should have the correct version of that installed as well

## How to use
> It should be noted that exchanging solutions normally isn't allowed, so run you JARs through an obfuscator.
### Adjust Input Generators
The current Input Generators are build for the Exams mentioned above, but it should be quite easy to adjust them for other use cases.
To update them, just adjust the files in the `generators` directory
If you should encounter any problems don't hesitate to post an Issue.

### Get JARs
The script works by comparing Solutions, so you need at least two solutions. These should be provided in the form of `.jar` files.
Save the JARs to `JARs/SOLUTION.jar` in the directory of the Fuzzer.

### Run the script
Run the script using the following command:
```Bash
npm start
```

If the script can't find you JARs, check if they are in the correct directory. The script should create the one it is searching in if it didn't exist, so check if you find any empty directories.

### Check for differences
Run the script `summarizer.js` to get a summary of your results. It should show you in which samples there are differences, as well as an overview of how many samples where generated and how many differences it found.
```Bash
npm run summarize
```
