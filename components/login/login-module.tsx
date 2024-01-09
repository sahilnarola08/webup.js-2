import {
  KupAccordion,
  KupButton,
  KupImage,
  KupList,
  KupSpinner,
  KupSwitch,
  KupTextField,
} from "@sme.up/ketchup-react";
import { FButtonStyling } from "@sme.up/ketchup/dist/types/f-components/f-button/f-button-declarations";
import { useSelector } from "react-redux";
import { LoginModuleData } from "../../declarations/authDeclarations";
import { RootState, store } from "../../store/store";
import styles from "./login-modules.module.scss";
import React, { useRef } from "react";
import { KupAccordionData } from "@sme.up/ketchup/dist/types/components/kup-accordion/kup-accordion-declarations";
import {
  KupListEventPayload,
  KupListNode,
} from "@sme.up/ketchup/dist/types/components/kup-list/kup-list-declarations";
import {
  getLoginActiveModule,
  isMobile,
  setActiveLoginModule,
  switchDevice,
} from "../../store/reduces/components";
import { useAuthentication } from "../../composable/useAuthentication";
import { ApplicationConfigData } from "../../declarations/configDeclarations";
import { KupSwitchEventPayload } from "@sme.up/ketchup";
import { getLoginModules, getLoginModulesListData } from "./utils/utils";
import { useDispatch } from "react-redux";

/* global HTMLKupTextFieldElement, HTMLKupButtonElement , HTMLKupAccordionElement*/

const LoginModule: React.FC<{ config: ApplicationConfigData }> = config => {
  const modSelected: LoginModuleData = useSelector((state: RootState) =>
    getLoginActiveModule(state),
  );
  const { login } = useAuthentication();
  const defaultLogo = config.config?.ui?.login?.defaultLogo;
  let hiddenEnv = !!config.config?.ui?.login?.hiddenFields?.env;
  let hiddenPassword = !!config.config?.ui?.login?.hiddenFields?.password;
  let hiddenUser = !!config.config?.ui?.login?.hiddenFields?.user;
  const envLabel = config.config?.ui?.login?.labels?.env;
  const passwordLabel = config.config?.ui?.login?.labels?.password;
  const userLabel = config.config?.ui?.login?.labels?.user;
  const mobile = isMobile(store.getState());

  const userField = useRef<HTMLKupTextFieldElement>();
  const pwdField = useRef<HTMLKupTextFieldElement>();
  const envField = useRef<HTMLKupTextFieldElement>();
  const loginButton = useRef<HTMLKupButtonElement>();
  const extraButtons = useRef<HTMLDivElement>();
  const accordion = useRef<HTMLKupAccordionElement>();

  const dispatch = useDispatch();

  const onSubmit = async () => {
    //TODO: handle spinner globally
    loginButton.current.showSpinner = true;
    let user = await userField.current?.getValue();
    if (!user) {
      user = modSelected.authData?.user;
    }
    let pwd = await pwdField.current?.getValue();
    if (!pwd) {
      pwd = modSelected.authData?.pwd;
    }
    let env = await envField.current?.getValue();
    if (!env) {
      env = modSelected.authData?.env;
    }
    login({ user, pwd, env }).finally(() => {
      loginButton.current.showSpinner = false;
    });
  };

  const onOthers = async () => {
    if (
      extraButtons.current.classList.contains(styles.form__extra_panel__hidden)
    ) {
      extraButtons.current.classList.remove(styles.form__extra_panel__hidden);
    } else {
      extraButtons.current.classList.add(styles.form__extra_panel__hidden);
    }
  };

  const onSwitchChange = async (event: CustomEvent<KupSwitchEventPayload>) => {
    switch (event.detail.id) {
      case "stay-connected-switch":
        break;
      case "web-mob-switch": {
        store.dispatch(switchDevice());
        break;
      }
      default:
        break;
    }
  };

  if (modSelected) {
    if (modSelected.authData?.env) {
      hiddenEnv = true;
    }
    if (modSelected.authData?.user && modSelected.authData?.pwd) {
      hiddenUser = true;
      hiddenPassword = true;
    }
    const logoImage = "./assets/images/" + modSelected.logo;
    //FIXME: use Next.js public directory
    // const logoUrl =
    //   "https://webuptest.smeup.com/WebUPNightly/javax.faces.resource/" +
    //   modSelected.logo +
    //   ".jsf?ln=er";
    const accordionData: KupAccordionData = {
      columns: [
        {
          name: "module",
          title: modSelected.title,
        },
      ],
    };
    const modules: LoginModuleData[] = getLoginModules(defaultLogo);
    const listData: KupListNode[] = getLoginModulesListData(modules);

    return (
      <div
        id="moduleSelected"
        onKeyUp={e => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      >
        <div className={`${styles.form} ${styles.form__visible}`}>
          <div className={styles.form__modules_wrapper}>
            <KupAccordion
              data={accordionData}
              className={`${styles.form__modules_accordion} kup-borderless kup-full-width`}
              ref={accordion}
            >
              {
                (
                  <KupList
                    data={listData}
                    slot="module"
                    onKup-list-click={(e: CustomEvent<KupListEventPayload>) => {
                      let mm = modules.find(m => m.id == e.detail.selected.id);
                      if (mm) {
                        accordion.current.collapseAll();
                        dispatch(
                          setActiveLoginModule({
                            module: mm,
                          }),
                        );
                      }
                    }}
                  ></KupList>
                ) as any
              }
            </KupAccordion>
          </div>
          <h2 className={styles.form__title}>{modSelected?.title}</h2>
          <h4 className={styles.form__subtitle}>
            {"Inserire le credenziali per eseguire l'accesso"}
          </h4>
          <KupImage
            sizeX="100px"
            sizeY="auto"
            class={styles.modules__logo}
            id="moduleLogoImage"
            resource={logoImage}
          ></KupImage>
          {hiddenUser ? null : (
            <KupTextField
              class={`${styles.form__user} ${styles.form__login_field}`}
              outlined={true}
              label={userLabel}
              initial-value={modSelected.authData?.user}
              ref={userField}
              key={modSelected.id + "_user"}
            ></KupTextField>
          )}
          {hiddenPassword ? null : (
            <KupTextField
              class={`${styles.form__password} ${styles.form__login_field}`}
              outlined={true}
              label={passwordLabel}
              input-type="password"
              initial-value={modSelected.authData?.pwd}
              ref={pwdField}
              key={modSelected.id + "_pwd"}
            ></KupTextField>
          )}
          {hiddenEnv ? null : (
            <KupTextField
              outlined={true}
              class={`${styles.form__env} ${styles.form__login_field}`}
              label={envLabel}
              initial-value={modSelected.authData?.env}
              ref={envField}
              key={modSelected.id + "_env"}
            ></KupTextField>
          )}
          <div className={styles.form__extra_options}>
            <KupButton
              id="others-button"
              icon="keyboard_arrow_left"
              label="Others"
              styling={"flat" as FButtonStyling}
              class={`${styles.form__extra_button} kup-large`}
              onKup-button-click={onOthers}
            ></KupButton>

            <div
              id={modSelected.id + "-form-extra-buttons"}
              className={
                styles.form__extra_panel +
                " " +
                styles.form__extra_panel__hidden
              }
              ref={extraButtons}
            >
              <KupSwitch
                className={styles.form__connected}
                id="stay-connected-switch"
                label="Rimani connesso"
                checked={false}
              ></KupSwitch>
              <KupSwitch
                className={styles.form__mobile}
                id="web-mob-switch"
                label="Mobile"
                checked={mobile}
                onKup-switch-change={onSwitchChange}
              ></KupSwitch>
            </div>

            <KupButton
              id="login-button"
              icon="login"
              label="Login"
              class="kup-large"
              styling={"outlined" as FButtonStyling}
              ref={loginButton}
              onKup-button-click={onSubmit}
            >
              {
                (
                  <KupSpinner
                    slot="spinner"
                    dimensions="0.6em"
                    active={true}
                  ></KupSpinner>
                ) as any
              }
            </KupButton>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginModule;
