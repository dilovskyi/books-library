const dream = require("dreamjs");
const chance = require("chance").Chance();

const authorsGenerator = (count) => {
  let result;
  dream
    .schema({
      username: () => chance.name(),
      avatar: () => chance.avatar({ protocol: "https", fileExtension: "jpg" }),
      // genres: () => chance.pickset(["Fiction" , "Non-fiction", "Short story", "Novel", ]),
      email: () => chance.email(),
      // country: () => chance.country({ full: true }),
    })
    .generateRnd(count)
    .output(function (err, res) {
      result = res;
    });
  return result;
};

module.exports = authorsGenerator;
