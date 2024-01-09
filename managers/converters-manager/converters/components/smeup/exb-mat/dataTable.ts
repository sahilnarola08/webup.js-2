import {
  KupComponent,
  ComponentOptions,
} from "../../../../declarations/component";
import { Components } from "@sme.up/ketchup";
import { KupDataDataset } from "@sme.up/ketchup";
import { YesNo } from "../../../../declarations/data-structures/general";
import { KupDataCell as KupDataCellKetchup } from "@sme.up/ketchup";
import { Shapes } from "../../../../../../declarations/componentDeclarations";

/**
 * Data Table
 */
export interface KupDataTableComponent extends KupComponent {
  /** data */
  data: KupDataDataset;
  /** props */
  config: Partial<Components.KupDataTable>;
}

/**
 * Data table options
 */
export interface DataTableOptions extends ComponentOptions {
  shape: Shapes.MAT;
  ColsWidth?: string;
  EnableSort?: YesNo;
  RowsPerPage?: number;
  SelFirst?: YesNo;
  SelectRow?: number;
}

export interface KupDataCell extends KupDataCellKetchup {
  pfk?: string;
  tfk?: string;
  sfk?: string;
  hasFocus?: boolean;
}
