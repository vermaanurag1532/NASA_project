const parse = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_dispostion'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6;
}

/* javascript promises concept
const promise  = new promise((resolve , reject) => {
    resolve(42);    // 42 is value passed as result
});
promise.then((result) => {

});
const result = await promise;
console.log(result);
*/


function loadPlanaetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream("kepler_data.csv")
            .pipe(parse.parse({
                comment: "#",
                columns: true, // returm each row in csv file as js obj with key value pair rather than just an array the value in a row
            }))
            .on("data", (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on("error", (err) => {
                console.log(err);
                reject(err);
            })
            .on("end", () => {
                console.log(`${habitablePlanets.length} habitale planets is found !`);
                resolve();
            });
    });
}


module.exports = {
    loadPlanaetsData,
    planets: habitablePlanets,
};

// readable.pipe(writable);