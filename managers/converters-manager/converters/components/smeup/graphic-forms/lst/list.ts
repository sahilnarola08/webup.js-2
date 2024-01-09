import { Components } from "@sme.up/ketchup";
import {
  ItemsDisplayMode,
  KupListNode,
  KupListRole,
} from "@sme.up/ketchup/dist/types/components/kup-list/kup-list-declarations";
import {
  ComponentOptions,
  KupComponent,
} from "../../../../../declarations/component";
import { Shapes } from "../../../../../../../declarations/componentDeclarations";

/**
 * List
 */
export interface KupListComponent extends KupComponent {
  /** data */
  data: KupListNode[];
  /** props */
  config: Partial<Components.KupList>;
}

/**
 * List options
 */
export interface ListOptions extends ComponentOptions {
  shape: Shapes.LST;
  displayMode?: ItemsDisplayMode;
  hideText?: boolean;
  keyboardNavigation?: boolean;
  menuVisible?: boolean;
  roleType?: KupListRole;
  selectable?: boolean;
  showIcons?: boolean;
}
