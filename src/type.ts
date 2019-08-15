type TreeNodeWithKey<K extends string, V = string> = {
  [P in K]: V;
}

type TreeNodeWithChildren<K extends string, C extends string, NodeProps> = {
  [P in C]?: TreeNode<K, C, NodeProps>[];
}

export type TreeNode< 
    KeyField extends string = 'key', 
    ChildrenField extends string = 'children', 
    NodeProps = { [k: string]: any; }
  > = 
        TreeNodeWithKey      < KeyField > 
      & TreeNodeWithChildren < KeyField, ChildrenField, NodeProps >
      & NodeProps;

export type NodesFinderPredicate<Node> = (node: Node, parents: Node[]) => boolean;
export type NodeSorter<Node> = (nodeA: Node, nodeB: Node, parents?: Node[]) => number;
export type NodeMapper<Node> = (node: Node, parents?: Node[]) => Node;