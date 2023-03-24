# Simple Java Fuzzer

A simple tool to compare JAR files.

## Introduction
This tool was build as a way to compare solutions for the Final Exams of the programming-cours at KIT.

## How to use
> It should be noted that exchanging solutions normaly isn't allowed, so run you JARs through an obfuscator.
### Adjust Input Generators
The current Input Generators are build for the Exams mentioned above, but it should be quite easy to adjust them for other use cases.
To update them, just adjust the files in the `generators` directory
If you should encounter any problems don't hesitate to post an Issue.

## Get JARs
The Skript works by comparing Solutions, so you need at least two solutions. These should be provided in the form of `.jar` files.
Save the JARs to `JARs/SOLUTION.jar` in the directory of the Fuzzer.

## Run the Skript
Run the script using the following command:
> npm start

If the skript can't find you JARs, check if they are in the correct directory. The skript should create the one it is searching in if it didn't exist, so check if you find any empty directorys.

## Check for differences
Run the skript `summarizer.js` to get a summary of your results. It should show you in which samples there are differences, as well as an overview of how many samples where generated and how many differences it found.
