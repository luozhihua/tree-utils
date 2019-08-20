"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tree {
    constructor(nodes = [], keyField, childrenField) {
        this.cache = {};
        this.nodes = nodes;
        this.keyField = keyField || 'key';
        this.childrenField = childrenField || 'children';
        this.buildCache();
    }
    buildCache() {
        this.walker((node, index, level) => {
            let key = node[this.keyField];
            this.cache[key] = node;
        });
    }
    setData(nodes) {
        this.nodes = nodes;
    }
    toJSON() {
        return JSON.parse(JSON.stringify(this.nodes));
    }
    toString(indent = 4) {
        return JSON.stringify(this.nodes, [], indent);
    }
    walker(iterator, nodes = null, mode = 'depth', breakable = false, __parent, __level = 0) {
        nodes = nodes || this.nodes;
        let breakFlag;
        let found = nodes.some((node, index) => {
            breakFlag = iterator(node, index, __parent, __level);
            if (mode === 'depth' && !breakFlag && this.hasChildren(node)) {
                breakFlag = this.walker(iterator, node[this.childrenField], mode, breakable, node, __level + 1);
            }
            return breakFlag;
        });
        if (mode === 'breadth' && (!breakable || !found)) {
            found = nodes.some((node, index) => {
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
    hasChildren(nodeOrKey) {
        const node = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        if (!node) {
            return false;
        }
        const children = node[this.childrenField];
        return !!children && children.length > 0;
    }
    isBranch(nodeOrKey) {
        const node = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        if (!node) {
            return false;
        }
        const children = node[this.childrenField];
        return !!children && children.length >= 0;
    }
    getNode(key) {
        return this.cache[key] || null;
    }
    contains(parent, child) {
        let result = false;
        let parentNode = typeof parent === 'string' ? this.getNode(parent) : parent;
        let childNode = typeof child === 'string' ? this.getNode(child) : child;
        if (parentNode && childNode && this.hasChildren(parentNode)) {
            parentNode[this.childrenField].some(child => {
                if (childNode && child[this.keyField] === childNode[this.keyField]) {
                    result = true;
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        return result;
    }
    containsDeeply(parent, child) {
        let result = false;
        let parentNode = typeof parent === 'string' ? this.getNode(parent) : parent;
        let childNode = typeof child === 'string' ? this.getNode(child) : child;
        if (parentNode && childNode && this.hasChildren(parentNode)) {
            const iterator = (node) => {
                if (childNode && node[this.keyField] === childNode[this.keyField]) {
                    result = true;
                    return true;
                }
            };
            this.walker(iterator, parentNode[this.childrenField], 'depth', true);
        }
        return result;
    }
    getParent(keyOrNode) {
        let subNode = typeof keyOrNode === 'string' ? this.getNode(keyOrNode) : keyOrNode;
        let parent = null;
        let KEY = this.keyField;
        let iterator = (node, index, p, level) => {
            if (subNode && node[KEY] === subNode[KEY]) {
                parent = p || null;
                return true;
            }
        };
        this.walker(iterator, null, 'breadth', true);
        return parent;
    }
    siblingsAndSelf(nodeOrKey) {
        let siblings = [];
        const curr = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        const iterator = (node, index, parent) => {
            if (curr && node[this.keyField] === curr[this.keyField]) {
                siblings = parent ? parent[this.childrenField] : this.nodes;
            }
        };
        this.walker(iterator, this.nodes, 'depth', true);
        return siblings;
    }
    siblings(nodeOrKey) {
        let curr = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        if (curr) {
            let siblingsAndSelf = this.siblingsAndSelf(curr);
            let KEY = this.keyField;
            return siblingsAndSelf.filter(node => curr && node[KEY] !== curr[KEY]);
        }
        else {
            return [];
        }
    }
    prevSibling(nodeOrKey) {
        const curr = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        if (curr) {
            let siblingsAndSelf = this.siblingsAndSelf(nodeOrKey);
            let prev = null;
            siblingsAndSelf.some((node, index) => {
                if (index > 0 && node[this.keyField] === curr[this.keyField]) {
                    prev = siblingsAndSelf[index - 1];
                    return true;
                }
            });
            return prev;
        }
        else {
            return null;
        }
    }
    nextSibling(nodeOrKey) {
        const curr = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        if (curr) {
            const siblingsAndSelf = this.siblingsAndSelf(curr);
            const KEY = this.keyField;
            let next = null;
            if (siblingsAndSelf && siblingsAndSelf.length > 0) {
                siblingsAndSelf.some((node, index) => {
                    if (index < siblingsAndSelf.length - 1 && node[KEY] === curr[KEY]) {
                        next = siblingsAndSelf[index + 1];
                        return true;
                    }
                });
            }
            return next;
        }
        else {
            return null;
        }
    }
    nextSiblingAll(nodeOrKey) {
        const curr = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        if (curr) {
            let siblingsAndSelf = this.siblingsAndSelf(nodeOrKey);
            let currIndex = this.indexOf(curr, siblingsAndSelf);
            return currIndex < 0 ? [] : siblingsAndSelf.slice(currIndex + 1);
        }
        else {
            return [];
        }
    }
    prevSiblingAll(nodeOrKey) {
        let curr = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        if (curr) {
            let siblingsAndSelf = this.siblingsAndSelf(nodeOrKey);
            let currIndex = this.indexOf(curr, siblingsAndSelf);
            return siblingsAndSelf.slice(0, Math.max(0, currIndex));
        }
        else {
            return [];
        }
    }
    nextSiblings(nodeOrKey) {
        return this.nextSiblingAll(nodeOrKey);
    }
    prevSiblings(nodeOrKey) {
        return this.prevSiblingAll(nodeOrKey);
    }
    indexOf(nodeOrKey, siblings) {
        let node = typeof nodeOrKey === 'string' ? this.getNode(nodeOrKey) : nodeOrKey;
        let i = -1;
        siblings = siblings || this.siblingsAndSelf(nodeOrKey);
        siblings.some((sibling, index) => {
            if (node && node[this.keyField] === sibling[this.keyField]) {
                i = index;
                return true;
            }
        });
        return i;
    }
    append(node, tagart) {
        const parentNode = typeof tagart === 'string' ? this.getNode(tagart) : tagart || null;
        let siblings;
        if (parentNode) {
            const CK = this.childrenField;
            parentNode[CK] = parentNode[CK] || [];
            siblings = parentNode[CK];
        }
        else {
            siblings = this.nodes;
        }
        siblings.push(node);
    }
    prepend(node, tagart) {
        const parentNode = typeof tagart === 'string' ? this.getNode(tagart) : tagart || null;
        let siblings;
        if (parentNode) {
            const CK = this.childrenField;
            parentNode[CK] = parentNode[CK] || [];
            siblings = parentNode[CK];
        }
        else {
            siblings = this.nodes;
        }
        siblings.unshift(node);
    }
    insertBefore(node, target) {
        let resolvedTarget = typeof target === 'string' ? this.getNode(target) : target;
        if (node && resolvedTarget) {
            let parent = this.getParent(resolvedTarget);
            let siblings = this.siblingsAndSelf(resolvedTarget);
            let index = this.indexOf(resolvedTarget, parent ? parent[this.childrenField] : undefined);
            siblings.splice(Math.max(0, index), 0, node);
        }
    }
    insertAfter(node, target) {
        let resolvedTarget = typeof target === 'string' ? this.getNode(target) : target;
        if (node && resolvedTarget) {
            let parent = this.getParent(resolvedTarget);
            let siblings = this.siblingsAndSelf(resolvedTarget);
            let index = this.indexOf(resolvedTarget, parent ? parent[this.childrenField] : undefined);
            if (index >= 0) {
                siblings.splice(index + 1, 0, node);
            }
        }
    }
    forward(node) {
        let curr = typeof node === 'string' ? this.getNode(node) : node;
        if (curr) {
            let siblings = this.siblingsAndSelf(curr);
            let index = this.indexOf(curr, siblings);
            let targetIndex = index - 1;
            if (index > 0) {
                siblings.splice(targetIndex, 2, curr, siblings[targetIndex]);
            }
        }
    }
    backward(node) {
        let curr = typeof node === 'string' ? this.getNode(node) : node;
        if (curr) {
            let siblings = this.siblingsAndSelf(curr);
            let index = this.indexOf(curr, siblings);
            let targetIndex = Math.min(siblings.length, index + 1);
            if (index > -1 && index < siblings.length - 1) {
                siblings.splice(index, 2, siblings[targetIndex], curr);
            }
        }
    }
    remove(node) {
        let curr = typeof node === 'string' ? this.getNode(node) : node;
        if (curr) {
            let siblings = this.siblingsAndSelf(curr);
            let index = this.indexOf(curr, siblings);
            if (index > -1 && index < siblings.length) {
                siblings.splice(index, 1);
            }
        }
    }
    removeNodes(nodes) {
        nodes.forEach(node => {
            this.remove(node);
        });
    }
    levelUp(node) {
        let curr = typeof node === 'string' ? this.getNode(node) : node;
        if (curr) {
            let parent = this.getParent(curr);
            if (parent) {
                this.remove(curr);
                this.insertAfter(curr, parent);
            }
        }
    }
    levelDown(node) {
        let curr = typeof node === 'string' ? this.getNode(node) : node;
        if (curr) {
            let prevSibling = this.prevSibling(curr);
            if (prevSibling) {
                this.remove(curr);
                this.append(curr, prevSibling);
            }
        }
    }
    findNodes(predicate, nodes, parents = []) {
        let found = [];
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
    filterNodes(predicate, nodes, parents = []) {
        nodes = nodes || this.nodes;
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
    sortNodes(compareFunction, nodes, parents = []) {
        nodes = nodes || this.nodes;
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
    mapNodes(mapFunction, nodes, parents = []) {
        nodes = nodes || this.nodes;
        return nodes.map(node => this.mapNode(node, mapFunction, parents));
    }
}
exports.default = Tree;
//# sourceMappingURL=tree.js.map