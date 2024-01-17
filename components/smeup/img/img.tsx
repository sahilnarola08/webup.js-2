import React, { useEffect, useRef } from "react";
import {
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";
import { KupImage, KupAccordion } from "@sme.up/ketchup-react";
import { RootState } from "../../../store/store";
import { getComponentById } from "../../../store/reduces/components";
import { useSelector } from "react-redux";
import { preElabComponent } from "../../../utils/componentUtils";
import { useDispatch } from "react-redux";
import useKupManager from "../../../composable/useKupManager";
type Props = {
  rawComponent: RawComponent;
  // imgSrc: string,
  // sizeX: string,
  // sizeY: string,
};

// const defaultProps: Partial<Props> = {
//   imgSrc: "https://ketchup.smeup.com/ketchup-showcase/header_logo.svg",
//   sizeX: "auto",
//   sizeY: 'auto',
// };

// const Img: React.FC<Props> = ({ imgSrc = defaultProps.imgSrc, sizeX = defaultProps.sizeX, sizeY = defaultProps.sizeY }) => {
const Img: React.FC<Props> = props => {
  const imageData: any = useSelector((state: RootState) =>
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
        imageData,
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
        imageData &&
        imageData.loaded &&
        imageData.data
      ) {
        // event listeners
      }
    });
  });

  useEffect(() => {
    console.log("imageData 🎈🎈🎈", imageData);
  }, [imageData]);

  return (
    <KupImage
      // size-x={sizeX}
      // size-y={sizeY}
      // resource={imgSrc}
      // resource={"https://ketchup.smeup.com/ketchup-showcase/header_logo.svg"}
      resource={imageData?.data?.resource}
      ref={imageRef}
    ></KupImage>
  );
};

export default Img;
