import { KupImageListComponent, ImageListOptions } from "./imageList";
import { ImageData } from "../img/image";
import {
  SmeupObjectArray,
  SmeupSchObject,
} from "../../../../declarations/data-structures/smeupObjectArray";
import { SmeupTreeNode } from "../../../../declarations/data-structures/smeupTreeNode";
import { isSmeupTreeNode } from "../../../../utils/smeupDataStructuresUtilities";
import { SmeupObject } from "../../../../declarations/data-structures/smeupObject";
import { isImageUrl, toKupObj } from "../../../../utils/smeupObjectUtilities";
import { getObjectIcon } from "../../../../services/iconService";
import { smeupSchObjectToSmeupObject } from "../../../utilities/smeupSchObjectToSmeupObject";
import { KupManager } from "@sme.up/ketchup/dist/types/managers/kup-manager/kup-manager-declarations";

/**
 * Smeup table and Image List options to Image List data and config
 * @param options Image List options
 * @param backendData SmeupTreeNode
 * @param _kupManager KupManager
 * @returns Image List data and config
 */
export const imageListConverter = (
  options: ImageListOptions,
  backendData: SmeupTreeNode | SmeupObjectArray,
  _kupManager: KupManager,
): Pick<KupImageListComponent, "data" | "config"> => {
  if (isSmeupTreeNode(backendData)) {
    return {
      data: treeNodeToImageListData(backendData),
      config: options,
    };
  } else {
    return {
      data: smeupObjectArrayToImageListData(backendData),
      config: options,
    };
  }
};

/**
 * Convert tree node to image data
 * @param treeNode
 * @returns
 */
export const treeNodeToImageListData = (
  treeNode: SmeupTreeNode,
): ImageData[] => {
  const imageListData: ImageData[] = [];

  treeNode.children.forEach((node: SmeupTreeNode) => {
    // create empty data
    const imageData: ImageData = {
      obj: {
        t: "",
        p: "",
        k: "",
      },
      resource: "",
    };

    if (node.content) {
      const smeupObject: SmeupObject = node.content;
      // set smeup object
      imageData.obj = toKupObj(node.content);

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
    imageListData.push(imageData);
  });

  return imageListData;
};

/**
 * Convert smeup object array to image data
 * @param smeupObjectArray
 * @returns
 */
export const smeupObjectArrayToImageListData = (
  smeupObjectArray: SmeupObjectArray,
): ImageData[] => {
  const imageListData: ImageData[] = [];

  smeupObjectArray.rows.forEach((object: SmeupSchObject) => {
    // create empty data
    const imageData: ImageData = {
      obj: {
        t: "",
        p: "",
        k: "",
      },
      resource: "",
    };

    const smeupObject: SmeupObject = smeupSchObjectToSmeupObject(object);
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
    imageListData.push(imageData);
  });

  return imageListData;
};
