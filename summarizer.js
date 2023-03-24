const fs = require('fs');
const path = require('path');

const outputDir = process.argv[2];

const directorys = fs.readdirSync(outputDir);

jars = ['SirYoshi', 'isiko404'];
let counter = 0;
let invalid = 0;
let different = 0;

for (dir in directorys) {
    let files = fs.readdirSync(path.join(outputDir, directorys[dir]));
    counter++;

    let hashes = [];
    for (file in files) {
        if (files[file].endsWith('.out')) {
            let hash = files[file].split('.')[0];
            let content = fs.readFileSync(path.join(outputDir, directorys[dir], files[file]), 'utf8');
            if (content.startsWith('Error')) {
                invalid++;
                continue;
            }
            
            if (hashes.indexOf(hash) == -1) {
                hashes.push(hash);
            }
        }
    }
    if (hashes.length > 1) {
        console.log('Found multiple hashes for ' + directorys[dir]);
        different++;
    }
}
console.log('Total:     ' + counter);
console.log('Invalid:   ' + invalid);
console.log('Different: ' + different);
