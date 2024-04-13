import {
  AbilityBuilder,
  MongoAbility,
  createMongoAbility,
} from "@casl/ability";
import { User } from "../Types";

type Actions = "create" | "read" | "update" | "delete";
type Subjects =
  | "Article"
  | "Comment"
  | "User"
  | "Admin"
  | "lab-tech"
  | "reception";
type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(user: any) {
  console.log(user);
  const { can, build, cannot, rules } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

  switch (
    user.role // Change this line
  ) {
    case "Admin":
      can("read", "Admin"); // add this line

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
