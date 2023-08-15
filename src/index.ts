import { AppDataSource } from "./data-source";
import { Member } from "./entity/User";

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

const member = new Member();
member.member_id = 1;
member.member_name = "이예찬";
member.department = "소프트웨어융합학과";
member.gisu = 20;
member.student_id = "2019102117";
member.phone_number = "01012334456";
member.graduated = false;

await member.save();

const allUsers = await Member.find();
const firstUser = await Member.findOneBy({
  member_id: 1,
});
const timber = await Member.findOneBy({
  member_name: "이예찬",
  student_id: "2019102117",
});

await timber.remove();
