// views/user.js
exports.renderList = (users) => {
  console.log("\nUsers:");
  users.forEach((u) => console.log(`- [${u.id}] ${u.name} (${u.age})`));
};

exports.renderUser = (user) => {
  if (!user) {
    console.log("User not found.");
  } else {
    console.log(
      `\nUser #${user.id}\n  Name: ${user.name}\n  Age : ${user.age}\n`
    );
  }
};
