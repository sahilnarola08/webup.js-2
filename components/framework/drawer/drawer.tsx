import { store } from "../../../store/store";
import { KupDrawer, KupList } from "@sme.up/ketchup-react";
import {
  KupListEventPayload,
  KupListNode,
} from "@sme.up/ketchup/dist/types/components/kup-list/kup-list-declarations";
import React, { Ref, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAuthentication } from "../../../composable/useAuthentication";
import useDrawerListItems from "../../../composable/useDrawerListItems";
import { Shapes } from "../../../declarations/componentDeclarations";
import {
  getMainMenuFun,
  renewSFunction,
  resetError,
  resetMessages,
  setResetDevice,
} from "../../../store/reduces/components";
import {
  isDrawerOpened,
  toggleDrawer,
} from "../../../store/reduces/fixedElements";
import styles from "./drawer.module.scss";
import Tre from "../../smeup/tre/tre";
import { YesNo } from "../../../managers/converters-manager/declarations/data-structures/general";
import { TreeOptions } from "../../../managers/converters-manager/converters/components/smeup/tre/tree";

/* global HTMLKupListElement, HTMLKupDrawerElement */

const Drawer = () => {
  const drawerState: boolean = useSelector(isDrawerOpened);

  const { logout } = useAuthentication();
  const dispatch = useDispatch();

  const list: Ref<HTMLKupListElement> = useRef(null);
  const drawer: Ref<HTMLKupDrawerElement> = useRef(null);
  const listData: KupListNode[] = useDrawerListItems();

  const mainMenuFun = getMainMenuFun(store.getState());

  const onLogout = () => {
    dispatch(resetMessages());
    dispatch(resetError());
    dispatch(toggleDrawer());
    dispatch(setResetDevice());
    logout();
  };

  const onGoHome = () => {
    dispatch(resetMessages());
    dispatch(resetError());
    dispatch(toggleDrawer());
    //TODO: remove renew sfunction and use router.push("/home");
    dispatch(renewSFunction());
  };

  const onReady = () => {
    if (drawerState) {
      drawer.current?.open();
    }
  };

  const onClose = () => {
    if (drawerState) {
      dispatch(toggleDrawer());
    }
  };

  const onClick = (e: CustomEvent<KupListEventPayload>) => {
    switch (e.detail.selected.id) {
      case "1":
        return onGoHome();
      case "2":
        return onLogout();
      default:
        break;
    }
  };

  const onTreeNodeSelected = () => {
    if (drawerState) {
      dispatch(resetMessages());
      dispatch(resetError());
      dispatch(toggleDrawer());
    }
  };

  if (drawerState) {
    return (
      <KupDrawer
        className={styles.drawer}
        customStyle=".drawer { max-width: 80vw; }"
        ref={drawer}
        onKup-drawer-ready={onReady}
        onKup-drawer-close={onClose}
        onKup-tree-nodeselected={onTreeNodeSelected}
      >
        {
          (
            <KupList
              ref={list}
              data={listData}
              display-mode="description"
              show-icons
              onKup-list-click={onClick}
            ></KupList>
          ) as any
        }
        {mainMenuFun ? (
          <Tre
            rawComponent={{
              id: "mainMenu",
              fromScriptId: null,
              schedaId: null,
              fun: mainMenuFun.toString(),
              loaded: false,
              title: undefined,
              type: Shapes.TRE,
              options: {
                TRE: {
                  default: {
                    Expanded: YesNo.No,
                    shape: Shapes.TRE,
                  } as TreeOptions,
                },
              },
            }}
          ></Tre>
        ) : null}
      </KupDrawer>
    );
  }
};
export default Drawer;
