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

/**
 * A function for matching nodes.
 *
 * @function nodesFinder
 * @param {TreeNode} node
 * @param {TreeNode[]} parents
 * @returns {Boolean} return true if node is matched, or false if not matched;
 */
function nodesFinder(node, parents): boolean { return true; }
export type NodesFinder<Node> = (node: Node, parents: Node[]) => boolean;

/**
 * A function to sort node's children.
 *
 * @function nodeSorter
 * @param {TreeNode} nodeA
 * @param {TreeNode} nodeB
 * @param {TreeNode[]} parents
 * @returns {Boolean} return number [-1, 0, 1] for Array.sort;
 */
function nodeSorter(nodeA, nodeB, parents): number { return 0; }
export type NodeSorter<Node> = (nodeA: Node, nodeB: Node, parents?: Node[]) => number;

/**
 * A function to map node.
 *
 * @function nodeMapper
 * @param {TreeNode} node
 * @param {TreeNode[]} parents
 * @returns {TreeNode} return mapped node;
 */
function nodeMapper(node, parents) { }
export type NodeMapper<Node> = (node: Node, parents?: Node[]) => Node;
