import { KupTree } from "@sme.up/ketchup-react";
import {
  KupTreeDynamicMassExpansionEventPayload,
  KupTreeNodeButtonClickEventPayload,
  KupTreeNodeCollapseEventPayload,
  KupTreeNodeExpandEventPayload,
  KupTreeNodeSelectedEventPayload,
  TreeNodePath,
} from "@sme.up/ketchup/dist/types/components/kup-tree/kup-tree-declarations";
import {
  KupDataColumn,
  KupDataNode,
} from "@sme.up/ketchup/dist/types/managers/kup-data/kup-data-declarations";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useKupManager from "../../../composable/useKupManager";
import {
  RawComponent,
  Shapes,
  Tree,
} from "../../../declarations/componentDeclarations";
import { DynamismEvents } from "../../../declarations/dynamismDeclarations";
import { executeTreeNodeDynamism } from "../../../managers/dynamismManager";
import { executeExpand } from "../../../managers/treeManager";
import {
  getComponentById,
  isBackActionForComponent,
  isNotifyForComponent,
  resetNotifyFlagForComponent,
} from "../../../store/reduces/components";
import { RootState, store } from "../../../store/store";
import {
  findNodePathByIndex,
  findNodePathByName,
} from "../../../utils/components/tre";
import {
  getComponentOptions,
  preElabComponent,
} from "../../../utils/componentUtils";
import { getClassNames, getTitleTag } from "../../utils";
import {
  TreeNodeExt,
  TreeOptions,
} from "../../../managers/converters-manager/converters/components/smeup/tre/tree";
import { isYes } from "../../../managers/converters-manager/utils/smeupDataStructuresUtilities";
import { logInfo } from "../../../utils/logger";

/* global HTMLKupTreeElement */

type Props = {
  rawComponent: RawComponent;
};

const Tre: React.FC<Props> = props => {
  const tree = useSelector((state: RootState) =>
    getComponentById(state, props.rawComponent.id),
  ) as Tree;
  const treeRef: React.RefObject<HTMLKupTreeElement> = useRef(null);
  const dispatch = useDispatch();
  const kupManager = useKupManager();
  const preElabOk = useRef(false);
  const firstCall = useRef(true);

  const isBackActionForComponentRef = useRef(
    isBackActionForComponent(store.getState(), props.rawComponent.id),
  );

  const onNodeDynamicExpansion = (
    event: CustomEvent<KupTreeDynamicMassExpansionEventPayload>,
  ) => {
    logInfo("onNodeDynamicExpansion", "tre.tsx", [event]);
  };

  const onDidLoad = () => {
    const treeOptions: TreeOptions = getComponentOptions(
      Shapes.TRE,
      tree.options,
    ) as TreeOptions;
    let emitEvent = !isBackActionForComponentRef.current;
    if (isNotifyForComponent(store.getState(), tree.id)) {
      emitEvent = true;
      dispatch(resetNotifyFlagForComponent({ id: tree.id }));
    }
    logInfo("onDidLoad emitEvent[" + emitEvent + "]", "tre.tsx");

    // SelFirst: select first node
    if (isYes(treeOptions?.SelFirst)) {
      treeRef.current.setSelectedNode("0", emitEvent);
    }
    // SelName: select node by name
    if (treeOptions?.SelName) {
      const treeNodePath = findNodePathByName(tree.data, treeOptions?.SelName);
      treeRef.current.setSelectedNode(treeNodePath.toString(), emitEvent);
    }
    // SelItem: select node by index
    if (treeOptions?.SelItem) {
      const treeNodePath = findNodePathByIndex(tree.data, treeOptions?.SelItem);
      treeRef.current.setSelectedNode(treeNodePath.toString(), emitEvent);
    }
    // ClickItem: select node by index
    if (treeOptions?.ClickItem) {
      const treeNodePath = findNodePathByIndex(
        tree.data,
        parseInt(treeOptions?.ClickItem),
      );
      treeRef.current.setSelectedNode(treeNodePath.toString(), emitEvent);
    }
  };

  const onNodeDblclick = (
    event: CustomEvent<KupTreeNodeCollapseEventPayload>,
  ) => {
    const node: KupDataNode = event.detail.treeNode;
    executeTreeNodeDynamism(
      tree.id,
      tree.schedaId,
      null,
      tree.columns,
      node,
      tree.dynamisms,
      DynamismEvents.DBLCLICK,
      kupManager,
      dispatch,
    );
  };

  const onNodeCollapse = (
    event: CustomEvent<KupTreeNodeCollapseEventPayload>,
  ) => {
    logInfo("nodeCollapse", "tre.tsx", [event]);
  };

  const onNodeExpand = (event: CustomEvent<KupTreeNodeExpandEventPayload>) => {
    const node = event.detail.treeNode as TreeNodeExt;
    const treeNodePath: TreeNodePath = event.detail.treeNodePath;

    executeTreeNodeDynamism(
      tree.id,
      tree.schedaId,
      null,
      tree.columns,
      node,
      tree.dynamisms,
      DynamismEvents.EXPAND,
      kupManager,
      dispatch,
    );

    executeExpand(tree, node, treeNodePath, dispatch);
  };

  const onButtonClick = (
    event: CustomEvent<KupTreeNodeButtonClickEventPayload>,
  ) => {
    const column: KupDataColumn = event.detail.column;
    const node: KupDataNode = event.detail.treeNode;

    executeTreeNodeDynamism(
      tree.id,
      tree.schedaId,
      column,
      tree.columns,
      node,
      tree.dynamisms,
      DynamismEvents.CLICK,
      kupManager,
      dispatch,
    );
  };

  const onNodeSelected = (
    event: CustomEvent<KupTreeNodeSelectedEventPayload>,
  ) => {
    const columnName: string = event.detail.columnName;
    const node: KupDataNode = event.detail.treeNode;
    const columnArray = tree.columns
      ? kupManager.data.column.find(tree.columns, {
          name: columnName,
        })
      : [];
    executeTreeNodeDynamism(
      tree.id,
      tree.schedaId,
      columnArray && columnArray.length > 0 ? columnArray[0] : null,
      tree.columns,
      node,
      tree.dynamisms,
      DynamismEvents.CLICK,
      kupManager,
      dispatch,
    );
  };

  useEffect(() => {
    isBackActionForComponentRef.current = isBackActionForComponent(
      store.getState(),
      props.rawComponent.id,
    );

    async function buildComponent() {
      preElabOk.current = await preElabComponent(
        tree,
        props.rawComponent,
        Shapes.TRE,
        firstCall,
        dispatch,
        kupManager,
      );
    }
    buildComponent().then(() => {
      if (preElabOk.current == true && tree && tree.loaded && tree.data) {
        // event listeners
      }
    });
  });

  if (tree) {
    if (!tree.loaded) {
      // donothing
    } else {
      if (tree.data) {
        return (
          <>
            {getTitleTag(tree)}
            <KupTree
              class={getClassNames(
                getComponentOptions(Shapes.TRE, tree.options),
              )}
              {...tree.config}
              columns={tree.columns}
              id={tree.id}
              ref={treeRef}
              data={JSON.parse(JSON.stringify(tree.data))}
              onKup-tree-nodeselected={onNodeSelected}
              onKup-tree-buttonclick={onButtonClick}
              onKup-tree-nodeexpand={onNodeExpand}
              onKup-tree-nodecollapse={onNodeCollapse}
              onKup-tree-nodedblclick={onNodeDblclick}
              onKup-tree-dynamicmassexpansion={onNodeDynamicExpansion}
              onKup-tree-didload={onDidLoad}
            />
          </>
        );
      }
    }
  }
};

export default Tre;
