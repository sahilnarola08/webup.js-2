import { KupButton, KupImage } from "@sme.up/ketchup-react";
import { FButtonStyling } from "@sme.up/ketchup/dist/types/f-components/f-button/f-button-declarations";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveLoginModule } from "../../store/reduces/components";
import styles from "./login-modules.module.scss";
import { ApplicationConfigData } from "../../declarations/configDeclarations";
import { getActiveModule, getLoginModules } from "./utils/utils";
import { LoginModuleData } from "../../declarations/authDeclarations";
import useKupManager from "../../composable/useKupManager";
import {
  KupDragEffect,
  KupDropEventTypes,
} from "@sme.up/ketchup/dist/types/managers/kup-interact/kup-interact-declarations";
import { KupScrollOnHoverElement } from "@sme.up/ketchup/dist/types/managers/kup-scroll-on-hover/kup-scroll-on-hover-declarations";
import { logInfo } from "../../utils/logger";
import Img from "../smeup/img/img";

const LoginModules: React.FC<{ config: ApplicationConfigData }> = config => {
  const dispatch = useDispatch();

  const defaultLogo = config.config?.ui?.login?.defaultLogo;

  const kupManager = useKupManager();
  const handles = useRef<any[]>([]); // HTMLKupImageElement
  const items = useRef<HTMLElement[]>([]);
  const wrapper = useRef<HTMLDivElement>();

  const [modules, setModules] = useState(getLoginModules(defaultLogo));
  const [showHidden, setShowHidden] = useState(false);

  const getFirstVisibleModule = (): LoginModuleData => {
    return modules && modules.length > 0 ? modules.find(m => !m.hidden) : null;
  };

  const [activeModule, setActiveModule] = useState(getFirstVisibleModule()?.id);

  const updateModulesInLocalStorage = (modules: LoginModuleData[]) => {
    let lsModules = "";
    modules.forEach(module => {
      lsModules += module.id + ";";
    });
    localStorage.setItem("modules", lsModules);
  };

  useEffect(() => {
    const cleanDD = (item: HTMLElement) => {
      item.classList.remove(styles.modules__item__over);
      item.classList.remove(styles.modules__item__over__bottom);
      item.classList.remove(styles.modules__item__over__top);
      item.dataset.half = "";
    };
    const initialize = () => {
      const activeM = getActiveModule(activeModule, modules);
      if (activeM) {
        dispatch(setActiveLoginModule({ module: activeM }));
      }
      if (!items.current && !items.current.length) {
        return;
      }
      logInfo(
        "Initializing drag and drop on modules",
        "login-modules.tsx",
        items.current,
        true,
      );
      for (let i = 0; i < items.current.length; i++) {
        const item = items.current[i];
        const handleEl = handles.current[i];
        logInfo(
          "Processing d&d for item " + i,
          "login-modules.tsx",
          [item],
          true,
        );
        kupManager.interact.draggable(
          item,
          {
            allowFrom: handleEl ?? null,
          },
          null,
          "clone" as KupDragEffect,
          {
            start: () => {
              kupManager.scrollOnHover.register(
                wrapper.current as unknown as KupScrollOnHoverElement,
                true,
                { back: 0.3, forward: 0.7 },
                5,
              );
            },
            move: e => {
              items.current.forEach(item => {
                cleanDD(item);
                const rect = item.getBoundingClientRect();
                const offset = 4;
                const isDraggedElement =
                  item.getAttribute("kup-draggable") !== null;
                const isMouseOver =
                  e.clientY >= rect.top - offset &&
                  e.clientY <= rect.bottom + offset;
                if (!isDraggedElement && isMouseOver) {
                  const isBottomHalf = e.clientY - rect.y > rect.height / 2;
                  item.classList.add(styles.modules__item__over);
                  if (isBottomHalf) {
                    item.classList.add(styles.modules__item__over__bottom);
                    item.dataset.half = "bottom";
                  } else {
                    item.classList.add(styles.modules__item__over__top);
                    item.dataset.half = "top";
                  }
                }
              });
            },
            end: () => {
              items.current.forEach(item => {
                item.classList.remove(styles.modules__item__over);
              });
              kupManager.scrollOnHover.stop(
                wrapper.current as unknown as KupScrollOnHoverElement,
              );
              kupManager.scrollOnHover.unregister(
                wrapper.current as unknown as KupScrollOnHoverElement,
              );
            },
          },
        );
      }
      kupManager.interact.dropzone(
        wrapper.current,
        null,
        {
          dispatcher: wrapper.current,
          type: "text/generic" as KupDropEventTypes,
        },
        {
          drop: e => {
            const movedEl = e.relatedTarget;
            let overEl: HTMLElement = null;
            items.current.forEach(item => {
              if (item.dataset.half) {
                overEl = item;
              }
            });
            if (overEl) {
              const newOrder = Array.from(modules);
              const startIdx = newOrder.indexOf(
                newOrder.find(m => m.id === movedEl.id),
              );
              const movedItem = newOrder.splice(startIdx, 1)[0];
              const overIdx = newOrder.indexOf(
                newOrder.find(m => m.id === overEl.id),
              );
              const overItem = newOrder.splice(overIdx, 1)[0];
              if (overEl.dataset.half === "bottom") {
                newOrder.splice(overIdx, 0, overItem, movedItem);
              } else {
                newOrder.splice(overIdx, 0, movedItem, overItem);
              }
              setModules(newOrder);
              updateModulesInLocalStorage(newOrder);
            }
          },
        },
      );
    };

    initialize();
  }, [
    dispatch,
    kupManager.interact,
    kupManager.scrollOnHover,
    modules,
    activeModule,
  ]);

  const showHideModule = (id: string) => {
    const newModules: LoginModuleData[] = [];
    let hiddenIds = "";
    let moduleModified: LoginModuleData = null;
    for (let i = 0; i < modules.length; i++) {
      let lm = modules[i];
      if (lm.id === id) {
        lm = JSON.parse(JSON.stringify(lm));
        lm.hidden = !lm.hidden;
        moduleModified = lm;
      } else {
        newModules.push(lm);
      }
      if (lm.hidden) {
        hiddenIds += lm.id + ";";
      }
    }
    if (moduleModified) {
      newModules.push(moduleModified);
    }
    // modules.forEach(m => {
    //   let lm = m;
    //   if (m.id === id) {
    //     lm = JSON.parse(JSON.stringify(m));
    //     lm.hidden = !lm.hidden;
    //   }
    //   if (lm.hidden) {
    //     hiddenIds += lm.id + ";";
    //   }
    //   newModules.push(lm);
    // });
    localStorage.setItem("hiddenModules", hiddenIds);
    setModules(newModules);
  };

  const showModuleDetail = (mod: LoginModuleData) => {
    setActiveModule(mod.id);
    dispatch(setActiveLoginModule({ module: mod }));
  };

  const hiddenModulesJsx: React.ReactNode[] = [];
  const modulesJsx: React.ReactNode[] = [];

  for (let index = 0; index < modules.length; index++) {
    const mod = modules[index];
    const element = (
      <div
        id={mod.id}
        key={mod.id}
        className={`${styles.modules__item} ${
          activeModule === mod.id ? styles.modules__item__active : ""
        }`}
        ref={el => {
          if (el && !mod.hidden) {
            items.current.push(el);
          }
        }}
        onClick={() => (mod.hidden ? null : showModuleDetail(mod))}
      >
        {mod.hidden ? null : (
          <div
            className={styles.modules__item__handle}
            ref={el => {
              if (el) {
                handles.current.push(el);
              }
            }}
          >
            <KupImage
              class={styles.modules__item__icon}
              resource="drag_handle"
              size-x="32px"
              size-y="32px"
            ></KupImage>
          </div>
        )}
        <KupImage
          class={styles.modules__item__icon}
          color={"var(--kup-" + mod.status + "-color)"}
          resource="brightness_1"
          size-x="32px"
          size-y="32px"
        ></KupImage>
        <div className={styles.modules__item__label} title={mod.title}>
          {mod.title}
        </div>
        {activeModule !== mod.id ? (
          <KupButton
            class={`${styles.modules__item__buttonhide} kup-slim`}
            icon={mod.hidden ? "remove_red_eye" : "eye-off"}
            styling={"icon" as FButtonStyling}
            onClick={e => {
              e.stopPropagation();
              showHideModule(mod.id);
            }}
          ></KupButton>
        ) : null}
      </div>
    );
    if (mod.hidden) {
      hiddenModulesJsx.push(element);
    } else {
      modulesJsx.push(element);
    }
  }

  handles.current = [];
  items.current = [];

  return (
    <div className={styles.modules}>
      <div className={styles.modules__header}>
        <h1 className={styles.modules__head}>Login</h1>
        <div className={styles.modules__headerbtns}>
          <KupButton
            title="Switch to old login page"
            id="old"
            /*onclick="window.location.href='webuplogin.jsf'"*/
            label="OLD LOGIN"
            styling={"flat" as FButtonStyling}
            class={styles.modules__settings}
          ></KupButton>
        </div>
      </div>
      <h2 className={styles.modules__title}>{"Moduli di accesso"}</h2>
      <h4 className={styles.modules__subtitle}>
        {"Selezionare il modulo con cui eseguire l'accesso"}
      </h4>
      {/* <Img /> */}
      <span id="modulesItems">
        <div className={styles.modules__list} ref={wrapper}>
          {modulesJsx}
        </div>
      </span>
      <KupButton
        icon={showHidden ? "keyboard_arrow_down" : "keyboard_arrow_right"}
        label="Nascosti"
        styling={"flat" as FButtonStyling}
        class="kup-large kup-full-width"
        onKup-button-click={() => {
          setShowHidden(!showHidden);
        }}
      ></KupButton>
      {showHidden ? (
        <div className={`${styles.modules__hidden}`}>{hiddenModulesJsx}</div>
      ) : null}
      <KupImage
        sizeX="100px"
        sizeY="auto"
        class={styles.modules__logo}
        id="poweredByImage"
        resource={
          "https://webuptest.smeup.com/WebUPNightly/javax.faces.resource/poweredby.png.jsf?ln=images&amp;v=1_0"
        }
      ></KupImage>
    </div>
  );
};

export default LoginModules;
