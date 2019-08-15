import { TreeNode, NodesFinderPredicate, NodeSorter, NodeMapper, } from './type';

export default class TreeUtils<KeyField extends string = 'key', ChildrenField extends string = 'children', Props = {[k: string]: any}> {

  private keyField: KeyField;
  private childrenField: ChildrenField;

  constructor(keyField?: KeyField, childrenField?: ChildrenField) {
    this.keyField = <KeyField>keyField;
    this.childrenField = <ChildrenField>childrenField;

    // type Node = TreeNode<KeyField, ChildrenField, Props>
  }

  hasChildren(nodeData: TreeNode<KeyField, ChildrenField, Props>): boolean {
    const children = nodeData[this.childrenField];

    return !!children && children.length > 0;
  }

  isBranch(nodeData: TreeNode<KeyField, ChildrenField, Props>): boolean {
    const children = nodeData[this.childrenField];

    return !!children && children.length >= 0;
  }

  getNodeByKey(nodes: TreeNode<KeyField, ChildrenField, Props>[], key: string): TreeNode<KeyField, ChildrenField, Props> | null {
    let found: TreeNode<KeyField, ChildrenField, Props> | null = null;
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

  findNodes(
    nodes: TreeNode<KeyField, ChildrenField, Props>[],
    predicate: NodesFinderPredicate<TreeNode<KeyField, ChildrenField, Props>>,
    parents: TreeNode<KeyField, ChildrenField, Props>[] = []
  ): TreeNode<KeyField, ChildrenField, Props>[] {
    let found: TreeNode<KeyField, ChildrenField, Props>[] = [];

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

  filterNode(
    node: TreeNode<KeyField, ChildrenField, Props>,
    predicate: NodesFinderPredicate<TreeNode<KeyField, ChildrenField, Props>>,
    parents: TreeNode<KeyField, ChildrenField, Props>[] = []
  ): TreeNode<KeyField, ChildrenField, Props> | null {
    let res: TreeNode<KeyField, ChildrenField, Props> | null = null;

    const filteredChildren = this.isBranch(node) ? node[this.childrenField].map((childNode) =>
        this.filterNode(childNode, predicate, [...parents, node])).filter(i => i !== null) : null;

    const hasChildrenMatched = filteredChildren && filteredChildren.length > 0;
    const isNodeItselfMatched = predicate(node, parents);

    if (isNodeItselfMatched || hasChildrenMatched) {
      const childrenData = filteredChildren ? { [this.childrenField]: filteredChildren } : {};
      res = Object.assign({}, node, childrenData);
    }

    return res;
  }

  filterNodes(
    nodes: TreeNode<KeyField, ChildrenField, Props>[],
    predicate: NodesFinderPredicate<TreeNode<KeyField, ChildrenField, Props>>,
    parents: TreeNode<KeyField, ChildrenField, Props>[] = []
  ): TreeNode<KeyField, ChildrenField, Props>[] {
    let result: any = nodes
      .map(node => this.filterNode(node, predicate, parents))
      .filter(i => i !== null);

    return result as TreeNode<KeyField, ChildrenField, Props>[];
  }

  sortNode(
    node: TreeNode<KeyField, ChildrenField, Props>,
    compareFunction: NodeSorter<TreeNode<KeyField, ChildrenField, Props>>,
    parents: TreeNode<KeyField, ChildrenField, Props>[] = []
  ): TreeNode<KeyField, ChildrenField, Props> {
    if (this.hasChildren(node)) {
      const children = ([...node[this.childrenField]] as TreeNode<KeyField, ChildrenField, Props>[])
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

  sortNodes(
    nodes: TreeNode<KeyField, ChildrenField, Props>[],
    compareFunction: NodeSorter<TreeNode<KeyField, ChildrenField, Props>>,
    parents: TreeNode<KeyField, ChildrenField, Props>[] = []
  ): TreeNode<KeyField, ChildrenField, Props>[] {
    return nodes.sort((a, b) => compareFunction(a, b, parents)).map(
      node => this.sortNode(node, compareFunction, parents));
  }

  mapNode(
    node: TreeNode<KeyField, ChildrenField, Props>,
    mapFunction: NodeMapper<TreeNode<KeyField, ChildrenField, Props>>,
    parents: TreeNode<KeyField, ChildrenField, Props>[] = []
  ): TreeNode<KeyField, ChildrenField, Props> {
  // mapNode(node, mapFunction, parents = []) {
    const mappedNode: TreeNode<KeyField, ChildrenField, Props> = mapFunction({ ...node }, parents);

    if (this.hasChildren(node)) {
      const children = node[this.childrenField]
        .map(n => this.mapNode(n, mapFunction, [...parents, mappedNode]));

      mappedNode[this.childrenField] = children as any;
    }

    return mappedNode;
  }

  mapNodes(
    nodes: TreeNode<KeyField, ChildrenField, Props>[],
    mapFunction: NodeMapper<TreeNode<KeyField, ChildrenField, Props>>,
    parents: TreeNode<KeyField, ChildrenField, Props>[] = []
  ): TreeNode<KeyField, ChildrenField, Props>[] {
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
