//import { KupDataRow } from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";

/**
 * Load image (J1;URL, J1;PATHFILE)
 * @param component
 */
//export const loadImage = (component: Widget) => {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loadImage = (component: unknown) => {
  /* FIXME: remove this mock when the images backend API will be fixed*/
  // if (component && component.data && component.data.rows) {
  //   component.data.rows.forEach(
  //     (row: KupDataRow, index: number, originalRows: KupDataRow[]) => {
  //       const cells = row.cells;
  //       if (cells) {
  //         const keys = Object.keys(cells).filter(key => {
  //           const cell = cells[key];
  //           const obj = cell.obj;
  //           if (obj) {
  //             if (
  //               obj.t === "J4" &&
  //               obj.p === "IMG" &&
  //               obj.k.startsWith("CN;COL;")
  //             )
  //               return key;
  //           }
  //         });
  //         keys.forEach(key => {
  //           const cell = originalRows[index].cells[key];
  //           if (cell) {
  //             const obj = cell.obj;
  //             if (obj) {
  //               const pngNameArray = obj.k.split(";");
  //               if (pngNameArray && pngNameArray[2]) {
  //                 const pngName = pngNameArray[2];
  //                 (component as Widget).data.rows[index].cells[key].value =
  //                   "https://smeup-public-read.s3.eu-central-1.wasabisys.com/www_download/resources/images/smeup/gruppo/img/CN/COL/" +
  //                   pngName +
  //                   ".png";
  //                 (component as Widget).data.rows[index].cells[key].data = {};
  //                 (component as Widget).data.rows[index].cells[
  //                   key
  //                 ].data.resource =
  //                   "https://smeup-public-read.s3.eu-central-1.wasabisys.com/www_download/resources/images/smeup/gruppo/img/CN/COL/" +
  //                   pngName +
  //                   ".png";
  //               }
  //             }
  //           }
  //         });
  //       }
  //     },
  //   );
  // }
};
