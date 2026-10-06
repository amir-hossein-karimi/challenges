const users = [
  { name: "Ali", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "Reza", role: "admin" },
];

// to this
// {
//   admin: [
//     { name: "Ali", role: "admin" },
//     { name: "Reza", role: "admin" }
//   ],
//   user: [
//     { name: "Sara", role: "user" }
//   ]
// }

const grouper = (arr, groupKey) => {
  const newObj = {};
  arr.forEach((arrItem, index) => {
    if (newObj[arr[index][groupKey]]) {
      newObj[arr[index][groupKey]] = [...newObj[arr[index][groupKey]], arrItem];
    } else {
      newObj[arr[index][groupKey]] = [arrItem];
    }
  });

  return JSON.stringify(newObj);
};

console.log({
  grouper: grouper(users, "role"),
});
