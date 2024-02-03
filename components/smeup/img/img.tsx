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
import { getComponentOptions, preElabComponent } from "../../../utils/componentUtils";
import { useDispatch } from "react-redux";
import useKupManager from "../../../composable/useKupManager";
import {
  KupDataNode,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";

import { executeTreeNodeDynamism } from "../../../managers/dynamismManager";
import { DynamismEvents } from "../../../declarations/dynamismDeclarations";
import { getClassNames, getTitleTag } from "../../utils";
type Props = {
  rawComponent: RawComponent;
};

const Img: React.FC<Props> = props => {
  const image = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as Image;
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

const onClick = () =>{
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

if (image) {
  if (!image.loaded) {
    // donothing
  } else {
    if (image.data) {
      return (
       <>
        {getTitleTag(image)}
        <KupImage
          size-x={"auto"}
          size-y={"auto"}
          id={image.id}
          {...image.config}
          class={getClassNames(
            getComponentOptions(Shapes.IMG, image.options),
          )} 
          onKup-image-click={onClick}
        ></KupImage>
       </>
      );
    }
  
  }
}
  
};

export default Img;
