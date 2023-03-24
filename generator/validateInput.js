function validateInput(input, files) {
    let crossings = files[0].raw;
    let streets = files[1].raw;
    let cars = files[2].raw;

    for (let crossing of crossings) {
        let incoming = 0;
        let outgoing = 0;
        for (let otherStreet of streets) {
            if (otherStreet.start === crossing.id) {
                outgoing++;
            }
            if (otherStreet.end === crossing.id) {
                incoming++;
            }
        }
        if (incoming > 4 || incoming == 0 || outgoing > 4 || outgoing == 0) {
            return false;
        }
    }
    return true;
}

module.exports = validateInput;
