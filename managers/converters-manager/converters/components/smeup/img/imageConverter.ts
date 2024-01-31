import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";
import { KupImageComponent, ImageOptions, ImageData } from "./image";
import { SmeupObject } from "../../../../declarations/data-structures/smeupObject";
import { SmeupObjectArray } from "../../../../declarations/data-structures/smeupObjectArray";
import { SmeupTreeNode } from "../../../../declarations/data-structures/smeupTreeNode";
import { getObjectIcon } from "../../../../services/iconService";
import { isSmeupTreeNode } from "../../../../utils/smeupDataStructuresUtilities";
import { isImageUrl, toKupObj } from "../../../../utils/smeupObjectUtilities";
import { smeupSchObjectToSmeupObject } from "../../../utilities/smeupSchObjectToSmeupObject";
import { objectArrayToKupTreeNodeArray } from "../../../utilities/objectArrayToKupTreeNodeArray";
import { TreeNodeExt } from "../tre/tree";
import { Counter } from "../../../../utils/regexUtilities";

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
  if (isSmeupTreeNode(backendData)) {
    // convert SmeupObjectArray to TreeNode[]
    data = objectArrayToKupTreeNodeArray(backendData, options, counter);
    return {
      data: data,
      config: options,
    };
  } else {
    return {
      data: smeupObjectArrayToImageData(backendData),
      config: options,
    };
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
