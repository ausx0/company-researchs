import {
  AbilityBuilder,
  MongoAbility,
  createMongoAbility,
} from "@casl/ability";

type Actions = "create" | "read" | "update" | "delete";
type Role = "Admin" | "lab-tech" | "reception";

type Subjects =
  | "Article"
  | "Comment"
  | "User"
  | "Admin"
  | "lab-tech"
  | "reception";
type AppAbility = MongoAbility<[Actions, Subjects]>;

interface User {
  role: Role;
  // other properties...
}

export function defineAbilitiesFor(user: User) {
  console.log(user);
  const { can, build, cannot, rules } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

  switch (
    user.role // Change this line
  ) {
    case "Admin":
      can("read", "Admin"); // add this line
      can("read", "lab-tech"); // Admin can read "lab-tech"
      can("read", "reception"); // Admin can read "reception"
      break;
    case "lab-tech":
      can("read", "lab-tech");

      break;
    case "reception":
      can("read", "reception");
      break;
    default:
      // default user can only read
      can("read", "User");
  }

  return build();
}
