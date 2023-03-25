// The following code is used to generate the input files for the JARs
// The function should return an array of objects with the following structure:
// {
//      name: "filename.txt",
//      content: "file content",
// }  
// Only the parameters show above are used by the rest of the Code, so you can add additional parameters if you want.
// The function should not write any files to the disk.

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}



function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generate_full_network(crossing) {
    let crossings = [];
    let streets = [];

    for (let i = 0; i < crossing; i++) {
        crossings.push([4, 4]);
        for (let j = 0; j < 4; j++) {
            let end = Math.floor(Math.random() * crossing);

            sum = 0;
            for (let [i, street] of streets.entries()) {
                if (end == street[1]) {
                    sum += 1;
                }
            }
            let retry = 0;
            while ((end == i || sum >= 4) && retry < crossing * 4) {
                end = Math.floor(Math.random() * crossing);
                sum = 0;
                for (let [i, street] of streets.entries()) {
                    if (end == street[1]) {
                        sum += 1;
                    }
                }
                retry++;
            }
            if (retry >= crossing * 4) {
                continue;
            }

            let street = [i, end];
            streets.push(street);
        }
    }
    return [crossings, streets];
}

function mutate_network(network, street_density) {
    let randomized = [...network[1]];
    shuffleArray(randomized);
    let streets_copy = [...randomized];
    let removed_streets = 0;
    let copy = [...streets_copy];

    for (let [i, street] of randomized.entries()) {
        if (removed_streets >= randomized.length * (1 - street_density)) {
            break;
        }
        let crossings = network[0];
        let start_outgoing = crossings[street[0]][1] - 1;
        let end_incoming = crossings[street[1]][0] - 1;

        if (start_outgoing >= 1 && start_outgoing <= 4 && end_incoming >= 1 && end_incoming <= 4) {
            const index = copy.indexOf(5);
            if (index > -1) { // only splice array when item is found
                copy.splice(index, 1); // 2nd parameter means remove one item only
            }
            crossings[street[0]][1] -= 1;
            crossings[street[1]][0] -= 1;
            removed_streets += 1;
        }
    }
    return [network[0], copy];
}

function generate_street_attributes(network, double_lane_weight) {
    let new_streets = [];
    for (let [i, street] of network[1].entries()) {
        let length = randomIntFromInterval(40, 200);
        // length = Math.ceil(n / (Math.log(n) * Math.log(n)));
        let lanes = 1;
        if (Math.random() < double_lane_weight) {
            lanes = 2;
        }
        let max_speed = randomIntFromInterval(5, 40);
        new_streets.push([street[0], street[1], length, lanes, max_speed]);
    }
    return [network[0], new_streets];
}


function generateFiles() {
    let number_of_crossings = randomIntFromInterval(20, 100);
    let street_density = Math.random();
    let double_lane_weight = Math.random();
    let car_density = Math.random();
    let round_about_density = Math.random();

    let streets = '';
    let crossings = '';
    let carsString = '';
    let cars = [];
    let network = generate_full_network(number_of_crossings);
    network = mutate_network(network, street_density);
    network = generate_street_attributes(network, double_lane_weight);

    for (let [i, street] of network[1].entries()) {
        streets += `${street[0]}-->${street[1]}:${street[2]}m,${street[3]}x,${street[4]}max\n`;
    }

    for (let i = 0; i < network[0].length; i++) {
        crossings += `${i}:${Math.random() < round_about_density ? 0 : randomIntFromInterval(3, 10)}t\n`;
    }

    let car_id = 0
    for (let [i, street] of network[1].entries()) {
        for (let j = 0; j < street[2]; j += 10) {
            if (Math.random() < car_density) {
                carsString += `${car_id},${i},${randomIntFromInterval(20, 40)},${randomIntFromInterval(1, 10)}\n`;
                cars.push(car_id);
                car_id++;

            }
        }
    }
    return [
        {
            name: "crossings.sim",
            content: crossings,
            raw: crossings,
        },
        {
            name: "streets.sim",
            content: streets,
            raw: streets,
        },
        {
            name: "cars.sim",
            content: carsString,
            raw: cars,
        }
    ];
}

module.exports = generateFiles;
