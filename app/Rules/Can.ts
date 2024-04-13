import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { AnyAbility, PureAbility } from "@casl/ability";

export const AbilityContext = createContext<any>({} as any);
export const Can = createContextualCan(AbilityContext.Consumer);
