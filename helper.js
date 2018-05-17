module.exports = {

  random(a, b) {
    // random int between a and b, including a and b
    const result = Math.floor(Math.random() * (b - a + 1) + a);
    return result;
  }
};
