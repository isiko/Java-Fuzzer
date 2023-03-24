// The following code is used to generate the input files for the JARs
// The function should return an array of objects with the following structure:
// {
//      name: "filename.txt",
//      content: "file content",
// }  
// Only the parameters show above are used by the rest of the Code, so you can add additional parameters if you want.
// The function should not write any files to the disk.

function generateFiles() {
    // Some Helper Functions
    function randomBoolean(){
        return Math.random() < 0.5;
    }

    function randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let crossingAmount = randomInt(2, 10);
    let streetAmount = randomInt(crossingAmount, crossingAmount * 4);

    let crossings = [];
    for (let i = 0; i < crossingAmount; i++) {
        crossings.push({
            id: i,
            timer: randomBoolean() ? randomInt(3, 10) : 0,
        });
    }

    let streets = [];
    let maxCarAmount = 0;
    for (let i = 0; i < streetAmount; i++) {
        let street = {
            start: randomInt(0, crossingAmount - 1),
            end: randomInt(0, crossingAmount - 1),
            length: randomInt(10, 10000),
            speedLimit: randomInt(5, 40),
            allowOvertaking: randomInt(1, 2),
            carAmount: 0,
        }

        let invalid = false;
        for (let crossing of crossings) {
            let incoming = 0;
            let outgoing = 0;
            for (let otherStreet of streets) {
                if (otherStreet.start == crossing.id) {
                    outgoing++;
                }
                if (otherStreet.end == crossing.id) {
                    incoming++;
                }
            }

            // Make sure that every crossing has at least one incoming and one outgoing street
            if (incoming == 0 && street.end !== crossing.id && street.start !== crossing.id) {
                street.end = crossing.id;
                incoming++;
            }

            if (outgoing == 0 && street.start !== crossing.id && street.end !== crossing.id) {
                street.start = crossing.id;
                outgoing++;
            }

            if (incoming > 4 && street.end == crossing.id) {
                invalid = true;
                break;
            }
            if (outgoing > 4 && street.start == crossing.id) {
                invalid = true;
                break;
            }
        }
        if (invalid || street.start == street.end) {
            i--;
            continue;
        }
        

        maxCarAmount += Math.floor(street.length / 10);

        streets.push(street);
    }

    const absoulteMaxCarAmount = 5000;
    maxCarAmount = Math.min(maxCarAmount, absoulteMaxCarAmount);
    let carAmount = randomInt(1, maxCarAmount);
    cars = [];

    for (let i = 0; i < carAmount; i++) {
        let car = {
            id: i,
            street: randomInt(0, streetAmount - 1),
            speed: randomInt(20, 40),
            acceleration: randomInt(1, 10),
        }

        if (streets[car.street].length > streets[car.street].carAmount * 10) {
            streets[car.street].carAmount++;
            cars.push(car);
        } else {
            i--;
        }
    }

    let crossingString = "";
    for (let crossing of crossings) {
        crossingString += `${crossing.id}:${crossing.timer}t\n`;
    }

    let streetString = "";
    for (let street of streets) {
        streetString += `${street.start}-->${street.end}:${street.length}m,${street.allowOvertaking}x,${street.speedLimit}max\n`;
    }

    let carString = "";
    for (let car of cars) {
        carString += `${car.id},${car.street},${car.speed},${car.acceleration}\n`;
    }

    return [
        {
            name: "crossings.sim",
            content: crossingString,
            raw: crossings,
        },
        {
            name: "streets.sim",
            content: streetString,
            raw: streets,
        },
        {
            name: "cars.sim",
            content: carString,
            raw: cars,
        }
    ];
}

module.exports = generateFiles;
