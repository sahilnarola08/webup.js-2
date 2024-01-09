import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  ApplicationConfigData,
  UiConfiguration,
} from "../../declarations/configDeclarations";
import { logInfo } from "../../utils/logger";

/**
 * This reduces contains the state of webup.js fixed elements:
 * - app bar
 * - header
 * - footer
 * - . . .
 */

/**
 * State interfaces
 */
export interface FixedElementsState {
  /**
   * Navbar state
   */
  navbar: {
    enabled: boolean;
  };
  /**
   * Drawer state (hamburger menu)
   */
  drawer: {
    isOpened: boolean;
  };
  /**
   * Dashboard mode state
   */
  dashboardMode: {
    isDashboard: boolean;
  };

  ui: UiConfiguration;
}

/**
 * Initial state
 */
const initialState: FixedElementsState = {
  navbar: {
    enabled: true,
  },
  drawer: {
    isOpened: false,
  },
  dashboardMode: {
    isDashboard: false,
  },
  ui: {
    debug: undefined,
    header: undefined,
    layout: undefined,
    login: undefined,
  },
};

/**
 * Fixed Element Slice
 */
const fixedElementsSlice = createSlice({
  name: "fixedElements",
  initialState,
  reducers: {
    /**
     * AppBar components actions
     * Refer to components located into components/appBarComponents.tsx
     */
    /**
     * DashboardModeButton action
     * Switch dashboard mode
     * @param state
     */
    switchDashboardMode(state) {
      state.dashboardMode.isDashboard = !state.dashboardMode.isDashboard;
    },
    /**
     * DrawerButton action
     * Open/Close drawer. Change its state
     * @param state
     */
    toggleDrawer(state) {
      state.drawer.isOpened = !state.drawer.isOpened;
    },
    setInitialValuesFromConfig(
      state,
      action: PayloadAction<{
        config: ApplicationConfigData;
      }>,
    ) {
      logInfo(
        "setInitialValuesFromConfig",
        "fixedElements.ts",
        [action.payload.config],
        true,
      );
      state.ui = action.payload.config.ui;
      state.dashboardMode.isDashboard = state.ui.layout?.isDashboard;
      state.navbar.enabled = state.ui.header.navBar.enabled;
    },
  },
});

// export actions
export const { switchDashboardMode, toggleDrawer, setInitialValuesFromConfig } =
  fixedElementsSlice.actions;

// export selectors
/**
 * Return the state of navbar
 * @param state
 * @returns
 */
export const isNavBarEnabled = (state: RootState): boolean =>
  state.fixedElements.navbar.enabled;
/**
 * Return the state of drawer
 * @param state
 * @returns
 */
export const isDrawerOpened = (state: RootState): boolean =>
  state.fixedElements.drawer.isOpened;
/**
 * Return the state of Dashboard mode
 * @param state
 * @returns
 */
export const isDashboardMode = (state: RootState): boolean =>
  state.fixedElements.dashboardMode.isDashboard;

export const getUIConfiguration = (state: RootState): UiConfiguration =>
  state.fixedElements.ui;

// export reducer
const reducer = fixedElementsSlice.reducer;
export default reducer;
