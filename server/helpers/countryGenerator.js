const dream = require("dreamjs");
const chance = require("chance").Chance();

const countryGenerator = (count) => {
  let result;
  dream
    .schema({
      country: () => chance.country({ full: true }),
    })
    .generateRnd(count)
    .output(function (err, res) {
      result = res;
    });
  return result;
};

module.exports = countryGenerator;
