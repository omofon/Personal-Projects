const prime = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

for (const num of prime) {
  console.log(num);
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

for (const key in obj) {
  console.log(key, obj[key]);
}
