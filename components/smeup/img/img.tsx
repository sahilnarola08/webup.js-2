
import React from "react";
import { RawComponent } from "../../../declarations/componentDeclarations";
import { KupImage, KupAccordion } from "@sme.up/ketchup-react";
type Props = {
  rawComponent: RawComponent;
  imgSrc: string,
  sizeX: string,
  sizeY: string,
};

const defaultProps: Partial<Props> = {
  imgSrc: "https://ketchup.smeup.com/ketchup-showcase/header_logo.svg",
  sizeX: "auto",
  sizeY: 'auto',
};


const Img: React.FC<Props> = ({ imgSrc = defaultProps.imgSrc, sizeX = defaultProps.sizeX, sizeY = defaultProps.sizeY }) => {

  return (

    <KupImage
      size-x={sizeX}
      size-y={sizeY}
      resource={imgSrc}
    >
    </KupImage >

  )
};

export default Img;