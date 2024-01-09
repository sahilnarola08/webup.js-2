import { store } from "../../../store/store";
import React from "react";
import { KupButton, KupTextField } from "@sme.up/ketchup-react";
import { useSelector } from "react-redux";
import {
  isDashboardMode,
  switchDashboardMode,
  toggleDrawer,
} from "../../../store/reduces/fixedElements";
import { useDispatch } from "react-redux";
import { KupTextFieldEventPayload } from "@sme.up/ketchup";
import { createFun } from "../../../utils/funUtils";
import {
  activeBackActionFlag,
  activeBackActionFlagForComponents,
  backFromFunctionHistory,
  getDevice,
  isDebug,
  reloadFromFunctionHistory,
  setLastFunction,
  switchDebug,
} from "../../../store/reduces/components";
import styles from "./appBarComponents.module.scss";
import { AppBarComponentKeys } from "../../../constants/generic";
import { logInfo } from "../../../utils/logger";

/**
 * This file contains all app bar components
 * - Search Bar
 * - Back Button
 * - Reload Button
 * - Dashboard Layout Button
 * - Debug Button
 */

/**
 * Prop interface for all App Bar Components
 */
export interface AppBarComponentProps {
  /** slot position for NavBar element */
  slot?: "left" | "right";
}

/**
 * Search Bar component
 * @param props
 * @returns
 */
//const SearchBar = (props: AppBarComponentProps): React.ReactNode => {
const SearchBar: React.FC<AppBarComponentProps> = props => {
  const dispatch = useDispatch();

  const onSearchBarSubmit = ({
    detail: { comp, value },
  }: CustomEvent<KupTextFieldEventPayload>) => {
    if (value) {
      logInfo("SearchBar fun: " + value, "appBarComponents.tsx");
      dispatch(
        setLastFunction({
          fun: createFun(
            value,
            getDevice(store.getState()),
            isDebug(store.getState()),
          ),
        }),
      );
    }
    comp.setValue("");
  };

  return (
    <KupTextField
      key="searchbar"
      class={styles.searchBar}
      id="searchbar"
      slot={props.slot}
      icon="magnify"
      custom-style="#kup-component .mdc-text-field { min-height: var(--webup-navbar-height) }"
      onKup-textfield-submit={onSearchBarSubmit}
    ></KupTextField>
  );
};

/**
 * Back button component
 * @param props
 * @returns
 */
const BackButton: React.FC<AppBarComponentProps> = props => {
  const dispatch = useDispatch();
  return (
    <KupButton
      key="backButton"
      slot={props.slot}
      id="backButton"
      icon="arrow_back"
      title="Go Back"
      onKup-button-click={() => {
        dispatch(backFromFunctionHistory());
      }}
    ></KupButton>
  );
};

/**
 * Reload button component
 * @param props
 * @returns
 */
const ReloadButton: React.FC<AppBarComponentProps> = props => {
  const dispatch = useDispatch();
  return (
    <KupButton
      key="reloadButton"
      slot={props.slot}
      id="reloadButton"
      icon="refresh"
      title="Reload"
      onKup-button-click={() => {
        dispatch(reloadFromFunctionHistory());
      }}
    ></KupButton>
  );
};

/**
 * Drawer button component (Hamburger menu)
 * @param props
 * @returns
 */
const DrawerButton: React.FC<AppBarComponentProps> = props => {
  const dispatch = useDispatch();
  return (
    <KupButton
      key="drawerButton"
      slot={props.slot}
      id="drawerButton"
      icon="menu"
      title="Menu"
      onKup-button-click={() => dispatch(toggleDrawer())}
    ></KupButton>
  );
};

/**
 * Dashboard Mode Button
 * - onClick => switch dashboard mode
 * @param props
 * @returns
 */
const DashboardModeButton: React.FC<AppBarComponentProps> = props => {
  const dispatch = useDispatch();
  const isDashboardUiMode = useSelector(isDashboardMode);

  return (
    <KupButton
      key="dashboardModeButton"
      slot={props.slot}
      toggable={true}
      id="dashboardModeButton"
      icon={"grid_on"}
      iconOff={"grid_off"}
      checked={isDashboardUiMode}
      title={
        isDashboardUiMode
          ? "Default mode (web.up compatibility)"
          : "Dashboard mode (looc.up compatibility)"
      }
      onKup-button-click={() => {
        dispatch(activeBackActionFlag());
        dispatch(activeBackActionFlagForComponents());
        dispatch(switchDashboardMode());
      }}
    ></KupButton>
  );
};

/**
 * Debug Button
 * - onClick => switch debug mode
 * @param props
 * @returns
 */
const DebugButton: React.FC<AppBarComponentProps> = props => {
  const dispatch = useDispatch();
  const isDebugMode = useSelector(isDebug);

  return (
    <KupButton
      className={isDebugMode ? "kup-secondary" : ""}
      key="debugButton"
      slot={props.slot}
      toggable={true}
      id="debugButton"
      icon={"bug"}
      iconOff={"bug"}
      checked={isDebugMode}
      title={"Toggle debug"}
      onKup-button-click={() => {
        dispatch(switchDebug());
      }}
    ></KupButton>
  );
};

export type AppBarComponentsMap = {
  [key in AppBarComponentKeys]: React.FC<AppBarComponentProps>;
};

/**
 * App Bar Component Map
 */
export const APP_BAR_COMPONENTS: AppBarComponentsMap = {
  SEARCH_BAR: SearchBar,
  BACK_BUTTON: BackButton,
  DASHBOARD_MODE_BUTTON: DashboardModeButton,
  DRAWER_BUTTON: DrawerButton,
  RELOAD_BUTTON: ReloadButton,
  DEBUG_BUTTON: DebugButton,
};
