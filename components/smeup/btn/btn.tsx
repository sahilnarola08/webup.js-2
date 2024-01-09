import React, { useEffect, useRef } from "react";
import {
  ButtonList,
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";
import { KupButtonList } from "@sme.up/ketchup-react";
import { KupButtonListClickEventPayload } from "@sme.up/ketchup/dist/types/components/kup-button-list/kup-button-list-declarations";
import {
  DynamismEntity,
  DynamismEvents,
} from "../../../declarations/dynamismDeclarations";
import {
  addImplicitVariable,
  createDynamism,
} from "../../../utils/dynamismUtils";
import { ImplicitVariables } from "../../../declarations/variablesDeclarations";
import {
  addImplicitVariablesForSmeupObject,
  executeDynamism,
} from "../../../managers/dynamismManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  getComponentOptions,
  preElabComponent,
} from "../../../utils/componentUtils";
import { getClassNames, getTitleTag } from "../../utils";
import { getComponentById } from "../../../store/reduces/components";
import useKupManager from "../../../composable/useKupManager";

/* global HTMLKupButtonListElement */

type Props = {
  rawComponent: RawComponent;
};

const Btn: React.FC<Props> = props => {
  const buttonList: ButtonList = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as ButtonList;
  const dispatch = useDispatch();
  const kupManager = useKupManager();
  const preElabOk = useRef(false);
  const buttonListRef: React.RefObject<HTMLKupButtonListElement> = useRef(null);
  const firstCall = useRef(true);

  const onButtonClick = (
    event: CustomEvent<KupButtonListClickEventPayload>,
  ) => {
    // executeRowCellClick(
    //   dataTable.id,
    //   dataTable.fun,
    //   column,
    //   row,
    //   dataTable.dynamisms,
    //   [DynamismEvents.CLICK],
    //   kupManager.kupObjects,
    //   dispatch,
    // );
    const rawDynamisms = buttonList.dynamisms;
    if (!rawDynamisms || rawDynamisms.length === 0) {
      // implicit dynamism (exec)
      if (buttonList.data[event.detail.index].exec) {
        // create dynamism
        const rawDynamism: DynamismEntity = {
          event: DynamismEvents.CLICK,
          exec: buttonList.data[event.detail.index].exec,
        };
        const dynamism = createDynamism(rawDynamism);
        dynamism.source = buttonList.id;
        dynamism.schedaId = buttonList.schedaId;
        // execute
        executeDynamism(dynamism, dispatch);
      }
    } else {
      rawDynamisms.forEach(rawDynamism => {
        // create dynamism
        const dynamism = createDynamism(rawDynamism);
        dynamism.source = buttonList.id;
        dynamism.schedaId = buttonList.schedaId;
        addImplicitVariablesForSmeupObject(event.detail.obj, dynamism);
        addImplicitVariable(dynamism, {
          key: ImplicitVariables.TX,
          value: buttonList.data[event.detail.comp.selected].value,
        });
        addImplicitVariable(dynamism, {
          key: ImplicitVariables.FU,
          value: buttonList.data[event.detail.comp.selected].exec
            ? buttonList.data[event.detail.comp.selected].exec
            : "",
        });
        // execute
        executeDynamism(dynamism, dispatch);
      });
    }
  };

  useEffect(() => {
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        buttonList,
        props.rawComponent,
        Shapes.BTN,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        buttonList &&
        buttonList.loaded &&
        buttonList.data
      ) {
        // event listeners
      }
    });
  });

  if (buttonList) {
    if (!buttonList.loaded) {
      // donothing
    } else {
      if (buttonList.data) {
        return (
          <>
            {getTitleTag(buttonList)}
            <KupButtonList
              class={getClassNames(
                getComponentOptions(Shapes.BTN, buttonList.options),
              )}
              {...buttonList.config}
              ref={buttonListRef}
              id={buttonList.id}
              data={buttonList.data}
              onKup-buttonlist-click={onButtonClick}
            ></KupButtonList>
          </>
        );
      }
    }
  }
};

export default Btn;
