import React, { useEffect, useRef } from "react";
import {
  Image,
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";

import { KupImage } from "@sme.up/ketchup-react";
import { RootState } from "../../../store/store";
import { getComponentById } from "../../../store/reduces/components";
import { useSelector } from "react-redux";
import { preElabComponent } from "../../../utils/componentUtils";
import { useDispatch } from "react-redux";
import useKupManager from "../../../composable/useKupManager";
import {
  KupDataNode,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";

import { executeTreeNodeDynamism } from "../../../managers/dynamismManager";
import { DynamismEvents } from "../../../declarations/dynamismDeclarations";
type Props = {
  rawComponent: RawComponent;
};

const Img: React.FC<Props> = props => {
  const image: Image = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as Image;
  const imageRef: React.RefObject<any> = useRef(null);
  const preElabOk = useRef(false);
  const firstCall = useRef(true);
  const dispatch = useDispatch();
  const kupManager = useKupManager();
  useEffect(() => {
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        image,
        props.rawComponent,
        Shapes.IMG,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        image &&
        image.loaded &&
        image.data
      ) {
        // event listeners
      }
    });
  });

const onClick = (event) =>{
  const columnName: null= null;
    const node: KupDataNode = image.data[0] ? image.data[0] : null;
    const columnArray = image.columns
      ? kupManager.data.column.find(image.columns, {
          name: columnName,
        })
      : [];
    executeTreeNodeDynamism(
      image.id,
      image.schedaId,
      columnArray && columnArray.length > 0 ? columnArray[0] : null,
      image.columns,
      node,
      image.dynamisms,
      DynamismEvents.CLICK,
      kupManager,
      dispatch,
    );
}

  return (
    <KupImage
      size-x={"auto"}
      size-y={"auto"}
      resource={image?.data?.resource}
      ref={imageRef}
      onKup-image-click={onClick}
    ></KupImage>
  );
};

export default Img;
