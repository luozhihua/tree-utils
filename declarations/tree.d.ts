import { TreeNode, NodesFinder, NodeSorter, NodeMapper } from './type';
export default class Tree<Props = {
    [k: string]: any;
}, KeyField extends string = 'key', ChildrenField extends string = 'children'> {
    private keyField;
    private childrenField;
    private nodes;
    private cache;
    constructor(nodes?: TreeNode<Props, KeyField, ChildrenField>[], keyField?: KeyField, childrenField?: ChildrenField);
    private buildCache;
    setData(nodes: TreeNode<Props, KeyField, ChildrenField>[]): void;
    toJSON(): TreeNode<Props, KeyField, ChildrenField>[];
    toString(indent?: number): string;
    walker(iterator: (node: TreeNode<Props, KeyField, ChildrenField>, index: number, parent: TreeNode<Props, KeyField, ChildrenField> | undefined, level: number) => boolean | void, nodes?: TreeNode<Props, KeyField, ChildrenField>[] | null, mode?: 'depth' | 'breadth', breakable?: boolean, __parent?: TreeNode<Props, KeyField, ChildrenField>, __level?: number): boolean | undefined;
    hasChildren(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): boolean;
    isBranch(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): boolean;
    getNode(key: string): TreeNode<Props, KeyField, ChildrenField> | null;
    contains(parent: string | TreeNode<Props, KeyField, ChildrenField>, child: string | TreeNode<Props, KeyField, ChildrenField>): boolean;
    containsDeeply(parent: string | TreeNode<Props, KeyField, ChildrenField>, child: string | TreeNode<Props, KeyField, ChildrenField>): boolean;
    getParent(keyOrNode: string | TreeNode<Props, KeyField, ChildrenField>): TreeNode<Props, KeyField, ChildrenField> | null;
    siblingsAndSelf(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): TreeNode<Props, KeyField, ChildrenField>[];
    siblings(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): TreeNode<Props, KeyField, ChildrenField>[];
    prevSiblings(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): TreeNode<Props, KeyField, ChildrenField> | null;
    nextSiblings(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): TreeNode<Props, KeyField, ChildrenField> | null;
    nextSiblingsAll(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): TreeNode<Props, KeyField, ChildrenField>[];
    prevSiblingsAll(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string): TreeNode<Props, KeyField, ChildrenField>[];
    indexOf(nodeOrKey: TreeNode<Props, KeyField, ChildrenField> | string, siblings?: TreeNode<Props, KeyField, ChildrenField>[]): number;
    append(node: TreeNode<Props, KeyField, ChildrenField>, tagart?: TreeNode<Props, KeyField, ChildrenField> | string): void;
    prepend(node: TreeNode<Props, KeyField, ChildrenField>, tagart?: TreeNode<Props, KeyField, ChildrenField> | string): void;
    insertBefore(node: TreeNode<Props, KeyField, ChildrenField>, target: TreeNode<Props, KeyField, ChildrenField> | string): void;
    insertAfter(node: TreeNode<Props, KeyField, ChildrenField>, target: TreeNode<Props, KeyField, ChildrenField> | string): void;
    forward(node: TreeNode<Props, KeyField, ChildrenField> | string): void;
    backward(node: TreeNode<Props, KeyField, ChildrenField> | string): void;
    remove(node: TreeNode<Props, KeyField, ChildrenField> | string): void;
    removeNodes(nodes: TreeNode<Props, KeyField, ChildrenField>[] | string[]): void;
    levelUp(node: TreeNode<Props, KeyField, ChildrenField> | string): void;
    levelDown(node: TreeNode<Props, KeyField, ChildrenField> | string): void;
    findNodes(predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>, nodes?: TreeNode<Props, KeyField, ChildrenField>[], parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>[];
    filterNode(node: TreeNode<Props, KeyField, ChildrenField>, predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField> | null;
    filterNodes(predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>, nodes?: TreeNode<Props, KeyField, ChildrenField>[], parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>[];
    sortNode(node: TreeNode<Props, KeyField, ChildrenField>, compareFunction: NodeSorter<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>;
    sortNodes(compareFunction: NodeSorter<TreeNode<Props, KeyField, ChildrenField>>, nodes?: TreeNode<Props, KeyField, ChildrenField>[], parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>[];
    mapNode(node: TreeNode<Props, KeyField, ChildrenField>, mapFunction: NodeMapper<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>;
    mapNodes(mapFunction: NodeMapper<TreeNode<Props, KeyField, ChildrenField>>, nodes?: TreeNode<Props, KeyField, ChildrenField>[], parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>[];
}
