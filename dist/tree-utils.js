"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeUtils {
    constructor(keyField, childrenField) {
        this.keyField = keyField || 'key';
        this.childrenField = childrenField || 'children';
    }
    hasChildren(node) {
        const children = node[this.childrenField];
        return !!children && children.length > 0;
    }
    isBranch(node) {
        const children = node[this.childrenField];
        return !!children && children.length >= 0;
    }
    getNodeByKey(nodes, key) {
        let found = null;
        const self = this;
        for (const node of nodes) {
            if (node[this.keyField] === key) {
                found = node;
            }
            else if (this.hasChildren(node)) {
                found = this.getNodeByKey(node[this.childrenField], key);
            }
            if (found) {
                break;
            }
        }
        return found;
    }
    findNodes(nodes, predicate, parents = []) {
        let found = [];
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
    filterNode(node, predicate, parents = []) {
        let res = null;
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
    filterNodes(nodes, predicate, parents = []) {
        let result = nodes
            .map(node => this.filterNode(node, predicate, parents))
            .filter(i => i !== null);
        return result;
    }
    sortNode(node, compareFunction, parents = []) {
        if (this.hasChildren(node)) {
            const children = [...node[this.childrenField]]
                .sort((a, b) => compareFunction(a, b, [...parents, node]))
                .map(childNode => this.sortNode(childNode, compareFunction, [...parents, node, childNode]));
            return { ...node, [this.childrenField]: children };
        }
        return node;
    }
    sortNodes(nodes, compareFunction, parents = []) {
        return nodes.sort((a, b) => compareFunction(a, b, parents)).map(node => this.sortNode(node, compareFunction, parents));
    }
    mapNode(node, mapFunction, parents = []) {
        const mappedNode = mapFunction({ ...node }, parents);
        if (this.hasChildren(node)) {
            const children = node[this.childrenField]
                .map(n => this.mapNode(n, mapFunction, [...parents, mappedNode]));
            mappedNode[this.childrenField] = children;
        }
        return mappedNode;
    }
    mapNodes(nodes, mapFunction, parents = []) {
        return nodes.map(node => this.mapNode(node, mapFunction, parents));
    }
}
exports.default = TreeUtils;
//# sourceMappingURL=tree-utils.js.map