import dream from "dreamjs";
const booksGenerator = (count) => {
  let result;
  dream
    .schema({
      name: "name",
      age: "age",
      address: "address",
      contact: {
        phone: "phone",
        servicePhone: /^(800[1-9]{6})$/,
      },
      foo: function () {
        return "bar";
      },
      pi: "pi",
      hello: "hello",
    })
    .generateRnd(count)
    .output(function (err, res) {
      result = res;
    });
  return result;
};
export default booksGenerator;
