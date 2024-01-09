import { SmeupDataStructureType } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupDataStructure";
import { SmeupLayout } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupLayout";
import { SmeupTable } from "../../../../../../managers/converters-manager/declarations/data-structures/smeupTable";

export const createSimpleTable = (): SmeupTable => {
  return {
    columns: [
      {
        code: "XXDAT1",
        grp: "GLUN(08)",
        lun: "08",
        canonicalForm: "D8;*YYMD",
        IO: "O",
        tooltip: false,
        text: "Data",
        sortMode: "A",
        ogg: "D8*YYMD",
      },
      {
        code: "XXDESC",
        grp: "GLUN(15)",
        lun: "15",
        IO: "H",
        tooltip: false,
        text: "Descrizione",
        sortMode: "A",
        ogg: "",
      },
    ],
    messages: [],
    type: SmeupDataStructureType.SMEUP_TABLE,
    rows: [
      {
        fields: {
          RowId: {
            name: "RowId",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "0",
            },
          },
          XXDESC: {
            name: "XXDESC",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "44",
            },
          },
          XXDAT1: {
            name: "XXDAT1",
            tooltip: false,
            smeupObject: {
              tipo: "D8",
              parametro: "*YYMD",
              codice: "20220120",
            },
          },
          ID: {
            name: "ID",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "1",
            },
          },
        },
      },
      {
        fields: {
          RowId: {
            name: "RowId",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "1",
            },
          },
          XXDESC: {
            name: "XXDESC",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "43",
            },
          },
          XXDAT1: {
            name: "XXDAT1",
            tooltip: false,
            smeupObject: {
              tipo: "D8",
              parametro: "*YYMD",
              codice: "20220121",
            },
          },
          ID: {
            name: "ID",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "2",
            },
          },
        },
      },
      {
        fields: {
          RowId: {
            name: "RowId",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "2",
            },
          },
          XXDESC: {
            name: "XXDESC",
            tooltip: false,
            smeupObject: {
              tipo: "",
              parametro: "",
              codice: "55",
            },
          },
          XXDAT1: {
            name: "XXDAT1",
            tooltip: false,
            smeupObject: {
              tipo: "D8",
              parametro: "*YYMD",
              codice: "20220122",
            },
          },
          ID: {
            name: "ID",
            tooltip: false,
            smeupObject: {
              tipo: "NR",
              parametro: "",
              codice: "3",
            },
          },
        },
      },
    ],
  };
};

export const createSimpleLayout = (): SmeupLayout => {
  return {
    fmts: [
      {
        attributes: {
          Lib: "OJ;*LIB;SMEDEV",
          Scheda: "MB;SCP_LAY;WETEST_0A8",
        },
        sections: [
          {
            attributes: {
              Left: "50%",
              Pos: "A",
              Dim: "50%",
              Nam: "SA",
            },
            sections: [],
            fields: [
              {
                attributes: {
                  Cmp: "Img",
                  Nam: "V£COM",
                },
              },
            ],
          },
          {
            attributes: {
              Txt: "Dati",
              Pos: "B",
              Dim: "Auto",
              Nam: "SB",
            },
            sections: [
              {
                attributes: {
                  Top: "20%",
                  Pos: "B1",
                  Dim: "20%",
                  Nam: "SB1",
                },
                sections: [
                  {
                    attributes: {
                      Left: "50%",
                      Pos: "B1A",
                      Dim: "50%",
                      Nam: "SB1A",
                    },
                    sections: [],
                    fields: [
                      {
                        attributes: {
                          Nam: "FORN",
                        },
                      },
                    ],
                  },
                  {
                    attributes: {
                      Pos: "B1B",
                      Dim: "Auto",
                      Nam: "SB1B",
                    },
                    sections: [],
                    fields: [
                      {
                        attributes: {
                          Nam: "CLIE",
                        },
                      },
                    ],
                  },
                ],
                fields: [],
              },
              {
                attributes: {
                  Pos: "B2",
                  Dim: "Auto",
                  Nam: "SB2",
                },
                sections: [],
                fields: [
                  {
                    attributes: {
                      Cmp: "Mem",
                      Nam: "V£DESC",
                    },
                  },
                ],
              },
            ],
            fields: [],
          },
        ],
      },
    ],
  } as any as SmeupLayout;
};

export const createCustomLayoutSimpleTable = (): SmeupTable => {
  return {
    setup: {
      context: "B£SER_46\\WRK.SCP\\WETEST_BOXBOX_019",
      isUsersSetupDisabled: true,
      setupAsXML: {
        EXB: '<EXB><UserSetups Exist="No"></UserSetups></EXB>',
      },
      setupEntriesByComponent: {},
      title: "",
    },
    type: SmeupDataStructureType.SMEUP_TABLE,
    messages: [],
    columns: [
      {
        IO: "C",
        canonicalForm: "TA;AGE",
        code: "AGEN",
        eTxt: "A",
        grp: "GLUN(15)",
        lun: "15",
        ogg: "TAAGE",
        sortMode: "A",
        text: "Agenti",
        tooltip: true,
      },
      {
        IO: "C",
        canonicalForm: "CN;CLI",
        code: "CLIE",
        eTxt: "A",
        grp: "GLUN(15)",
        lun: "15",
        ogg: "CNCLI",
        sortMode: "A",
        text: "Cliente",
        tooltip: true,
      },
      {
        IO: "B",
        canonicalForm: "CN;FOR",
        code: "FORN",
        eTxt: "A",
        grp: "GLUN(15)",
        lun: "15",
        ogg: "CNFOR",
        sortMode: "A",
        text: "Fornitori",
        tooltip: true,
      },
      {
        IO: "B",
        canonicalForm: "CM;",
        code: "V£COM",
        eTxt: "B",
        grp: "GLUN(12)",
        lun: "12",
        ogg: "CM",
        sortMode: "A",
        text: "Commessa",
        tooltip: true,
      },
      {
        IO: "B",
        canonicalForm: "I1;2",
        code: "V£ORA",
        dpy: "R",
        eTxt: "C",
        grp: "GLUN(08)",
        lun: "08",
        ogg: "I12",
        sortMode: "A",
        text: "Ora",
        tooltip: true,
      },
      {
        IO: "B",
        canonicalForm: "D8;*YYMD",
        code: "V£DATA",
        dpy: "R",
        eTxt: "C",
        grp: "GLUN(08)",
        lun: "08",
        ogg: "D8*YYMD",
        sortMode: "A",
        text: "Data",
        tooltip: true,
      },
      {
        IO: "B",
        code: "V£DESC",
        eTxt: "D",
        grp: "GLUN(300)",
        lun: "300",
        ogg: "",
        sortMode: "A",
        text: "Descrizione",
        tooltip: false,
      },
    ],
    rows: [
      {
        fields: {
          AGEN: {
            name: "AGEN",
            smeupObject: {
              codice: "",
              parametro: "AGE",
              testo: "",
              tipo: "TA",
            },
            tooltip: false,
          },
          "V£COM": {
            name: "V£COM",
            smeupObject: {
              codice: "SMEWW.009",
              parametro: "",
              tipo: "CM",
            },
            tooltip: false,
          },
          FORN: {
            name: "FORN",
            smeupObject: {
              codice: "000000",
              parametro: "FOR",
              tipo: "CN",
            },
            tooltip: false,
          },
          "V£ORA": {
            name: "V£ORA",
            smeupObject: {
              codice: "100000",
              parametro: "2",
              tipo: "I1",
            },
            tooltip: false,
          },
          "V£DESC": {
            name: "V£DESC",
            smeupObject: {
              codice: "Guarda il mare quanto e' bello",
              parametro: "",
              tipo: "",
            },
            tooltip: false,
          },
          CLIE: {
            name: "CLIE",
            smeupObject: {
              codice: "100001",
              parametro: "CLI",
              tipo: "CN",
            },
            tooltip: false,
          },
          ID: {
            name: "ID",
            smeupObject: {
              codice: "1",
              parametro: "",
              tipo: "NR",
            },
            tooltip: false,
          },
          "V£DATA": {
            name: "V£DATA",
            smeupObject: {
              codice: "20170227",
              parametro: "*YYMD",
              tipo: "D8",
            },
            tooltip: false,
          },
        },
      },
    ],
    uiPopup: {
      smeupTreeNode: {
        type: "SmeupTreeNode",
        children: [],
        columns: [],
        row: {
          fields: {},
        },
      },
    },
  } as any as SmeupTable;
};
