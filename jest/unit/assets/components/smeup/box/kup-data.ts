import { KupBoxData } from "@sme.up/ketchup/dist/types/components/kup-box/kup-box-declarations";

/**
 * SIMPLE KUP Box mock
 */
export const createSimpleKupBox = (): KupBoxData => {
  return {
    columns: [
      {
        name: "XXDAT1",
        obj: {
          k: "",
          p: "*YYMD",
          t: "D8",
        },
        title: "Data",
      },
      {
        name: "XXDESC",
        title: "Descrizione",
        visible: false,
      },
    ],
    rows: [
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220120",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-20",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "44",
              p: "",
              t: "",
            },
            value: "44",
          },
        },
        id: "1",
        layout: {
          sections: [
            {
              horizontal: true,
              sections: [
                {
                  sections: [
                    {
                      content: [
                        {
                          value: "Data",
                        },
                      ],
                    },
                    {
                      content: [
                        {
                          value: "Descrizione",
                        },
                      ],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      content: [
                        {
                          column: "XXDAT1",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    {
                      content: [
                        {
                          column: "XXDESC",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220121",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-21",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "43",
              p: "",
              t: "",
            },
            value: "43",
          },
        },
        id: "2",
        layout: {
          sections: [
            {
              horizontal: true,
              sections: [
                {
                  sections: [
                    {
                      content: [
                        {
                          value: "Data",
                        },
                      ],
                    },
                    {
                      content: [
                        {
                          value: "Descrizione",
                        },
                      ],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      content: [
                        {
                          column: "XXDAT1",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    {
                      content: [
                        {
                          column: "XXDESC",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220122",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-22",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "55",
              p: "",
              t: "",
            },
            value: "55",
          },
        },
        id: "3",
        layout: {
          sections: [
            {
              horizontal: true,
              sections: [
                {
                  sections: [
                    {
                      content: [
                        {
                          value: "Data",
                        },
                      ],
                    },
                    {
                      content: [
                        {
                          value: "Descrizione",
                        },
                      ],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      content: [
                        {
                          column: "XXDAT1",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                    {
                      content: [
                        {
                          column: "XXDESC",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  };
};
/**
 * SIMPLE KUP Box mock, with default layout, one column (XXDESC)
 */
export const createSimpleKupBoxWithDefaultLayout = (): KupBoxData => {
  return {
    columns: [
      {
        name: "XXDAT1",
        obj: {
          k: "",
          p: "*YYMD",
          t: "D8",
        },
        title: "Data",
      },
      {
        name: "XXDESC",
        title: "Descrizione",
        visible: false,
      },
    ],
    rows: [
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220120",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-20",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "44",
              p: "",
              t: "",
            },
            value: "44",
          },
        },
        id: "1",
        layout: {
          sections: [
            {
              horizontal: true,
              sections: [
                {
                  sections: [
                    {
                      content: [
                        {
                          value: "Descrizione",
                        },
                      ],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      content: [
                        {
                          column: "XXDESC",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220121",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-21",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "43",
              p: "",
              t: "",
            },
            value: "43",
          },
        },
        id: "2",
        layout: {
          sections: [
            {
              horizontal: true,
              sections: [
                {
                  sections: [
                    {
                      content: [
                        {
                          value: "Descrizione",
                        },
                      ],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      content: [
                        {
                          column: "XXDESC",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      {
        cells: {
          XXDAT1: {
            isEditable: false,
            obj: {
              k: "20220122",
              p: "*YYMD",
              t: "D8",
            },
            value: "2022-01-22",
          },
          XXDESC: {
            isEditable: false,
            obj: {
              k: "55",
              p: "",
              t: "",
            },
            value: "55",
          },
        },
        id: "3",
        layout: {
          sections: [
            {
              horizontal: true,
              sections: [
                {
                  sections: [
                    {
                      content: [
                        {
                          value: "Descrizione",
                        },
                      ],
                    },
                  ],
                },
                {
                  sections: [
                    {
                      content: [
                        {
                          column: "XXDESC",
                        },
                      ],
                      style: {
                        fontWeight: "bold",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  };
};
/**
 * SIMPLE KUP Box mock, with custom layout
 */
export const createSimpleKupBoxWithCustomLayout = (): KupBoxData => {
  return {
    columns: [
      {
        name: "AGEN",
        title: "Agenti",
        obj: {
          t: "TA",
          p: "AGE",
          k: "",
        },
      },
      {
        name: "CLIE",
        title: "Cliente",
        obj: {
          t: "CN",
          p: "CLI",
          k: "",
        },
      },
      {
        name: "FORN",
        title: "Fornitori",
        obj: {
          t: "CN",
          p: "FOR",
          k: "",
        },
      },
      {
        name: "V£COM",
        title: "Commessa",
        obj: {
          t: "CM",
          p: "",
          k: "",
        },
      },
      {
        name: "V£ORA",
        title: "Ora",
        obj: {
          t: "I1",
          p: "2",
          k: "",
        },
      },
      {
        name: "V£DATA",
        title: "Data",
        obj: {
          t: "D8",
          p: "*YYMD",
          k: "",
        },
      },
      {
        name: "V£DESC",
        title: "Descrizione",
      },
    ],
    rows: [
      {
        cells: {
          AGEN: {
            value: "",
            obj: {
              t: "TA",
              p: "AGE",
              k: "",
            },
            isEditable: false,
          },
          "V£COM": {
            value: "SMEWW.009",
            obj: {
              t: "CM",
              p: "",
              k: "SMEWW.009",
            },
            isEditable: false,
            cssClass: "",
          },
          FORN: {
            value: "000000",
            obj: {
              t: "CN",
              p: "FOR",
              k: "000000",
            },
            isEditable: false,
            cssClass: "",
          },
          "V£ORA": {
            value: "100000",
            obj: {
              t: "I1",
              p: "2",
              k: "100000",
            },
            isEditable: false,
          },
          "V£DESC": {
            value: "Guarda il mare quanto e' bello",
            obj: {
              t: "",
              p: "",
              k: "Guarda il mare quanto e' bello",
            },
            isEditable: false,
            cssClass: "",
          },
          CLIE: {
            value: "100001",
            obj: {
              t: "CN",
              p: "CLI",
              k: "100001",
            },
            isEditable: false,
            cssClass: "",
          },
          "V£DATA": {
            value: "2017-02-27",
            obj: {
              t: "D8",
              p: "*YYMD",
              k: "20170227",
            },
            isEditable: false,
          },
        },
        layout: {
          sections: [
            {
              horizontal: false,
              dim: "50%",
              content: [
                {
                  column: "V£COM",
                },
              ],
            },
            {
              horizontal: false,
              title: "Dati",
              sections: [
                {
                  horizontal: true,
                  sections: [
                    {
                      horizontal: false,
                      dim: "50%",
                      content: [
                        {
                          column: "FORN",
                        },
                      ],
                    },
                    {
                      horizontal: false,
                      content: [
                        {
                          column: "CLIE",
                        },
                      ],
                    },
                  ],
                },
                {
                  horizontal: false,
                  content: [
                    {
                      column: "V£DESC",
                    },
                  ],
                },
              ],
            },
          ],
          horizontal: true,
        },
      },
    ],
  };
};
