const random_number_generator = (start, end, iteration) => {
  let number = "";
  for (let i = 0; i < iteration; i++) {
    number += Math.floor(Math.random() * end + start);
  }
  return number;
};
export default random_number_generator;
