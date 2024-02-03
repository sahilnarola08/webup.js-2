import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { KupImageComponent, ImageOptions, ImageData } from "./image";
import { SmeupObject } from "../../../../declarations/data-structures/smeupObject";
import { SmeupObjectArray } from "../../../../declarations/data-structures/smeupObjectArray";
import { SmeupTreeNode } from "../../../../declarations/data-structures/smeupTreeNode";
import { getObjectIcon } from "../../../../services/iconService";
import { isSmeupObjectArray, isSmeupTreeNode } from "../../../../utils/smeupDataStructuresUtilities";
import { isImageUrl, toKupObj } from "../../../../utils/smeupObjectUtilities";
import { smeupSchObjectToSmeupObject } from "../../../utilities/smeupSchObjectToSmeupObject";
import { objectArrayToKupTreeNodeArray } from "../../../utilities/objectArrayToKupTreeNodeArray";
import { TreeNodeExt } from "../tre/tree";
import { Counter } from "../../../../utils/regexUtilities";
import { Components, KupDataColumn } from "@sme.up/ketchup";
import { columnToKupColumn } from "../../../utilities/columnToKupColumn";

/**
 * Smeup table and Image options to Image data and config
 * @param options Image options
 * @param backendData SmeupTreeNode
 * @param _kupManager KupManager
 * @returns Image data and config
 */
export const imageConverter = (
  options: ImageOptions,
  backendData: SmeupTreeNode | SmeupObjectArray,
  _kupManager: KupManager,
): Pick<KupImageComponent, "data" | "config"> => {
  let data: TreeNodeExt[] = [];
  const counter: Counter = { nr: 0 };
  if (isSmeupObjectArray(backendData)) {
    const config = imageOptionsToImagePropsFromObjectArray(backendData);
    // convert SmeupObjectArray to TreeNode[]
    data = objectArrayToKupTreeNodeArray(backendData, options, counter);
    return {
      data: data,
      config: config,
    };
  } else {
    const config = imageOptionsToImagePropsFromTreeNode(backendData);
    // convert SmeupTreeNode to TreeNode[]
    const data = treeNodeToImageData(
      backendData,
    );
    const columns = treeNodeToKupColumnsArray(backendData);
    const ret: Pick<KupImageComponent, "data" | "config" | "columns"> = {
      data: data,
      config: config,
    };
    if (columns) {
      ret.columns = columns;
    }
    return ret;
  }
};

/**
 * Convert tree node to image data
 * @param treeNode
 * @returns
 */
export const treeNodeToImageData = (treeNode: SmeupTreeNode): ImageData => {
  // create empty data
  const imageData: ImageData = {
    obj: {
      t: "",
      p: "",
      k: "",
    },
    resource: "",
  };

  if (treeNode.children[0]?.content) {
    const smeupObject: SmeupObject = treeNode.children[0].content;
    // set smeup object
    imageData.obj = toKupObj(treeNode.children[0].content);

    // set resource
    if (isImageUrl(smeupObject)) {
      // set resource as url
      imageData.resource = smeupObject.codice.substring(
        smeupObject.codice.indexOf("J1;URL;") + 7,
      );
    } else {
      // getting image from smeup object
      const resource = getObjectIcon(imageData.obj);
      if (resource) {
        imageData.resource = resource;
      }
    }
  }
  return imageData;
};
export const imageOptionsToImagePropsFromTreeNode = (treeNode: SmeupTreeNode): Partial<Components.KupImage> => {
  // create empty data
  const imageData: ImageData = {
    obj: {
      t: "",
      p: "",
      k: "",
    },
    resource: "",
  };

  if (treeNode.children[0]?.content) {
    const smeupObject: SmeupObject = treeNode.children[0].content;
    // set smeup object
    imageData.obj = toKupObj(treeNode.children[0].content);

    // set resource
    if (isImageUrl(smeupObject)) {
      // set resource as url
      imageData.resource = smeupObject.codice.substring(
        smeupObject.codice.indexOf("J1;URL;") + 7,
      );
    } else {
      // getting image from smeup object
      const resource = getObjectIcon(imageData.obj);
      if (resource) {
        imageData.resource = resource;
      }
    }
  }
  return imageData;
};

/**
 * Convert smeup object array to image data
 * @param smeupObjectArray
 * @returns
 */
export const smeupObjectArrayToImageData = (
  smeupObjectArray: SmeupObjectArray,
): ImageData => {
  // create empty data
  const imageData: ImageData = {
    obj: {
      t: "",
      p: "",
      k: "",
    },
    resource: "",
  };

  if (smeupObjectArray.rows[0]) {
    const smeupObject: SmeupObject = smeupSchObjectToSmeupObject(
      smeupObjectArray.rows[0],
    );
    // set smeup object
    imageData.obj = toKupObj(smeupObject);

    // set resource
    if (isImageUrl(smeupObject)) {
      // set resource as url
      imageData.resource = smeupObject.codice.substring(
        smeupObject.codice.indexOf("J1;URL;") + 7,
      );
    } else {
      // getting image from smeup object
      const resource = getObjectIcon(imageData.obj);
      if (resource) {
        imageData.resource = resource;
      }
    }
  }
  return imageData;
};
export const imageOptionsToImagePropsFromObjectArray = (
  smeupObjectArray: SmeupObjectArray,
): Partial<Components.KupImage> => {
  // create empty data
  const imageData: ImageData = {
    obj: {
      t: "",
      p: "",
      k: "",
    },
    resource: "",
  };

  if (smeupObjectArray.rows[0]) {
    const smeupObject: SmeupObject = smeupSchObjectToSmeupObject(
      smeupObjectArray.rows[0],
    );
    // set smeup object
    imageData.obj = toKupObj(smeupObject);

    // set resource
    if (isImageUrl(smeupObject)) {
      // set resource as url
      imageData.resource = smeupObject.codice.substring(
        smeupObject.codice.indexOf("J1;URL;") + 7,
      );
    } else {
      // getting image from smeup object
      const resource = getObjectIcon(imageData.obj);
      if (resource) {
        imageData.resource = resource;
      }
    }
  }
  return imageData;
};



const treeNodeToKupColumnsArray = (
  backendData: SmeupTreeNode | SmeupObjectArray,
): KupDataColumn[] | null => {
  if (!backendData || !isSmeupTreeNode(backendData)) {
    return null;
  }
  const data: SmeupTreeNode = backendData;
  if (!data.columns || data.columns.length == 0) {
    return null;
  }
  const columns: KupDataColumn[] = [];
  for (let i = 0; i < data.columns.length; i++) {
    columns.push(columnToKupColumn(data.columns[i]));
  }
  return columns;
};
