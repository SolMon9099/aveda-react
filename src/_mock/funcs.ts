// ----------------------------------------------------------------------

export function randomNumber(number: number) {
  return Math.floor(Math.random() * number) + 1;
}

export function randomNumberRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomInArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomItemsInArray<T>(array: T[], count: number = 1) {
  var tmp: T[] = array.slice();
  var items: T[] = [];
  for (var i = 0; i < Math.min(tmp.length, count); i ++) {
    var random = Math.floor(Math.random() * tmp.length);
    items.push(tmp[random]);
    tmp.splice(random, 1);
  }
  return items;
}
