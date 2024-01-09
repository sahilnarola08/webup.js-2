import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Scheda } from "../../../declarations/componentDeclarations";
import { getMainScheda } from "../../../store/reduces/components";
import { RootState } from "../../../store/store";
import Sch from "../../smeup/exd-sch/sch";

const View = () => {
  const scheda: Scheda = useSelector((state: RootState) =>
    getMainScheda(state),
  );

  useEffect(() => {});

  if (scheda) {
    return <Sch scheda={scheda}></Sch>;
  }
};

export default View;
