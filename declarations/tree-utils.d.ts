import { TreeNode, NodesFinder, NodeSorter, NodeMapper } from './type';
export default class TreeUtils<Props = {
    [k: string]: any;
}, KeyField extends string = 'key', ChildrenField extends string = 'children'> {
    private keyField;
    private childrenField;
    constructor(keyField?: KeyField, childrenField?: ChildrenField);
    hasChildren(node: TreeNode<Props, KeyField, ChildrenField>): boolean;
    isBranch(node: TreeNode<Props, KeyField, ChildrenField>): boolean;
    getNodeByKey(nodes: TreeNode<Props, KeyField, ChildrenField>[], key: string): TreeNode<Props, KeyField, ChildrenField> | null;
    findNodes(nodes: TreeNode<Props, KeyField, ChildrenField>[], predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>[];
    filterNode(node: TreeNode<Props, KeyField, ChildrenField>, predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField> | null;
    filterNodes(nodes: TreeNode<Props, KeyField, ChildrenField>[], predicate: NodesFinder<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>[];
    sortNode(node: TreeNode<Props, KeyField, ChildrenField>, compareFunction: NodeSorter<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>;
    sortNodes(nodes: TreeNode<Props, KeyField, ChildrenField>[], compareFunction: NodeSorter<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>[];
    mapNode(node: TreeNode<Props, KeyField, ChildrenField>, mapFunction: NodeMapper<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>;
    mapNodes(nodes: TreeNode<Props, KeyField, ChildrenField>[], mapFunction: NodeMapper<TreeNode<Props, KeyField, ChildrenField>>, parents?: TreeNode<Props, KeyField, ChildrenField>[]): TreeNode<Props, KeyField, ChildrenField>[];
}
