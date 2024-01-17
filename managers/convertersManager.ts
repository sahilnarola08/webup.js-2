import { buttonListConverter } from "./converters-manager/converters/components/smeup/btn/buttonListConverter";
import { labelConverter } from "./converters-manager/converters/components/smeup/lab/labelConverter";
import { dataTableConverter } from "./converters-manager/converters/components/smeup/exb-mat/dataTableConverter";
import { boxListConverter } from "./converters-manager/converters/components/smeup/box/boxListConverter";
import { calendarConverter } from "./converters-manager/converters/components/smeup/cal/calendarConverter";
import { dashListConverter } from "./converters-manager/converters/components/smeup/dsh/dashListConverter";
import { chartConverter } from "./converters-manager/converters/components/smeup/exa-cha/chartConverter";
import { imageConverter } from "./converters-manager/converters/components/smeup/img/imageConverter";
import { imageListConverter } from "./converters-manager/converters/components/smeup/iml/imageListConverter";
import { spotlightConverter } from "./converters-manager/converters/components/smeup/spl/spotlightConverter";
import { inputPanelConverter } from "./converters-manager/converters/components/smeup/inp/inputPanelConverter";
import { fieldConverter } from "./converters-manager/converters/components/smeup/fld/fieldConverter";
import { plannerConverter } from "./converters-manager/converters/components/smeup/pln/plannerConverter";
import {
  Component,
  Scheda,
  Shapes,
} from "../declarations/componentDeclarations";
import {
  DynamismEntity,
  DynamismEvents,
} from "../declarations/dynamismDeclarations";

import { BoxListOptions } from "./converters-manager/converters/components/smeup/box/boxList";
import { ButtonListOptions } from "./converters-manager/converters/components/smeup/btn/buttonList";
import { CalendarOptions } from "./converters-manager/converters/components/smeup/cal/calendar";
import { ChartOptions } from "./converters-manager/converters/components/smeup/exa-cha/chart";
import { DashListOptions } from "./converters-manager/converters/components/smeup/dsh/dashList";
import { FieldOptions } from "./converters-manager/converters/components/smeup/fld/field";
import { ImageOptions } from "./converters-manager/converters/components/smeup/img/image";
import { ImageListOptions } from "./converters-manager/converters/components/smeup/iml/imageList";
import { LabelOptions } from "./converters-manager/converters/components/smeup/lab/label";
import { DataTableOptions } from "./converters-manager/converters/components/smeup/exb-mat/dataTable";
import { TreeOptions } from "./converters-manager/converters/components/smeup/tre/tree";
import { PlannerOptions } from "./converters-manager/converters/components/smeup/pln/planner";
import {
  getAllComponentOptions,
  setComponentOptions,
} from "../utils/componentUtils";
import { isYes } from "./converters-manager/utils/smeupDataStructuresUtilities";
import { SmeupLayout } from "./converters-manager/declarations/data-structures/smeupLayout";
import { SmeupDataStructureType } from "./converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupStyle } from "./converters-manager/declarations/data-structures/smeupSch";
import { getComponentById, getMainScheda } from "../store/reduces/components";
import { store } from "../store/store";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { SpotlightOptions } from "./converters-manager/converters/components/smeup/spl/spotlight";
import { treeConverter } from "./converters-manager/converters/components/smeup/tre/treeConverter";
import { InputPanelOptions } from "./converters-manager/converters/components/smeup/inp/inputPanel";
import {
  SmeupButton,
  SmeupButtonArray,
} from "./converters-manager/declarations/data-structures/smeupButtonsArray";
import { ComponentOptions } from "./converters-manager/declarations/component";
import { logWarning } from "../utils/logger";

/**
 * Generate component.data and component.config from data
 * @param type Component shape
 * @param componentOptions Component options
 * @param data data
 * @returns Component
 */
export const convertersManager = (
  type: Shapes,
  component: Component,
  backendData: any,
  backendDetailData?: any,
  dynamisms?: DynamismEntity[],
  layout?: SmeupLayout | undefined,
  styles?: SmeupStyle[],
  kupManager?: KupManager,
) => {
  const componentOptions = component.options;
  let options: ComponentOptions = getAllComponentOptions(
    componentOptions,
    type,
    backendData,
  );
  if (
    !options.dSep &&
    component.schedaId &&
    component.id !== component.schedaId
  ) {
    let scheda = getComponentById(
      store.getState(),
      component.schedaId,
    ) as Scheda;
    if (!scheda) {
      scheda = getMainScheda(store.getState());
      logWarning(
        "convertersManager.ts subScheda [" +
          component.schedaId +
          "] not found, get main scheda [" +
          scheda.id +
          "]",
        "tre.tsx",
      );
    }
    options.dSep = scheda.dSep;
  }

  setComponentOptions(type, component, options);

  switch (type) {
    case Shapes.SCH:
    case Shapes.EXD: {
      return backendData;
    }
    case Shapes.BOX:
      return boxListConverter(
        options as BoxListOptions,
        backendData,
        layout,
        styles,
        kupManager,
      );
    case Shapes.BTN:
      return buttonListConverter(
        options as ButtonListOptions,
        backendData,
        kupManager,
      );
    case Shapes.CAL:
      return calendarConverter(
        options as CalendarOptions,
        backendData,
        kupManager,
      );
    case Shapes.CHA:
      return chartConverter(options as ChartOptions, backendData, kupManager);
    case Shapes.DSH:
      return dashListConverter(
        options as DashListOptions,
        backendData,
        kupManager,
      );
    case Shapes.FLD:
      return fieldConverter(options as FieldOptions, backendData, kupManager);
    case Shapes.IMG:
      // console.log('imageConverter(options as ImageOptions, backendData, kupManager) 🎈🎈🎈', imageConverter(options as ImageOptions, backendData, kupManager))
      return imageConverter(options as ImageOptions, backendData, kupManager);
    case Shapes.IML:
      return imageListConverter(
        options as ImageListOptions,
        backendData,
        kupManager,
      );
    case Shapes.INP: {
      const inputOptions = options as InputPanelOptions;
      const buttons: SmeupButtonArray = {
        type: SmeupDataStructureType.SMEUP_BUTTONS,
        buttons: [],
      } as SmeupButtonArray;
      if (!inputOptions.SubmitButton || isYes(inputOptions.SubmitButton))
        for (const d of dynamisms) {
          if (d.event) {
            switch (d.event.toLowerCase()) {
              case DynamismEvents.CLICK: {
                const b: SmeupButton = {
                  event: "click",
                  id: "*ENTER",
                  position: "BL",
                  title: inputOptions.ConfirmLabel
                    ? inputOptions.ConfirmLabel
                    : "Conferma",
                  icon: "check",
                };
                buttons.buttons.push(b);
                break;
              }
            }
          }
        }
      return inputPanelConverter(
        options as InputPanelOptions,
        backendData,
        buttons,
        layout,
        kupManager,
      );
    }
    case Shapes.LAB:
      return labelConverter(options as LabelOptions, backendData, kupManager);
    case Shapes.EXB:
    case Shapes.MAT: {
      return dataTableConverter(
        options as DataTableOptions,
        backendData,
        kupManager,
      );
    }
    case Shapes.PLN: {
      return plannerConverter(
        options as PlannerOptions,
        backendData,
        backendDetailData,
        kupManager,
      );
    }
    case Shapes.TRE:
      return treeConverter(options as TreeOptions, backendData, kupManager);
    case Shapes.SPL:
      return spotlightConverter(options as SpotlightOptions, backendData);
  }
};
