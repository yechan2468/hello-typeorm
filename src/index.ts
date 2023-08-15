import { AppDataSource } from "./data-source.js";
import { Member } from "./entity/User.js";

await AppDataSource.initialize();

const member1 = new Member();
member1.member_id = 1;
member1.member_name = "이예찬";
member1.department = "소프트웨어융합학과";
member1.gisu = 20;
member1.student_id = "2019102117";
member1.phone_number = "01012334456";
member1.graduated = false;
await member1.save();

const member2 = new Member();
member2.member_id = 2;
member2.member_name = "김부캠";
member2.department = "멤버십학과";
member2.gisu = 19;
member2.student_id = "2020115325";
member2.phone_number = "01013552488";
member2.graduated = false;
await member2.save();

const allUsers = await Member.find();
console.log("all users: ", allUsers);
const firstUser = await Member.findOneBy({
  member_id: 1,
});
console.log("first user: ", firstUser);
const timber = await Member.findOneBy({
  member_name: "이예찬",
  student_id: "2019102117",
});

await timber.remove();
