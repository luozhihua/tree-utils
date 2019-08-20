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
  private nodes: TreeNode<Props, KeyField, ChildrenField>[];
  private cache: {[P in KeyField]?: TreeNode<Props, KeyField, ChildrenField>} = {};

  /**
   * Creates an instance of TreeUtils.
   * @param {KeyField} [keyField]
   * @param {ChildrenField} [childrenField]
   * @memberof TreeUtils
   */
  constructor(nodes: TreeNode<Props, KeyField, ChildrenField>[], keyField?: KeyField, childrenField?: ChildrenField) {
    this.nodes = nodes;
    this.keyField = <KeyField>keyField || <KeyField>'key';
    this.childrenField = <ChildrenField>childrenField || <ChildrenField>'children';

    this.buildCache();
  }

  toJSON(): TreeNode<Props, KeyField, ChildrenField>[] { return JSON.parse(JSON.stringify(this.nodes)); }
  toString(indent: number = 4) { return JSON.stringify(this.nodes, [], indent); }
  private buildCache() {
    this.walker((node, index, level) => {
      let key: string = node[this.keyField];
      this.cache[key] = node;
    });
  }

  /**
   * Touch every node in tree.
   *
   * @param {Function} iterator (node, index, level) => void; If return true and breakable if true will break traversing.
   * @param {(Node[] | null)} [nodes='null'] Nodes to traversing, defaults is root nodes of the tree.
   * @param {('depth' | 'breadth')} [mode='depth'] Indicates depth-first or breadth-first priority when traversing.
   * @param {boolean} [breakable=false] Break traversing when iterator return true;
   */
  walker(
    iterator: (
      node: TreeNode<Props, KeyField, ChildrenField>,
      index: number,
      parent: TreeNode<Props, KeyField, ChildrenField> | undefined,
      level: number,
    ) => boolean | void,
    nodes: TreeNode<Props, KeyField, ChildrenField>[] | null = null,
    mode: 'depth' | 'breadth' = 'depth',
    breakable: boolean = false,
    __parent?: TreeNode<Props, KeyField, ChildrenField>,
    __level: number = 0,
  ) {
    nodes = nodes || this.nodes;

    let breakFlag;
    let found = nodes.some((node, index: number) => {
      breakFlag = iterator(node, index, __parent, __level);
      if (mode === 'depth' && !breakFlag && this.hasChildren(node)) {
        breakFlag = this.walker(iterator, node[this.childrenField], mode, breakable, node, __level + 1);
      }
      return breakFlag;
    });

    if (mode === 'breadth' && (!breakable || !found)) {
      found = nodes.some((node, index: number) => {
        if (this.hasChildren(node)) {
          breakFlag = this.walker(iterator, node[this.childrenField], mode, breakable, node, __level + 1);
          return breakFlag;
        }
      });
    }

    if (breakable) {
      return !!found;
    }
  }

  /**
   * Checks if a node contains children.
   *
   * @param {TreeNode | String} nodeOrKey
   * @returns {boolean}
   * @memberof TreeUtils
   */
  hasChildren(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): boolean {
    const node = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;

    if (!node) {
      return false;
    }

    const children = node[this.childrenField];
    return !!children && children.length > 0;
  }

  /**
   * Checks if a node has children property (whether the children's length is 0 or not)
   *
   * @param {TreeNode | String} nodeOrKey
   * @returns {boolean}
   * @memberof TreeUtils
   */
  isBranch(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): boolean {
    const node = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;

    if (!node) {
      return false;
    }

    const children = node[this.childrenField];
    return !!children && children.length >= 0;
  }

  /**
   * Get single node with a specific key.
   *
   * @param {string} key
   * @returns {TreeNode | null}
   * @memberof TreeUtils
   */
  getNode(key: string): TreeNode<Props, KeyField, ChildrenField> | null {
    return this.cache[key] || null;
  }

  /**
   * Checks if a node contains another node as children.
   *
   * @param {string | TreeNode} parent Parent node or key of parent node.
   * @param {string | TreeNode} child Child node or key of child node.
   * @returns {boolean}
   * @memberof TreeUtils
   */
  contains(
    parent: string | TreeNode<Props, KeyField, ChildrenField>,
    child: string | TreeNode<Props, KeyField, ChildrenField>
  ): boolean {
    let result = false;
    let parentNode = typeof parent === 'string' ? this.getNode(parent as string) : parent;
    let childNode = typeof child === 'string' ? this.getNode(child as string) : child;

    if (parentNode && childNode && this.hasChildren(parentNode)) {
      parentNode[this.childrenField].some(child => {
        if (childNode && child[this.keyField] === childNode[this.keyField]) {
          result = true;
          return true;
        } else {
          return false;
        }
      });
    }

    return result;
  }

  /**
   * Checks if a node contains another node as children.
   *
   * @param {string | TreeNode} parent Parent node or key of parent node.
   * @param {string | TreeNode} child Child node or key of child node.
   * @returns {boolean}
   * @memberof TreeUtils
   */
  containsDeeply(
    parent: string | TreeNode<Props, KeyField, ChildrenField>,
    child: string | TreeNode<Props, KeyField, ChildrenField>
  ): boolean {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let result = false;
    let parentNode: Node | null = typeof parent === 'string' ? this.getNode(parent as string) : parent;
    let childNode: Node | null = typeof child === 'string' ? this.getNode(child as string) : child;

    if (parentNode && childNode && this.hasChildren(parentNode)) {
      const iterator = (node: Node) => {
        if (childNode && node[this.keyField] === childNode[this.keyField]) {
          result = true;
          return true;
        }
      };
      this.walker(iterator, parentNode[this.childrenField], 'depth', true);
    }

    return result;
  }

  /**
   * Get parent node of given key.
   *
   * @param {string} key node key.
   * @param {TreeNode[]} [nodes] Tree root nodes or specific nodes.
   * @memberof TreeUtils
   * @returns {TreeNode | null} return parent node of given key.
   */
  getParent(
    keyOrNode: string | TreeNode<Props, KeyField, ChildrenField>
  ): TreeNode<Props, KeyField, ChildrenField> | null {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let subNode: Node | null = typeof keyOrNode === 'string' ? this.getNode(keyOrNode as string) : keyOrNode;
    let parent: Node | null = null;
    let KEY = this.keyField;
    let iterator = (node, index, p, level) => {
      if (subNode && node[KEY] === subNode[KEY]) {
        parent = p || null;
        return true;
      }
    }
    this.walker(iterator, null, 'breadth', true);

    return parent;
  }

  /**
   * Get siblings node and itself of given key.
   *
   * @param {string} nodeOrKey node ke y.
   * @param {TreeNode[]} [nodes]  Tree root nodes or specific nodes.
   * @memberof TreeUtils
   * @returns {TreeNode[]} return siblings node and itself of given node or key.
   */
  siblingsAndSelf(
    nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string,
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let siblings: Node[] = [];
    const curr: Node | null = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;
    const iterator = (
      node: Node,
      index: number,
      parent: Node | undefined,
    ) => {
      if (curr && node[this.keyField] === curr[this.keyField]) {
        siblings = parent ? parent[this.childrenField] : this.nodes;
      }
    }
    this.walker(iterator, this.nodes, 'depth', true);

    return siblings;
  }

  /**
   * Get siblings node of given key.
   *
   * @param {TreeNode[]} nodes Tree root nodes or specific nodes.
   * @param {string} nodeOrKey node or key of node.
   * @memberof TreeUtils
   * @returns {TreeNode[]} return siblings node of given node or key.
   */
  siblings(
    nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let curr: Node | null = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;

    if (curr) {
      let siblingsAndSelf: Node[] = this.siblingsAndSelf(curr);
      let KEY = this.keyField;

      return siblingsAndSelf.filter(node => curr && node[KEY] !== curr[KEY]);
    } else {
      return [];
    }
  }

  /**
   * Get prev siblings node of given key.
   *
   * @param {string} nodeOrKey node key.
   * @param {TreeNode[]} [nodes] Tree root nodes or specific nodes.
   * @memberof TreeUtils
   * @returns {TreeNode | null} return prev siblings node of given key or NULL.
   */
  prevSibling(
    nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string
  ): TreeNode<Props, KeyField, ChildrenField> | null {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    const curr: Node | null = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;

    if (curr) {
      let siblingsAndSelf: Node[] = this.siblingsAndSelf(nodeOrKey);
      let prev: Node | null = null;

      siblingsAndSelf.some((node, index) => {
        if (index > 0 && node[this.keyField] === curr[this.keyField]) {
          prev = siblingsAndSelf[index - 1];
          return true; // break some()
        }
      });
      return prev;
    } else {
      return null;
    }
  }

  /**
   * Get next siblings node of given key.
   *
   * @param {string} nodeOrKey node key.
   * @param {TreeNode[]} [nodes] Tree root nodes or specific nodes.
   * @memberof TreeUtils
   * @returns {TreeNode | null} return next siblings node of given key or null.
   */
  nextSibling(
    nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string
  ): TreeNode<Props, KeyField, ChildrenField> | null {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    const curr: Node | null = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;

    if (curr) {
      const siblingsAndSelf: Node[] = this.siblingsAndSelf(curr);
      const KEY = this.keyField;
      let next: Node | null = null;

      if (siblingsAndSelf && siblingsAndSelf.length > 0) {
        siblingsAndSelf.some((node, index) => {
          if (index < siblingsAndSelf.length - 1 && node[KEY] === curr[KEY]) {
            next = siblingsAndSelf[index + 1];
            return true; // break some()
          }
        });
      }
      return next;
    } else {
      return null;
    }

  }

  /**
   * Get all next siblings node of given key.
   *
   * @param {string} nodeOrKey node key.
   * @param {TreeNode[]} [nodes] Tree root nodes or specific nodes.
   * @memberof TreeUtils
   * @returns {TreeNode | null} return next siblings node of given key or null.
   */
  nextSiblingAll(
    nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    const curr: Node | null = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;

    if (curr) {
      let siblingsAndSelf: Node[] = this.siblingsAndSelf(nodeOrKey);
      let currIndex: number = this.indexOf(curr, siblingsAndSelf);

      return currIndex < 0 ? [] : siblingsAndSelf.slice(currIndex + 1);
    } else {
      return [];
    }
  }
  /**
   * @alias TreeUtils.nextSiblingAll
   */
  nextSiblings(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): TreeNode<Props, KeyField, ChildrenField>[] {
    return this.nextSiblingAll(nodeOrKey);
  }

  /**
   * Get all prev siblings node of given key.
   *
   * @param {string} nodeOrKey node or key.
   * @param {TreeNode[]} [nodes] Tree root nodes or specific nodes.
   * @memberof TreeUtils
   * @returns {TreeNode | null} return next siblings node of given key or null.
   */
  prevSiblingAll(
    nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let curr: Node | null = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;

    if (curr) {
      let siblingsAndSelf: Node[] = this.siblingsAndSelf(nodeOrKey);
      let currIndex: number = this.indexOf(curr, siblingsAndSelf);

      return siblingsAndSelf.slice(0, Math.max(0, currIndex));
    } else {
      return [];
    }
  }
  /**
   * @alias TreeUtils.prevSiblingAll
   */
  prevSiblings(
    nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    return this.prevSiblingAll(nodeOrKey);
  }

  /**
   * Get node index of siblings.
   *
   * @param {TreeNode[]} siblings
   * @param {(TreeNode | string)} nodeOrKey
   * @returns {number}
   * @memberof TreeUtils
   */
  indexOf(
    nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string ,
    siblings?: TreeNode<Props, KeyField, ChildrenField>[],
  ): number {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let node: Node | null = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey as string) : nodeOrKey;
    let i: number = -1;

    siblings = siblings || this.siblingsAndSelf(nodeOrKey);
    siblings.some((sibling, index) => {
      if (node && node[this.keyField] === sibling[this.keyField]) {
        i = index;
        return true; // return true to stop next;
      }
    });

    return i;
  }

  /**
   * Append a new node into first of target node.
   *
   * @param {TreeNode} node A new node to append.
   * @param {(TreeNode | string)} [tagart] where for appending to.
   * @memberof TreeUtils
   */
  append(
    node: TreeNode<Props, KeyField, ChildrenField>,
    tagart?: TreeNode<Props, KeyField, ChildrenField> | string
  ) {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    const parentNode: Node | null = typeof tagart === 'string' ? this.getNode(tagart as string) : tagart || null;
    let siblings: Node[];

    if (parentNode) {
      const CK = this.childrenField;
      parentNode[CK] = parentNode[CK] || [] as any;
      siblings = parentNode[CK];
    } else {
      siblings = this.nodes;
    }
    siblings.push(node);
  }

  /**
   * Prepend a node into last of target node.
   *
   * @param {TreeNode} node A new node to prepend.
   * @param {(TreeNode | string)} [tagart] Where to prepend.
   * @memberof TreeUtils
   */
  prepend(
    node: TreeNode<Props, KeyField, ChildrenField>,
    tagart?: TreeNode<Props, KeyField, ChildrenField> | string
  ) {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    const parentNode: Node | null = typeof tagart === 'string' ? this.getNode(tagart as string) : tagart || null;
    let siblings: Node[];

    if (parentNode) {
      const CK = this.childrenField;
      parentNode[CK] = parentNode[CK] || [] as any;
      siblings = parentNode[CK];
    } else {
      siblings = this.nodes;
    }
    siblings.unshift(node);
  }

  /**
   * Insert a new node before target
   *
   * @param {TreeNode} node
   * @param {(TreeNode | string)} target
   * @memberof TreeUtils
   */
  insertBefore(
    node: TreeNode<Props, KeyField, ChildrenField>,
    target: TreeNode<Props, KeyField, ChildrenField> | string
  ): void {
    let resolvedTarget = typeof target === 'string' ? this.getNode(target as string) : target;

    if (node && resolvedTarget) {
      let parent = this.getParent(resolvedTarget);
      let siblings = this.siblingsAndSelf(resolvedTarget);
      let index = this.indexOf(resolvedTarget, parent ? parent[this.childrenField] : undefined);

      siblings.splice(Math.max(0, index), 0, node);
    }
  }

  /**
   * Insert a new node after target
   *
   * @param {TreeNode} node
   * @param {(TreeNode | string)} target
   * @memberof TreeUtils
   */
  insertAfter(
    node: TreeNode<Props, KeyField, ChildrenField>,
    target: TreeNode<Props, KeyField, ChildrenField> | string
  ): void{
    let resolvedTarget = typeof target === 'string' ? this.getNode(target as string) : target;

    if (node && resolvedTarget) {
      let parent = this.getParent(resolvedTarget);
      let siblings = this.siblingsAndSelf(resolvedTarget);
      let index = this.indexOf(resolvedTarget, parent ? parent[this.childrenField] : undefined);

      if (index >= 0) {
        siblings.splice(index + 1, 0, node);
      }
    }
  }

  /**
   * Move a node before of previous siblings.
   *
   * @param {(TreeNode | string)} node Node or key.
   * @memberof TreeUtils
   */
  forward (
    node: TreeNode<Props, KeyField, ChildrenField> | string
  ) {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let curr: Node | null = typeof node === 'string' ? this.getNode(node as string) : node;

    if (curr) {
      let siblings: Node[] = this.siblingsAndSelf(curr);
      let index: number = this.indexOf(curr, siblings);
      let targetIndex: number = index - 1;

      if (index > 0) {
        siblings.splice(targetIndex, 2, curr, siblings[targetIndex]);
      }
    }
  }

  /**
   * Move a node after of next siblings.
   *
   * @param {(TreeNode | string)} node Node or key.
   * @memberof TreeUtils
   */
  backward (
    node: TreeNode<Props, KeyField, ChildrenField> | string
  ) {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let curr: Node | null = typeof node === 'string' ? this.getNode(node as string) : node;

    if (curr) {
      let siblings: Node[] = this.siblingsAndSelf(curr);
      let index: number = this.indexOf(curr, siblings);
      let targetIndex: number = Math.min(siblings.length, index + 1);

      if (index > -1 && index < siblings.length - 1) {
        siblings.splice(index, 2, siblings[targetIndex], curr);
      }
    }
  }

  /**
   * Remove a node
   *
   * @param {(TreeNode | string)} node Node or key.
   * @memberof TreeUtils
   */
  remove(
    node: TreeNode<Props, KeyField, ChildrenField> | string
  ) {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let curr: Node | null = typeof node === 'string' ? this.getNode(node as string) : node;

    if (curr) {
      let siblings: Node[] = this.siblingsAndSelf(curr);
      let index: number = this.indexOf(curr, siblings);

      if (index > -1 && index < siblings.length) {
        siblings.splice(index, 1);
      }
    }
  }

  /**
   * Move given node list.
   *
   * @param {(TreeNode | string)} node Node or key.
   * @memberof TreeUtils
   */
  removeNodes(
    nodes: TreeNode<Props, KeyField, ChildrenField>[] | string[],
  ) {
    nodes.forEach(node => {
      this.remove(node);
    });
  }

  /**
   * Move a node up to parent\'s siblings behind it parent.
   *
   * @param {(TreeNode | string)} node Node or key.
   * @memberof TreeUtils
   */
  levelUp(
    node: TreeNode<Props, KeyField, ChildrenField> | string
  ) {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let curr: Node | null = typeof node === 'string' ? this.getNode(node as string) : node;

    if (curr) {
      let parent = this.getParent(curr);
      if (parent) {
        this.remove(curr);
        this.insertAfter(curr, parent);
      }
    }
  }

  /**
   * Move a node down to end of children of previous siblings.
   *
   * @param {(TreeNode | string)} node Node or key.
   * @memberof TreeUtils
   */
  levelDown(
    node: TreeNode<Props, KeyField, ChildrenField> | string
  ) {
    type Node = TreeNode<Props, KeyField, ChildrenField>;
    let curr: Node | null = typeof node === 'string' ? this.getNode(node as string) : node;

    if (curr) {
      let prevSibling = this.prevSibling(curr);

      if (prevSibling) {
        this.remove(curr);
        this.append(curr, prevSibling);
      }
    }
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
    predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>,
    nodes?: TreeNode<Props, KeyField, ChildrenField>[],
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    let found: TreeNode<Props, KeyField, ChildrenField>[] = [];

    nodes = nodes || this.nodes;
    for (const node of nodes) {
      if (predicate(node, parents)) {
        found = [...found, node];
      }

      if (this.hasChildren(node)) {
        const foundChildren = this.findNodes(predicate, node[this.childrenField], [...parents, node]);
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
   * @param {NodesFinder<TreeNode>} predicate
   * @param {TreeNode[]} [nodes = this.nodes]
   * @param {TreeNode[]} [parents=[]]
   * @returns {TreeNode[]}
   * @memberof TreeUtils
   */
  filterNodes(
    predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>,
    nodes?: TreeNode<Props, KeyField, ChildrenField>[],
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    nodes = nodes || this.nodes;
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
   * @param {NodeSorter<TreeNode>} compareFunction
   * @param {TreeNode[]} [nodes]
   * @param {TreeNode[]} [parents=[]]
   * @returns {TreeNode[]}
   * @memberof TreeUtils
   */
  sortNodes(
    compareFunction: NodeSorter<TreeNode<Props, KeyField, ChildrenField>>,
    nodes?: TreeNode<Props, KeyField, ChildrenField>[],
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    nodes = nodes || this.nodes;
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
    mapFunction: NodeMapper<TreeNode<Props, KeyField, ChildrenField>>,
    nodes?: TreeNode<Props, KeyField, ChildrenField>[],
    parents: TreeNode<Props, KeyField, ChildrenField>[] = []
  ): TreeNode<Props, KeyField, ChildrenField>[] {
    nodes = nodes || this.nodes;
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
