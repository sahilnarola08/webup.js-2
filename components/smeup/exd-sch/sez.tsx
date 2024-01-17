import { store } from "../../../store/store";
import React, { useEffect } from "react";
import {
  RawComponent,
  Scheda,
  Section,
  Shapes,
} from "../../../declarations/componentDeclarations";
import Lab from "../lab/lab";
import styles from "./sez.module.scss";
import {
  componentClass,
  componentStyles,
  isHiddenSection,
} from "../../../utils/componentUtils";
import Box from "../box/box";
import Btn from "../btn/btn";
import Inp from "../inp/inp";
import Mat from "../exb-mat/mat";
import Tre from "../tre/tre";
import Sch from "./sch";
import Dsh from "../dsh/dsh";
import { isDashboardMode } from "../../../store/reduces/fixedElements";
import Pln from "../pln/pln";
import Spl from "../spl/spl";
import { logInfo } from "../../../utils/logger";
import Img from "../img/img";
type Props = {
  section: Section;
};

const Sez: React.FC<Props> = props => {
  const hasComponents = !!props.section.components;
  const hasSections = !!props.section.sections;

  useEffect(() => { });

  logInfo("render", "sez.tsx");
  const style = componentStyles(
    props.section,
    isDashboardMode(store.getState()),
  );
  if (isHiddenSection(props.section)) {
    style["display"] = "none";
  }
  return (
    <div className={componentClass(props.section, styles)} style={style}>
      {hasSections
        ? iterateSections(props.section)
        : hasComponents
          ? iterateComponents(props.section.components)
          : null}
    </div>
  );
};

const iterateSections = (section: Section) => {
  return (
    <>
      {section.sections.map((section: Section) => {
        return <Sez key={section.id} section={section} />;
      })}
    </>
  );
};

const iterateComponents = (components: RawComponent[]) => {
  if (components) {
    return (
      <>
        {components.map((component: RawComponent) => {
          logInfo(
            "components " + component.type + "-" + component.id,
            "sez.tsx",
          );

          switch (component.type) {
            case Shapes.BOX:
              return <Box key={component.id} rawComponent={component} />;
            case Shapes.BTN:
              return <Btn key={component.id} rawComponent={component} />;
            case Shapes.IMG:
              // return <Img key={component.id} imgSrc="" rawComponent={component} />;
              return <Img key={component.id}  rawComponent={component} />;
            case Shapes.INP:
              return <Inp key={component.id} rawComponent={component} />;
            case Shapes.LAB:
              return <Lab key={component.id} rawComponent={component} />;
            case Shapes.MAT:
            case Shapes.EXB:
              return <Mat key={component.id} rawComponent={component} />;
            case Shapes.SCH:
            case Shapes.EXD:
              return (
                <Sch key={component.id} scheda={component as Scheda}></Sch>
              );
            case Shapes.TRE:
              return <Tre key={component.id} rawComponent={component} />;
            case Shapes.PLN:
              return <Pln key={component.id} rawComponent={component} />;
            case Shapes.SPL:
              return <Spl key={component.id} rawComponent={component} />;
            case Shapes.DSH:
              return <Dsh key={component.id} rawComponent={component} />;
            default: {
              return (
                <span key={component.id}>
                  <br />
                  <span>UNKNOWN COMPONENT [{component.type}]</span>
                </span>
              );
            }
          }
        })}
      </>
    );
  }
};

export default Sez;
