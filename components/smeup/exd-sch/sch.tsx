import React, { useRef } from "react";
import { useEffect } from "react";
import {
  Scheda,
  Section,
  Shapes,
} from "../../../declarations/componentDeclarations";
import Sez from "./sez";
import styles from "./sez.module.scss";
import { useDispatch } from "react-redux";
import { getComponentById } from "../../../store/reduces/components";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../store/store";
import {
  componentClass,
  componentStyles,
  preElabComponent,
} from "../../../utils/componentUtils";
import { isDashboardMode } from "../../../store/reduces/fixedElements";
import useKupManager from "../../../composable/useKupManager";

type Props = {
  scheda: Scheda;
};

const Sch: React.FC<Props> = props => {
  const scheda: Scheda = useSelector((state: RootState) =>
    getComponentById(state, props.scheda.id),
  ) as Scheda;
  const kupManager = useKupManager();
  const dispatch = useDispatch();
  const preElabOk = useRef(false);
  const firstCall = useRef(true);

  useEffect(() => {
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        scheda,
        props.scheda,
        Shapes.SCH,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        scheda &&
        scheda.loaded &&
        scheda.sections
      ) {
        // event listeners
      }
    });
  });

  if (scheda) {
    if (!scheda.loaded) {
      // donothing
    } else {
      return (
        <>
          {/*getTitleTag(scheda)*/}
          <div
            className={componentClass(scheda, styles)}
            style={componentStyles(scheda, isDashboardMode(store.getState()))}
          >
            {scheda.sections?.map((section: Section) => {
              return <Sez key={section.id} section={section} />;
            })}
          </div>
        </>
      );
    }
  }
};

export default Sch;
