import { TreeNode, NodesFinder, NodeSorter, NodeMapper, } from './type';

/**
 * Class Tree utils
 *
 * @export
 * @class TreeUtils
 * @template Props
 * @template KeyField
 * @template ChildrenField
 */
export default class TreeUtils<Props = {[k: string]: any}, KeyField extends string = 'key', ChildrenField extends string = 'children', > {

  private keyField: KeyField;
  private childrenField: ChildrenField;

  /**
   * Creates an instance of TreeUtils.
   * @param {KeyField} [keyField]
   * @param {ChildrenField} [childrenField]
   * @memberof TreeUtils
   */
  constructor(keyField?: KeyField, childrenField?: ChildrenField) {
    this.keyField = <KeyField>keyField || <KeyField>'key';
    this.childrenField = <ChildrenField>childrenField || <ChildrenField>'children';

    // type Node = TreeNode<Props, KeyField, ChildrenField>
  }

  /**
   * Checks if a node contains children.
   *
   * @param {TreeNode} node
   * @returns {boolean}
   * @memberof TreeUtils
   */
  hasChildren(node: TreeNode<Props, KeyField, ChildrenField>): boolean {
    const children = node[this.childrenField];

    return !!children && children.length > 0;
  }

  /**
   * Checks if a node has children property (whether the children's length is 0 or not)
   *
   * @param {TreeNode} node
   * @returns {boolean}
   * @memberof TreeUtils
   */
  isBranch(node: TreeNode<Props, KeyField, ChildrenField>): boolean {
    const children = node[this.childrenField];

    return !!children && children.length >= 0;
  }

  /**
   * Get single node with a specific key.
   *
   * @param {TreeNode[]} nodes
   * @param {string} key
   * @returns {TreeNode | null}
   * @memberof TreeUtils
   */
  getNodeByKey(nodes: TreeNode<Props, KeyField, ChildrenField>[], key: string): TreeNode<Props, KeyField, ChildrenField> | null {
    let found: TreeNode<Props, KeyField, ChildrenField> | null = null;
    const self = this;

    for (const node of nodes) {
      if (node[this.keyField] === key) {
        found = node;
      } else if (this.hasChildren(node)) {
        found = this.getNodeByKey(node[this.childrenField], key);
      }

      if (found) {
        break;
      }
    }

    return found;
  }

  /**
   * Find nodes via a custom function.
   *
   * @param {TreeNode[]} nodes
   * @param {NodesFinder<TreeNode>} predicate
   * @param {TreeNode[]} [parents=[]]
   * @returns {TreeNode[]}
   * @memberof TreeUtils
   */
  findNodes(
    nodes: TreeNode<Props, KeyField, ChildrenField>[],
    predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>,
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    let found: TreeNode<Props, KeyField, ChildrenField>[] = [];

    for (const node of nodes) {
      if (predicate(node, parents)) {
        found = [...found, node];
      }

      if (this.hasChildren(node)) {
        const foundChildren = this.findNodes(node[this.childrenField], predicate, [...parents, node]);
        found = [...found, ...foundChildren];
      }
    }

    return found;
  }

  /**
   * Filter for a single node and its children.
   *
   * @param {TreeNode} node
   * @param {NodesFinder<TreeNode>} predicate
   * @param {TreeNode[]} [parents=[]]
   * @returns {(TreeNode | null)}
   * @memberof TreeUtils
   */
  filterNode(
    node: TreeNode<Props, KeyField, ChildrenField>,
    predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>,
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField> | null {
    let res: TreeNode<Props, KeyField, ChildrenField> | null = null;
    const filteredChildren = this.isBranch(node)
      ? node[this.childrenField]
          .map((childNode) => this.filterNode(childNode, predicate, [...parents, node]))
          .filter(i => i !== null)
      : null;
    const hasChildren = filteredChildren && filteredChildren.length > 0;
    const isNodeItself = predicate(node, parents);

    if (isNodeItself || hasChildren) {
      const childrenData = filteredChildren ? { [this.childrenField]: filteredChildren } : {};
      res = Object.assign({}, node, childrenData);
    }

    return res;
  }

  /**
   * Filter the given list of nodes and their children.
   *
   * @param {TreeNode[]} nodes
   * @param {NodesFinder<TreeNode>} predicate
   * @param {TreeNode[]} [parents=[]]
   * @returns {TreeNode[]}
   * @memberof TreeUtils
   */
  filterNodes(
    nodes: TreeNode<Props, KeyField, ChildrenField>[],
    predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>,
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    let result: any = nodes
      .map(node => this.filterNode(node, predicate, parents))
      .filter(i => i !== null);

    return result as TreeNode<Props, KeyField, ChildrenField>[];
  }

  /**
   * Sort children of givin node and return a new node with sorted children.
   *
   * @param {TreeNode} node
   * @param {NodeSorter<TreeNode>} compareFunction
   * @param {TreeNode[]} [parents=[]]
   * @returns {TreeNode}
   * @memberof TreeUtils
   */
  sortNode(
    node: TreeNode<Props, KeyField, ChildrenField>,
    compareFunction: NodeSorter<TreeNode<Props, KeyField, ChildrenField>>,
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField> {
    if (this.hasChildren(node)) {
      const children = ([...node[this.childrenField]] as TreeNode<Props, KeyField, ChildrenField>[])
        .sort((a, b) => compareFunction(a, b, [...parents, node]))
        .map(childNode => this.sortNode(
          childNode,
          compareFunction,
          [...parents, node, childNode]
        ));
      return { ...node, [this.childrenField]: children };
    }

    return node;
  }

  /**
   * Sort node list and their children.
   *
   * @param {TreeNode[]} nodes
   * @param {NodeSorter<TreeNode>} compareFunction
   * @param {TreeNode[]} [parents=[]]
   * @returns {TreeNode[]}
   * @memberof TreeUtils
   */
  sortNodes(
    nodes: TreeNode<Props, KeyField, ChildrenField>[],
    compareFunction: NodeSorter<TreeNode<Props, KeyField, ChildrenField>>,
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    return nodes.sort((a, b) => compareFunction(a, b, parents)).map(
      node => this.sortNode(node, compareFunction, parents));
  }

  /**
   * Map node
   *
   * @param {TreeNode} node
   * @param {NodeMapper<TreeNode>} mapFunction
   * @param {TreeNode[]} [parents=[]]
   * @returns {TreeNode}
   * @memberof TreeUtils
   */
  mapNode(
    node: TreeNode<Props, KeyField, ChildrenField>,
    mapFunction: NodeMapper<TreeNode<Props, KeyField, ChildrenField>>,
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField> {
  // mapNode(node, mapFunction, parents = []) {
    const mappedNode: TreeNode<Props, KeyField, ChildrenField> = mapFunction({ ...node }, parents);

    if (this.hasChildren(node)) {
      const children = node[this.childrenField]
        .map(n => this.mapNode(n, mapFunction, [...parents, mappedNode]));

      mappedNode[this.childrenField] = children as any;
    }

    return mappedNode;
  }

  mapNodes(
    nodes: TreeNode<Props, KeyField, ChildrenField>[],
    mapFunction: NodeMapper<TreeNode<Props, KeyField, ChildrenField>>,
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    return nodes.map(node => this.mapNode(node, mapFunction, parents));
  }

  // renameChildrenFieldForNode(node, newChildrenField) {
  //   const self = this;
  //   const children = node[this.childrenField];
  //   const newNode = { ...node };

  //   if (this.hasChildren(node)) {
  //     delete newNode[this.childrenField];
  //     newNode[newChildrenField] = children
  //       .map(n => this.renameChildrenFieldForNode(n, newChildrenField));
  //   }

  //   return newNode;
  // }

  // renameChildrenFieldForNodes(nodes, newChildrenField) {
  //   return nodes.map(node => this.renameChildrenFieldForNode(node, newChildrenField));
  // }
}
