import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Label,
  RawComponent,
  Shapes,
} from "../../../declarations/componentDeclarations";
import { getComponentById } from "../../../store/reduces/components";
import { RootState, store } from "../../../store/store";
import { preElabComponent } from "../../../utils/componentUtils";
import { getTitleTag } from "../../utils";
import { isDashboardMode } from "../../../store/reduces/fixedElements";
import styles from "./lab.module.scss";
import useKupManager from "../../../composable/useKupManager";

type Props = {
  rawComponent: RawComponent;
};

const Lab: React.FC<Props> = props => {
  const label: Label = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as Label;
  const dispatch = useDispatch();
  const kupManager = useKupManager();
  const preElabOk = useRef(false);
  const firstCall = useRef(true);

  useEffect(() => {
    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        label,
        props.rawComponent,
        Shapes.LAB,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (
        preElabOk.current == true &&
        label &&
        label.loaded &&
        label.data &&
        label.data.length > 0
      ) {
        // event listeners
      }
    });
  });

  if (label) {
    if (!label.loaded) {
      // donothing
    } else {
      if (label.data && label.data.length > 0) {
        const labels = [];
        for (let i = 0; i < label.data.length; i++) {
          if (label.data[i].value) {
            labels.push(
              <div
                data-cy="lab-value"
                key={label.id + "_" + i}
                style={label.config.styles}
              >
                {label.data[i].value}
              </div>,
            );
          }
        }
        return (
          <>
            {getTitleTag(label)}
            <div
              id={label.id}
              data-cy="lab"
              className={`${styles.label} ${
                isDashboardMode(store.getState()) ? styles.label__dashboard : ""
              }`}
            >
              {labels}
            </div>
          </>
        );
      }
    }
  }
};

export default Lab;
