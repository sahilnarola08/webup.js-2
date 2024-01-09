import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  RawComponent,
  Shapes,
  Spotlight,
} from "../../../declarations/componentDeclarations";
import { getComponentById } from "../../../store/reduces/components";
import { RootState } from "../../../store/store";
import {
  getComponentOptions,
  preElabComponent,
} from "../../../utils/componentUtils";
import { getClassNames, getTitleTag } from "../../utils";
import useKupManager from "../../../composable/useKupManager";
import { KupTextField } from "@sme.up/ketchup-react";
import { KupTextFieldEventPayload } from "@sme.up/ketchup";
import { executeRowDynamism } from "../../../managers/dynamismManager";
import { DynamismEvents } from "../../../declarations/dynamismDeclarations";
import { KupObj } from "@sme.up/ketchup/dist/types/managers/kup-objects/kup-objects-declarations";

type Props = {
  rawComponent: RawComponent;
};

const Spl: React.FC<Props> = props => {
  const spotlight: Spotlight = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as Spotlight;
  const dispatch = useDispatch();
  const kupManager = useKupManager();
  const preElabOk = useRef(false);
  const firstCall = useRef(true);

  const onSubmit = (event: CustomEvent<KupTextFieldEventPayload>) => {
    const value = event.detail.value;
    const obj: KupObj = { t: "J1", p: "STR", k: value };

    let ret: boolean = executeRowDynamism(
      spotlight.id,
      spotlight.schedaId,
      null,
      null,
      null,
      spotlight.dynamisms,
      [DynamismEvents.CLICK],
      kupManager,
      dispatch,
      obj,
      value,
    );
    if (ret) {
      return;
    }
    if (!value) {
      return;
    }
    /** da aggiungere gestione con FUN generica ecc. ecc. */
  };

  useEffect(() => {
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        spotlight,
        props.rawComponent,
        Shapes.SPL,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        spotlight &&
        spotlight.loaded &&
        spotlight.data &&
        spotlight.data.length > 0
      ) {
        // event listeners
      }
    });
  });
  if (spotlight) {
    if (!spotlight.loaded) {
      // donothing
    } else {
      if (spotlight.data) {
        return (
          <>
            {getTitleTag(spotlight)}
            <div id={spotlight.id}>
              <KupTextField
                class={getClassNames(
                  getComponentOptions(Shapes.SPL, spotlight.options),
                )}
                {...spotlight.config}
                inputMode={"search"}
                onKup-textfield-submit={onSubmit}
              ></KupTextField>
            </div>
          </>
        );
      }
    }
  }
};

export default Spl;
