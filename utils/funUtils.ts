import {
  Fun,
  FunType,
  SGType,
  VirtualFun,
  VirtualFunType,
} from "../declarations/componentDeclarations";
import { FunParserException } from "../exceptions/FunParserException";
import { logWarning } from "./logger";
import { parseBetweenBrackets } from "./regexUtils";

/**
 * This function converts fun object to string
 * @param fun fun object
 * @returns fun as string
 */
const funToString = (fun: Fun, device: string): string => {
  if (fun.type == FunType.UNK) {
    return fun.value;
  }

  if (fun.type == FunType.VIRTUAL) {
    return `${fun.virtualFun.type}(${fun.virtualFun.value ?? ""})`;
  }

  let f = `${
    fun.type
  }(${fun.component.trim()};${fun.service.trim()};${fun.method.trim()}) `;

  // objects
  for (let i = 1; i < 7; i++) {
    if (fun[`obj${i}`]) {
      f += `${i.toString()}(${fun[`obj${i}`].t};${fun[`obj${i}`].p};${
        fun[`obj${i}`].k
      }) `;
    }
  }
  // P param
  if (fun.p) {
    f += `P(${fun.p.trim()}) `;
  }
  // INPUT param
  if (fun.input) {
    f += `INPUT(${fun.input.trim()}) `;
  }
  // NOTIFY
  if (fun.notify) {
    f += `NOTIFY(${fun.notify.trim()}) `;
  }
  // G
  if (fun.g) {
    f += `G(${fun.g.trim()}) `;
  }
  // SG
  if (fun.sg) {
    f += `SG(`;
    switch (fun.sg.type) {
      case SGType.AskConf: {
        f += `${fun.sg.type}(Yes) ${fun.sg.type}Msg(${fun.sg.message})`;
        break;
      }
    }
    f += `) `;
  }
  if (!fun.ss) {
    fun.ss = "";
  }
  if (device && fun.ss.indexOf("DV") < 0) {
    fun.ss += " DV(" + device + ") ";
  }
  // SS
  if (fun.ss) {
    f += `SS(${fun.ss.trim()}) `;
  }

  return f.trim();
};

/**
 * @param fun string
 * @returns fun object
 */
export const createFun = (
  fun: string,
  device: string,
  isDebugActive: boolean,
): Fun => {
  if (!fun) {
    return null;
  }
  fun = fun.trim();
  const initialFun = fun;
  const funObj: Fun = {};
  funObj.value = fun;
  // caso [Fu]
  funObj.type = FunType.UNK;
  const virtualFun: VirtualFun = { type: null, value: null };

  const parseType = () => {
    for (const key in VirtualFunType) {
      const type = VirtualFunType[key];
      if (fun.toUpperCase().indexOf(type) === 0) {
        virtualFun.type = type;
      }
    }
    try {
      if (virtualFun.type) {
        funObj.type = FunType.VIRTUAL;
      } else {
        if (fun.indexOf("(") > 0) {
          funObj.type = fun.substring(0, fun.indexOf("(")) as FunType;
        }
      }
    } catch (error) {
      throw new FunParserException("F(...) incorrect format", fun);
    }
  };

  const parseF = () => {
    const f = parseBetweenBrackets(funObj.type, fun);
    if (f) {
      const splitted = f.split(";");
      if (splitted.length === 3) {
        funObj.component = splitted[0];
        funObj.service = splitted[1];
        funObj.method = splitted[2];
        fun = fun.replace(`${funObj.type}(${f})`, "");
        funObj.isVoid = funObj.component === "FBK";
        funObj.isInternalSevice =
          funObj.service?.startsWith("JA_") ||
          funObj.service?.startsWith("JB_");
      } else {
        throw new FunParserException("F(...) incorrect format", fun);
      }
    }
  };

  const parseObject = (objectNumber: string, value: string) => {
    const splitted = value.split(";");
    if (splitted.length === 3) {
      funObj[`obj${objectNumber}`] = {
        t: splitted[0],
        p: splitted[1],
        k: splitted[2],
      };
      fun = fun.replace(`${objectNumber}(${value})`, "");
    } else {
      throw new FunParserException(
        `Object ${objectNumber} incorrect format`,
        fun,
      );
    }
  };

  const parseObjects = () => {
    for (let i = 1; i < 7; i++) {
      const smeupObject = parseBetweenBrackets(" " + i.toString(), fun);
      if (smeupObject) {
        parseObject(i.toString(), smeupObject);
      }
    }
  };

  const parseP = () => {
    funObj.p = parseBetweenBrackets("P", fun);
    if (funObj.p) {
      fun = fun.replace(`P(${funObj.p})`, "");
    }
  };

  const parseInput = () => {
    funObj.input = parseBetweenBrackets("INPUT", fun);
    if (funObj.input) {
      fun = fun.replace(`INPUT(${funObj.input})`, "");
    }
  };

  const parseNotify = () => {
    funObj.notify = parseBetweenBrackets("NOTIFY", fun);
    if (funObj.notify) {
      fun = fun.replace(`NOTIFY(${funObj.notify})`, "");
    }
  };

  const parseG = () => {
    funObj.g = parseBetweenBrackets("G", fun);
    if (funObj.g) {
      fun = fun.replace(`G(${funObj.g})`, "");
    }
  };

  const parseSS = () => {
    funObj.ss = parseBetweenBrackets("SS", fun);
    if (funObj.ss) {
      fun = fun.replace(`SS(${funObj.ss})`, "");
    }
  };

  const parseSG = () => {
    const sgStr = parseBetweenBrackets("SG", fun);
    if (sgStr) {
      fun = fun.replace(`SG(${sgStr})`, "");
    } else {
      return;
    }

    const askConfirm = parseBetweenBrackets(SGType.AskConf, sgStr);
    if (askConfirm && askConfirm.trim().toLowerCase() == "yes") {
      funObj.sg = {
        type: SGType.AskConf,
        message: parseBetweenBrackets(SGType.AskConf + "Msg", sgStr),
      };
    }

    // const simpleAlert = parseBetweenBrackets(SGType.SimpleAlert, sgStr);
    // if (simpleAlert && simpleAlert.trim().toLowerCase() == "yes") {
    //   funObj.sg = {
    //     type: SGType.SimpleAlert,
    //     message: parseBetweenBrackets(SGType.SimpleAlert + "Msg", sgStr),
    //   };
    // }
  };

  const parseVF = () => {
    virtualFun.value = parseBetweenBrackets(virtualFun.type, fun);
    funObj.virtualFun = virtualFun;
  };

  parseType();
  if (virtualFun.type) {
    parseVF();
  } else {
    parseF();
  }
  parseP();
  parseInput();
  parseObjects();
  parseNotify();
  parseSG();
  parseG();
  parseSS();

  funObj.toString = (): string => {
    return funToString(funObj, device);
  };

  if (fun.trim()) {
    logWarning(
      "createFun remainder of fun [" +
        fun +
        "] initialFun [" +
        initialFun +
        "] funObj.toString() [" +
        funObj.toString() +
        "]",
      "funUtils.ts",
      null,
      isDebugActive,
    );
  }
  return funObj;
};
