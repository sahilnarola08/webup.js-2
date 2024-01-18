import React, { useEffect, useRef } from "react";
import {
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
type Props = {
  rawComponent: RawComponent;
};

const Image: React.FC<Props> = props => {
  const image: any = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as any;
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
        Shapes.IMAGE,
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

const onclick = () =>{

}

  return (
    <KupImage
      size-x={"auto"}
      size-y={"auto"}
      // size-y={sizeY}
      // resource={imgSrc}
      // resource={"https://ketchup.smeup.com/ketchup-showcase/header_logo.svg"}
      resource={image?.data?.resource}
      ref={imageRef}
      onKup-image-click={onclick}
    ></KupImage>
  );
};

export default Image;
