"use client";
import { AbilityContext } from "../Rules/Can";
import { useAuth } from "../hooks/useAuth";
import { defineAbilitiesFor } from "../Rules/defineAbility";

export default function AccessProvider(props: any) {
  const { user } = useAuth();
  return (
    <AbilityContext.Provider value={defineAbilitiesFor(user)}>
      {props.children}
    </AbilityContext.Provider>
  );
}
