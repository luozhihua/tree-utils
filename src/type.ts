type TreeNodeWithKey<K extends string, V = string> = {
  [P in K]: V;
}

type TreeNodeWithChildren<K extends string, C extends string, NodeProps> = {
  [P in C]?: TreeNode<NodeProps, K, C>[];
}

export type TreeNode<
    NodeProps = { [k: string]: any; },
    KeyField extends string = 'key',
    ChildrenField extends string = 'children'
  > =
        TreeNodeWithKey      < KeyField >
      & TreeNodeWithChildren < KeyField, ChildrenField, NodeProps >
      & NodeProps;

export type NodesFinder<Node> = (node: Node, parents: Node[]) => boolean;
export type NodeSorter<Node> = (nodeA: Node, nodeB: Node, parents?: Node[]) => number;
export type NodeMapper<Node> = (node: Node, parents?: Node[]) => Node;
