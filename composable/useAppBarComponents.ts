import {
  AppBarComponentProps,
  APP_BAR_COMPONENTS,
} from "../components/framework/appBarComponents/appBarComponents";
import React from "react";
import { AppBarComponentKeys } from "../constants/generic";

/**
 * Return a list of AppBar Component, given the keys
 */
export default function useAppBarComponents(
  appBarComponentKeys: AppBarComponentKeys[],
): React.FC<AppBarComponentProps>[] {
  const appBarComponents: React.FC<AppBarComponentProps>[] = [];
  // For each key, fill array
  appBarComponentKeys?.forEach(key => {
    appBarComponents.push(APP_BAR_COMPONENTS[key]);
  });
  return appBarComponents;
}
