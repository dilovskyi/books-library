const dream = require("dreamjs");
const chance = require("chance").Chance();

const booksGenerator = (count) => {
  let result;
  dream
    .schema({
      title: () => chance.sentence({ words: 5 }),
      content: () => chance.paragraph({ sentences: 10 }),
    })
    .generateRnd(count)
    .output(function (err, res) {
      result = res;
    });
  return result;
};

module.exports = booksGenerator;
