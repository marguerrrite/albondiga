export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getFunName() {
  const nicknames = [
    "spooch",
    "ricky",
    "joanie",
    "jabroni",
    "laika",
    "spatcho",
    "spatch",
    "rigatoni",
    "spaceman",
    "lady",
    "nibbler",
    "mrs",
    "nibs",
    "dj",
    "cocoa",
    "nibby",
    "laney",
    "boggs",
    "victor",
    "smellen",
    "spoochiman",
    "tucci",
    "simmerkane",
    "location12",
    "comanche",
    "horse",
    "oscar",
    "gazpacho",
    "chadwick",
    "stokes",
    "the",
  ];

  return `${rando(nicknames)}-${rando(nicknames)}-${rando(nicknames)}`;
}

//Thank you Wes Bos for these helper functions and React tutorials 🙌🏽