import {
  KupBoxObject,
  KupBoxLayout,
  KupBoxSection,
  KupBoxRow,
} from "@sme.up/ketchup/dist/types/components/kup-box/kup-box-declarations";
import {
  KupFormField,
  KupFormLabelAlignment,
  KupFormLabelPlacement,
  KupFormLayout,
  KupFormRow,
  KupFormSection,
} from "@sme.up/ketchup/dist/types/components/kup-form/kup-form-declarations";
import { FCellShapes } from "@sme.up/ketchup/dist/types/f-components/f-cell/f-cell-declarations";
import { KupDataRow } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import { GenericMap } from "@sme.up/ketchup/dist/types/types/GenericTypes";
import { ComponentOptions } from "../../declarations/component";
import { InputPanelOptions } from "../components/smeup/inp/inputPanel";
import {
  Column,
  Row,
} from "../../declarations/data-structures/smeupDataStructure";
import {
  SmeupField,
  SmeupFields,
  SmeupFormat,
  SmeupLayout,
  SmeupSection,
} from "../../declarations/data-structures/smeupLayout";
import {
  SmeupStyle,
  SmeupStyleOptions,
} from "../../declarations/data-structures/smeupSch";
import { isYes } from "../../utils/smeupDataStructuresUtilities";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

export const layoutToKupFormLayout = (
  layout: SmeupLayout,
  kupFormRow: KupFormRow,
  columns: Column[] | undefined,
  row: Row,
  options: ComponentOptions,
  layoutFields: SmeupFields,
) => {
  layoutToKupLayout(
    layout,
    undefined,
    kupFormRow.layout,
    true,
    columns,
    row,
    kupFormRow,
    options,
    layoutFields,
  );
};

export const layoutToKupBoxLayout = (
  layout: SmeupLayout,
  styles: SmeupStyle[] | undefined,
  kupBoxRow: KupBoxRow,
  columns: Column[] | undefined,
  row: Row,
  options: ComponentOptions,
) => {
  layoutToKupLayout(
    layout,
    styles,
    kupBoxRow.layout,
    false,
    columns,
    row,
    kupBoxRow,
    options,
    {},
  );
};

const layoutToKupLayout = (
  layout: SmeupLayout,
  styles: SmeupStyle[] | undefined,
  kupLayout: KupFormLayout | KupBoxLayout,
  isFormLayout: boolean,
  columns: Column[] | undefined,
  row: Row,
  kupRow: KupDataRow,
  options: ComponentOptions,
  layoutFields: SmeupFields,
) => {
  kupLayout.sections = [];
  // they could be an array, next managed!!! for now just first
  if (!layout.fmts || layout.fmts.length == 0) {
    return;
  }
  const format: SmeupFormat = layout.fmts[0];
  if (!format.sections || format.sections.length == 0) {
    return;
  }
  for (let i = 0; i < format.sections.length; i++) {
    kupLayout.sections.push(
      sectionToKupSection(
        isFormLayout,
        format.sections[i],
        columns,
        undefined,
        options,
        layoutFields,
        styles,
      ),
    );
  }
  if (kupLayout.sections.length > 0) {
    kupLayout.horizontal = isHorizontal(format.sections[0].attributes.Pos);
  }

  fillKupLayout(kupLayout, columns, row, kupRow);
};

const sectionToKupSection = (
  isFormLayout: boolean,
  section: SmeupSection,
  columns: Column[] | undefined,
  parentSection: SmeupSection | undefined,
  options: ComponentOptions,
  layoutFields: SmeupFields,
  styles: SmeupStyle[] | undefined,
): KupFormSection | KupBoxSection => {
  const kupSection: KupFormSection | KupBoxSection = instatiateSection(
    isFormLayout,
    section,
    parentSection,
    styles,
  );

  if (isFormLayout) {
    manageLabelPosition(kupSection, section, options as InputPanelOptions);
    manageLabelAlign(kupSection, section);
    manageLabelWidth(kupSection, section);
  }

  if (section.sections && section.sections.length != 0) {
    if (!kupSection.sections) {
      kupSection.sections = [];
    }
    for (let i = 0; i < section.sections.length; i++) {
      kupSection.sections.push(
        sectionToKupSection(
          isFormLayout,
          section.sections[i],
          columns,
          section,
          options,
          layoutFields,
          styles,
        ),
      );
    }
    kupSection.horizontal = isHorizontal(section.sections[0].attributes.Pos);
  } else {
    kupSection.horizontal = false;
    if (section.fields && section.fields.length != 0) {
      if (!kupSection.content) {
        kupSection.content = [];
      }
      for (let i = 0; i < section.fields.length; i++) {
        const field = section.fields[i];
        kupSection.content.push(
          fieldToKupLayoutField(isFormLayout, field, columns, layoutFields),
        );
      }
    }
  }
  return kupSection;
};

const instatiateSection = (
  isFormLayout: boolean,
  section: SmeupSection,
  _parentSection: SmeupSection | undefined,
  styles: SmeupStyle[] | undefined,
): KupFormSection | KupBoxSection => {
  const kupSection: KupFormSection | KupBoxSection = isFormLayout
    ? ({} as KupFormSection)
    : ({} as KupBoxSection);
  kupSection.horizontal = isHorizontal(section.attributes.Pos);
  if (section.attributes.Txt) {
    kupSection.title = section.attributes.Txt;
  }
  let dim = section.attributes.Dim?.trim();
  if (dim) {
    if (!dim.endsWith("%") && !dim.endsWith("px") && !isNaN(Number(dim))) {
      dim = dim + "px";
    } else if (!dim.endsWith("%") && !dim.endsWith("px")) {
      dim = undefined;
    }
    if (
      dim &&
      (!section.sections || section.sections.length == 0) &&
      (kupSection.horizontal == true || dim.endsWith("px"))
    ) {
      kupSection.dim = dim;
    }
  }
  if (section.attributes?.Sty) {
    const style = styles.find(s => s.name == section.attributes?.Sty);
    if (style && style.transcodedValue) {
      kupSection.style = style.transcodedValue;
    }
  }
  // if (dim && parentSection) {
  //   if (!dim.endsWith("%")) {
  //     dim = dim + "px";
  //   }

  //   if (dim.endsWith("px") || kupSection.horizontal)
  //     kupSection.dim = section.attributes.Dim;
  // }
  return kupSection;
};

const isHorizontal = (pos: string): boolean => {
  if (!pos) {
    return false;
  }
  const lastCh = pos.substring(pos.length - 1);
  const n = new Number(lastCh);
  if (isNaN(n.valueOf())) {
    return true;
  }
  return false;
};

const fieldToKupLayoutField = (
  isFormLayout: boolean,
  field: SmeupField,
  columns: Column[] | undefined,
  layoutFields: SmeupFields,
): KupFormField | KupBoxObject => {
  const kupField: KupFormField | KupBoxObject = isFormLayout
    ? ({} as KupFormField)
    : ({} as KupBoxObject);
  kupField.column = field.attributes.Nam;
  if (isFormLayout) {
    manageFormField(kupField, field);
    layoutFields[kupField.column] = field;
  } else {
    manageBoxObject(kupField, field, columns);
  }
  return kupField;
};

const manageLabelPosition = (
  kupSection: KupFormSection,
  section: SmeupSection,
  options: InputPanelOptions,
) => {
  const labelPosition = section.attributes.LabelPosition
    ? section.attributes.LabelPosition
    : options.Position;

  if (!labelPosition) {
    return;
  }
  if (!kupSection.label) {
    kupSection.label = {};
  }
  switch (labelPosition.toUpperCase()) {
    case "BOTTOM": {
      kupSection.label.placement = "bottom" as KupFormLabelPlacement;
      break;
    }
    case "LEFT": {
      kupSection.label.placement = "left" as KupFormLabelPlacement;
      break;
    }
    case "HIDDEN": {
      kupSection.label.placement = "hidden" as KupFormLabelPlacement;
      break;
    }
    case "RIGHT": {
      kupSection.label.placement = "right" as KupFormLabelPlacement;
      break;
    }
    case "TOP": {
      kupSection.label.placement = "top" as KupFormLabelPlacement;
      break;
    }
    case "WATERMARK":
    default: {
      kupSection.label.placement = "placeholder" as KupFormLabelPlacement;
      break;
    }
  }
};

const manageLabelAlign = (
  kupSection: KupFormSection,
  section: SmeupSection,
) => {
  if (!section.attributes.LabelAlign) {
    return;
  }
  if (!kupSection.label) {
    kupSection.label = {};
  }
  switch (section.attributes.LabelAlign.toUpperCase()) {
    case "CENTER": {
      kupSection.label.alignment = "center" as KupFormLabelAlignment;
      break;
    }
    case "LEFT": {
      kupSection.label.alignment = "left" as KupFormLabelAlignment;
      break;
    }
    case "RIGHT": {
      kupSection.label.alignment = "right" as KupFormLabelAlignment;
      break;
    }
  }
};
const manageLabelWidth = (
  kupSection: KupFormSection,
  section: SmeupSection,
) => {
  if (!section.attributes.LabelWidth) {
    return;
  }
  if (!kupSection.label) {
    kupSection.label = {};
  }
  kupSection.label.width = section.attributes.LabelWidth;
};

const manageFormField = (kupField: KupFormField, field: SmeupField) => {
  if (field.attributes.Txt) {
    kupField.label = field.attributes.Txt;
  }
  switch (field.attributes.Cmp) {
    case "Rad": {
      kupField.shape = "RAD" as FCellShapes;
      /** TODO: ketchup kup-form.renderFormField cellProps costruito solo con cell
       * cell: formField.data ? { ...cell, data: formField.data } : cell,
       * probabilmente adesso si perde i valori impostati in formField.data  */
      kupField.data = {
        data: [
          { value: "1", label: "Si", checked: false },
          { value: "2", label: "No", checked: false },
        ],
      };
      break;
    }
    case "Acp": {
      kupField.shape = "ACP" as FCellShapes;
    }
  }
};

const manageBoxObject = (
  kupField: KupBoxObject,
  field: SmeupField,
  columns: Column[] | undefined,
) => {
  if (
    field.attributes.Ori &&
    field.attributes.Ori.trim().toUpperCase() == "D"
  ) {
    if (field.attributes.Fun) {
      if (field.attributes.Fun.trim().toUpperCase() == "FIX") {
        let value = "";
        if (field.attributes.Par && field.attributes.Par.length > 5) {
          // Par="Cst(xxx)"
          value = field.attributes.Par.substring(
            4,
            field.attributes.Par.length - 1,
          );
        }
        kupField.value = value;
        kupField.column = undefined;
      } else if (field.attributes.Fun.trim().toUpperCase() == "HEAD") {
        const column = columns?.find(col => col.code == kupField.column);
        if (column) {
          kupField.value = column.text;
          kupField.column = undefined;
        }
      }
    }
  }
};

export const defaultKupBoxLayout = (
  kupBoxRow: KupBoxRow,
  columns: Column[] | undefined,
  row: Row,
  layoutColumns?: string,
) => {
  if (!columns || columns.length == 0) {
    return;
  }
  if (!row || !row.fields) {
    return;
  }

  const kupLayout: KupBoxLayout = kupBoxRow.layout;
  const father: KupBoxSection = {};
  father.horizontal = true;
  father.sections = [];

  const son: KupBoxSection = {};
  son.sections = [];

  const daugther: KupBoxSection = {};
  daugther.sections = [];

  father.sections.push(son);
  father.sections.push(daugther);

  const columnsArr = layoutColumns?.split("|") || [];

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];

    if (!columnsArr.length || columnsArr.includes(column.code)) {
      const label: KupBoxObject = {};
      label.value = column.text;

      const nl_label: KupBoxSection = {};
      nl_label.content = [];
      nl_label.content.push(label);

      son.sections.push(nl_label);

      const value: KupBoxObject = {};
      value.column = column.code;

      const nl_value: KupBoxSection = {};
      nl_value.content = [];
      nl_value.content.push(value);
      nl_value.style = {};
      nl_value.style["fontWeight"] = "bold";

      daugther.sections.push(nl_value);
    }
  }

  kupLayout.sections = [father];
};

/** see FileToLayouts.fillLayout() */
const fillKupLayout = (
  kupLayout: KupFormLayout | KupBoxLayout,
  columns: Column[] | undefined,
  row: Row,
  kupRow: KupDataRow,
) => {
  if (!columns || columns.length == 0) {
    return;
  }
  if (!row || !row.fields) {
    return;
  }

  const leaves = getLeaves(kupLayout);
  let colIndex = 0;

  for (let i = 0; i < leaves.length; i++) {
    let fieldName = undefined;
    const section = leaves[i];
    if (!section.content || section.content.length == 0) {
      section.content = [];
      fieldName = columns[colIndex++].code;
      // to fix for FORM
      const obj: KupBoxObject = {};
      obj.column = fieldName;
      section.content.push(obj);
    } else if (!section.content[0].column && !section.content[0].value) {
      fieldName = columns[colIndex++].code;
      section.content[0].column = fieldName;
    } else if (section.content[0].column) {
      fieldName = section.content[0].column;
    } else {
      // todo: vedere se va bene
      fieldName = "just-value";
    }

    const fieldAlignByStyle = section.style
      ? section.style["textAlign"]
      : undefined;
    const hasFontWeight = section.style
      ? section.style["fontWeight"]
      : undefined;
    if (fieldName && kupRow.cells[fieldName]) {
      kupRow.cells[fieldName].cssClass = "";

      if (fieldAlignByStyle) {
        switch (fieldAlignByStyle) {
          case "center": {
            kupRow.cells[fieldName].cssClass += " c-centered";

            break;
          }
          case "right": {
            kupRow.cells[fieldName].cssClass += " c-right-aligned";

            break;
          }
        }
      }

      if (hasFontWeight) {
        kupRow.cells[fieldName].cssClass += " strong-text";
      }
    }
    if (colIndex >= columns.length) {
      break;
    }
  }
};

const getLeaves = (
  kupLayout: KupFormLayout | KupBoxLayout,
): KupFormSection[] | KupBoxSection[] => {
  const leaves: KupFormLayout[] | KupBoxLayout[] = [];
  addLeaves(leaves, kupLayout.sections);
  return leaves;
};

const addLeaves = (
  leaves: KupFormSection[] | KupBoxSection[],
  sections: KupFormSection[] | KupBoxSection[] | undefined,
) => {
  if (!sections) {
    return;
  }
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (!section.sections || section.sections.length == 0) {
      leaves.push(section);
    } else {
      addLeaves(leaves, section.sections);
    }
  }
};

export const stylesConverter = (
  stylesIn: SmeupStyle[],
  kupManager: KupManager,
): SmeupStyle[] => {
  const stylesOut: SmeupStyle[] = [];
  stylesIn?.forEach(style => {
    stylesOut.push({
      name: style.name,
      value: style.value,
      transcodedValue: styleConverter(style.value, kupManager),
    });
  });
  return stylesOut;
};

export const styleConverter = (
  style: SmeupStyleOptions,
  kupManager: KupManager,
): GenericMap => {
  const styleOut: GenericMap = {};
  if (style.Align) {
    styleOut["textAlign"] = style.Align.trim().toLowerCase();
  }
  if (style.FontBold && isYes(style.FontBold)) {
    styleOut["fontWeight"] = "bold";
  }
  if (style.FontItalic && isYes(style.FontItalic)) {
    styleOut["fontStyle"] = "italic";
  }
  if (style.FontName) {
    styleOut["fontFamily"] = style.FontName.trim().toLowerCase();
  }
  if (style.FontSize) {
    styleOut["fontSize"] = style.FontSize.trim().toLowerCase() + "px";
  }
  if (
    (style.FontULine && isYes(style.FontULine)) ||
    (style.FontUnder && isYes(style.FontUnder))
  ) {
    styleOut["textDecoration"] = "underline";
  }
  if (style.Padding) {
    styleOut["padding"] = style.Padding.trim().toLowerCase();
  }
  if (style.BackColor) {
    styleOut["backgroundColor"] = kupManager.theme.colorCheck(
      style.BackColor,
    ).hexColor;
  }
  if (style.FontColor) {
    styleOut["color"] = kupManager.theme.colorCheck(style.FontColor).hexColor;
  }
  return styleOut;
};
