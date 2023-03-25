// The following code is used to generate the input files for the JARs
// The function should return an array of objects with the following structure:
// {
//      name: "filename.txt",
//      content: "file content",
// }  
// Only the parameters show above are used by the rest of the Code, so you can add additional parameters if you want.
// The function should not write any files to the disk.

function generateFiles() {
    return [
        {
            name: "helloworld.txt",
            content: "Hello World!",
        }
    ];
}

module.exports = generateFiles;
