"use strict";
exports.__esModule = true;
var data_source_1 = require("./data-source");
var User_js_1 = require("./entity/User.js");
// AppDataSource.initialize()
//   .then(async () => {
//     console.log("Inserting a new user into the database...");
//     const user = new Member();
//     // user.firstName = "Timber";
//     // user.lastName = "Saw";
//     // user.age = 25;
//     await AppDataSource.manager.save(user);
//     // console.log("Saved a new user with id: " + user.id);
//     console.log("Loading users from the database...");
//     const users = await AppDataSource.manager.find(Member);
//     console.log("Loaded users: ", users);
//     console.log(
//       "Here you can setup and run express / fastify / any other framework."
//     );
//   })
//   .catch((error) => console.log(error));
await data_source_1.AppDataSource.initialize();
var member = new User_js_1.Member();
member.member_id = 1;
member.member_name = "이예찬";
member.department = "소프트웨어융합학과";
member.gisu = 20;
member.student_id = "2019102117";
member.phone_number = "01012334456";
member.graduated = false;
await member.save();
var allUsers = await User_js_1.Member.find();
var firstUser = await User_js_1.Member.findOneBy({
    member_id: 1
});
var timber = await User_js_1.Member.findOneBy({
    member_name: "이예찬",
    student_id: "2019102117"
});
await timber.remove();
