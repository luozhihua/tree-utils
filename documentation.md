## Classes

<dl>
<dt><a href="#Tree">Tree</a></dt>
<dd><p>Class Tree</p></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#KeyField">KeyField</a> : <code>string</code></dt>
<dd><p>defaults 'key'</p></dd>
<dt><a href="#ChildrenField">ChildrenField</a> : <code>string</code></dt>
<dd><p>defaults 'children'</p></dd>
<dt><a href="#TreeNode">TreeNode</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Tree"></a>

## Tree
<p>Class Tree</p>

**Kind**: global class  

* [Tree](#Tree)
    * [new Tree([nodes], [keyField], [childrenField])](#new_Tree_new)
    * [.setData(nodes)](#Tree+setData)
    * [.toJSON()](#Tree+toJSON) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
    * [.toString([indent])](#Tree+toString) ⇒ <code>string</code>
    * [.walker(iterator, [nodes], [mode], [breakable])](#Tree+walker)
    * [.hasChildren(nodeOrKey)](#Tree+hasChildren) ⇒ <code>boolean</code>
    * [.isBranch(nodeOrKey)](#Tree+isBranch) ⇒ <code>boolean</code>
    * [.isFirstChild(nodeOrKey)](#Tree+isFirstChild) ⇒ <code>boolean</code>
    * [.isLastChild(nodeOrKey)](#Tree+isLastChild) ⇒ <code>boolean</code>
    * [.getNode(key)](#Tree+getNode) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
    * [.contains(parent, child)](#Tree+contains) ⇒ <code>boolean</code>
    * [.containsDeeply(parent, child)](#Tree+containsDeeply) ⇒ <code>boolean</code>
    * [.getParent(key, [nodes])](#Tree+getParent) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
    * [.siblingsAndSelf(nodeOrKey, [nodes])](#Tree+siblingsAndSelf) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
    * [.siblings(nodes, nodeOrKey)](#Tree+siblings) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
    * [.prevSiblings(nodeOrKey, [nodes])](#Tree+prevSiblings) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
    * [.nextSiblings(nodeOrKey, [nodes])](#Tree+nextSiblings) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
    * [.nextSiblingsAll(nodeOrKey, [nodes])](#Tree+nextSiblingsAll) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
    * [.prevSiblingsAll(nodeOrKey, [nodes])](#Tree+prevSiblingsAll) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
    * [.indexOf(siblings, nodeOrKey)](#Tree+indexOf) ⇒ <code>number</code>
    * [.append(node, [tagart])](#Tree+append)
    * [.prepend(node, [tagart])](#Tree+prepend)
    * [.insertBefore(node, target)](#Tree+insertBefore)
    * [.insertAfter(node, target)](#Tree+insertAfter)
    * [.forward(node)](#Tree+forward)
    * [.backward(node)](#Tree+backward)
    * [.remove(node)](#Tree+remove)
    * [.removeNodes(node)](#Tree+removeNodes)
    * [.levelUp(node)](#Tree+levelUp)
    * [.levelDown(node)](#Tree+levelDown)
    * [.findNodes(nodes, predicate, [parents])](#Tree+findNodes) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
    * [.filterNode(node, predicate, [parents])](#Tree+filterNode) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
    * [.filterNodes(predicate, [nodes], [parents])](#Tree+filterNodes) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
    * [.sortNode(node, compareFunction, [parents])](#Tree+sortNode) ⇒ [<code>TreeNode</code>](#TreeNode)
    * [.sortNodes(compareFunction, [nodes], [parents])](#Tree+sortNodes) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
    * [.mapNode(node, mapFunction, [parents])](#Tree+mapNode) ⇒ [<code>TreeNode</code>](#TreeNode)

<a name="new_Tree_new"></a>

### new Tree([nodes], [keyField], [childrenField])
<p>Creates an instance of Tree.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodes] | <code>Array</code> | <code>[]</code> | <p>tree data.</p> |
| [keyField] | [<code>KeyField</code>](#KeyField) | <code>&#x27;key&#x27;</code> | <p>Key fieldname of each tree node (value of key should be unique in all tree nodes.)</p> |
| [childrenField] | [<code>ChildrenField</code>](#ChildrenField) | <code>&#x27;children&#x27;</code> | <p>children field name of tree node.</p> |

**Example** *(Install)*  
```typescript
npm install @colin-luo/tree
```
**Example** *(Typescript)*  

with default data structure: `{key: '', children: []}`.

```typescript
import Tree from '@colin-luo/tree';

const data = [
  {key: 'a', label: 'A', icon: 'a.svg'},
  {key: 'b', label: 'B', icon: 'b.svg', children: [
    {key: 'b-a', label: 'B-A', icon: 'b-a.svg'},
    {key: 'b-b', label: 'B-B', icon: 'b-b.svg'},
  ]},
  {key: 'c', label: 'C', icon: 'c.svg', children: []},
];

const tree = new Tree(data);
```
with custom data structure: `{id: '', members: []}`.

```typescript
import Tree from '@colin-luo/tree';

type KeyField = 'id';
type ChildrenField = 'members';
type NodeProps = {
  label: string;
  icon: string;
}

const data = [
  {id: 'a', label: 'A', icon: 'a.svg'},
  {id: 'b', label: 'B', icon: 'b.svg', members: [
    {id: 'b-a', label: 'B-A', icon: 'b-a.svg'},
    {id: 'b-b', label: 'B-B', icon: 'b-b.svg'},
  ]},
  {id: 'c', label: 'C', icon: 'c.svg', members: []},
];

const tree = new Tree<NodeProps, KeyField, ChildrenField>(data, 'id', 'members');
```
**Example** *(Javascript)*  

```typescript
import Tree from '@colin-luo/tree';

const data = [
  {key: 'a', label: 'A', icon: 'a.svg'},
  {key: 'b', label: 'B', icon: 'b.svg', children: [
    {key: 'b-a', label: 'B-A', icon: 'b-a.svg'},
    {key: 'b-b', label: 'B-B', icon: 'b-b.svg'},
  ]},
  {key: 'c', label: 'C', icon: 'c.svg', children: []},
];

const tree = new Tree(data);
const tree2 = new Tree(data, 'key', 'children');
```
<a name="Tree+setData"></a>

### @.setData(nodes)
<hr/>
set tree nodes.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| nodes | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | 

**Example** *(Example usage of &#x60;setData&#x60;.)*  
```javascript
const treeData = [
  {key: 'foo', text: 'foo'},
  {key: 'bar', text: 'bar', children: {
    {key: 'baz', text: 'baz'},
  }},
];
tree.setData(treeData);
```
<a name="Tree+toJSON"></a>

### @.toJSON() ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
<p>Get tree as JSON.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  
<a name="Tree+toString"></a>

### @.toString([indent]) ⇒ <code>string</code>
<hr/>
Get tree as string.

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: <code>string</code> - <p>string</p>  

| Param | Type | Default |
| --- | --- | --- |
| [indent] | <code>number</code> | <code>4</code> | 

**Example** *(Typescript)*  
```javascript
const treeData: string = tree.toString();
```
**Example** *(Javascript use 4 space indents.)*  
```javascript
const treeData = tree.toString(4);
```
<a name="Tree+walker"></a>

### @.walker(iterator, [nodes], [mode], [breakable])
<hr/>
Touch every node in tree.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterator | <code>function</code> |  | <p>(node, index, level) =&gt; void; If return true and breakable if true will break traversing.</p> |
| [nodes] | <code>Array.&lt;Node&gt;</code> \| <code>null</code> | <code>&#x27;null&#x27;</code> | <p>Nodes to traversing, defaults is root nodes of the tree.</p> |
| [mode] | <code>&#x27;depth&#x27;</code> \| <code>&#x27;breadth&#x27;</code> | <code>&#x27;depth&#x27;</code> | <p>Indicates depth-first or breadth-first priority when traversing.</p> |
| [breakable] | <code>boolean</code> | <code>false</code> | <p>Break traversing when iterator return true;</p> |

**Example** *(echo nodes)*  
```javascript
const iterator = function(node, index, parent, level) {
 console.log(node)
};

tree.walker(iterator, null, 'depth');
```
**Example**  
break when `iterator(...)` return `true`.
```javascript
const iterator = function(node, index, parent, level) {
  if (node.key === 'bar') {
    return true;
  }
};

tree.walker(iterator, null, 'depth');
```
<a name="Tree+hasChildren"></a>

### @.hasChildren(nodeOrKey) ⇒ <code>boolean</code>
<hr/>
Checks if a node contains children.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| nodeOrKey | [<code>TreeNode</code>](#TreeNode) \| <code>String</code> | 

**Example**  
```typescript
tree.hasChildren('nodeKey'); // return true || false
tree.hasChildren({ key: 'bar' }); // return false
tree.hasChildren({ key: 'bar', children: [] }); // return false
tree.hasChildren({ key: 'bar', children: [{ key: '...'}] }); // return true
```
<a name="Tree+isBranch"></a>

### @.isBranch(nodeOrKey) ⇒ <code>boolean</code>
<hr/>
Checks if a node has children property (whether the children's length is 0 or not)

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| nodeOrKey | [<code>TreeNode</code>](#TreeNode) \| <code>String</code> | 

**Example**  
```typescript
tree.isBranch('nodeKey'); // return true || false
tree.isBranch({key: '' }); // return false
tree.isBranch({key: '', children: [] }); // return true
```
<a name="Tree+isFirstChild"></a>

### @.isFirstChild(nodeOrKey) ⇒ <code>boolean</code>
<p>Checks if given node is the first child.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| nodeOrKey | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | 

<a name="Tree+isLastChild"></a>

### @.isLastChild(nodeOrKey) ⇒ <code>boolean</code>
<p>Checks if given node is the first child.</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| nodeOrKey | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | 

<a name="Tree+getNode"></a>

### @.getNode(key) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<hr/>
Get single node with a specific key.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="Tree+contains"></a>

### @.contains(parent, child) ⇒ <code>boolean</code>
<hr/>
Checks if a node contains another node as children.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>string</code> \| [<code>TreeNode</code>](#TreeNode) | <p>Parent node or key of parent node.</p> |
| child | <code>string</code> \| [<code>TreeNode</code>](#TreeNode) | <p>Child node or key of child node.</p> |

<a name="Tree+containsDeeply"></a>

### @.containsDeeply(parent, child) ⇒ <code>boolean</code>
<hr/>
Checks if a node contains another node deeply.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>string</code> \| [<code>TreeNode</code>](#TreeNode) | <p>Parent node or key of parent node.</p> |
| child | <code>string</code> \| [<code>TreeNode</code>](#TreeNode) | <p>Child node or key of child node.</p> |

<a name="Tree+getParent"></a>

### @.getParent(key, [nodes]) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<hr/>
Get parent node by given key.

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: [<code>TreeNode</code>](#TreeNode) \| <code>null</code> - <p>return parent node of given key.</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>node key.</p> |
| [nodes] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <p>Tree root nodes or specific nodes.</p> |

<a name="Tree+siblingsAndSelf"></a>

### @.siblingsAndSelf(nodeOrKey, [nodes]) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
<hr/>
Get siblings and itself of given key or node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) - <p>return siblings node and itself of given node or key.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node ke y.</p> |
| [nodes] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <p>Tree root nodes or specific nodes.</p> |

<a name="Tree+siblings"></a>

### @.siblings(nodes, nodeOrKey) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
<hr/>
Get siblings of given key or node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) - <p>return siblings node of given node or key.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodes | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <p>Tree root nodes or specific nodes.</p> |
| nodeOrKey | <code>string</code> | <p>node or key of node.</p> |

<a name="Tree+prevSiblings"></a>

### @.prevSiblings(nodeOrKey, [nodes]) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<hr/>
Get node before of given node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: [<code>TreeNode</code>](#TreeNode) \| <code>null</code> - <p>return previous siblings node of given key or NULL.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node key.</p> |
| [nodes] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <p>Tree root nodes or specific nodes.</p> |

<a name="Tree+nextSiblings"></a>

### @.nextSiblings(nodeOrKey, [nodes]) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<hr/>
Get next node of given node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: [<code>TreeNode</code>](#TreeNode) \| <code>null</code> - <p>return next siblings node of given key or null.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node or key.</p> |
| [nodes] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <p>Tree root nodes or specific nodes.</p> |

<a name="Tree+nextSiblingsAll"></a>

### @.nextSiblingsAll(nodeOrKey, [nodes]) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<hr/>
Get all next siblings node of given node or key.

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: [<code>TreeNode</code>](#TreeNode) \| <code>null</code> - <p>return next siblings node of given key or null.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node key.</p> |
| [nodes] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <p>Tree root nodes or specific nodes.</p> |

<a name="Tree+prevSiblingsAll"></a>

### @.prevSiblingsAll(nodeOrKey, [nodes]) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<hr/>
Get all previous siblings of given node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  
**Returns**: [<code>TreeNode</code>](#TreeNode) \| <code>null</code> - <p>return next siblings node of given key or null.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node or key.</p> |
| [nodes] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <p>Tree root nodes or specific nodes.</p> |

<a name="Tree+indexOf"></a>

### @.indexOf(siblings, nodeOrKey) ⇒ <code>number</code>
<hr/>
Get index of node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| siblings | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | 
| nodeOrKey | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | 

<a name="Tree+append"></a>

### @.append(node, [tagart])
<hr/>
Append a new node into target node as end.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) | <p>A new node to append.</p> |
| [tagart] | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | <p>where for appending to.</p> |

<a name="Tree+prepend"></a>

### @.prepend(node, [tagart])
<hr/>
Prepend a node into target node at head.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) | <p>A new node to prepend.</p> |
| [tagart] | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | <p>Where to prepend.</p> |

<a name="Tree+insertBefore"></a>

### @.insertBefore(node, target)
<hr/>
Insert a new node before target node

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) | 
| target | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | 

<a name="Tree+insertAfter"></a>

### @.insertAfter(node, target)
<hr/>
Insert a new node after target node

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type |
| --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) | 
| target | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | 

<a name="Tree+forward"></a>

### @.forward(node)
<hr/>
Exchange location with the previous node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | <p>Node or key.</p> |

<a name="Tree+backward"></a>

### @.backward(node)
<hr/>
Exchange location with the next node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | <p>Node or key.</p> |

<a name="Tree+remove"></a>

### @.remove(node)
<hr/>
Remove the given node

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | <p>Node or key.</p> |

<a name="Tree+removeNodes"></a>

### @.removeNodes(node)
<hr/>
Remove the given nodes.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | <p>Node or key.</p> |

<a name="Tree+levelUp"></a>

### @.levelUp(node)
<hr/>
Move the given node to the back of the parent node as the sibling of the parent node.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | <p>Node or key.</p> |

<a name="Tree+levelDown"></a>

### @.levelDown(node)
<hr/>
Move the given node down to end of children of previous siblings.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) \| <code>string</code> | <p>Node or key.</p> |

<a name="Tree+findNodes"></a>

### @.findNodes(nodes, predicate, [parents]) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
<hr/>
Find nodes via a custom function.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Default |
| --- | --- | --- |
| nodes | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) |  | 
| predicate | [<code>NodesFinder.&lt;TreeNode&gt;</code>](#TreeNode) |  | 
| [parents] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <code>[]</code> | 

<a name="Tree+filterNode"></a>

### @.filterNode(node, predicate, [parents]) ⇒ [<code>TreeNode</code>](#TreeNode) \| <code>null</code>
<hr/>
Filter for a single node and its children.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Default |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) |  | 
| predicate | [<code>NodesFinder.&lt;TreeNode&gt;</code>](#TreeNode) |  | 
| [parents] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <code>[]</code> | 

<a name="Tree+filterNodes"></a>

### @.filterNodes(predicate, [nodes], [parents]) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
<hr/>
Filter the given list of nodes and their children.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Default |
| --- | --- | --- |
| predicate | [<code>NodesFinder.&lt;TreeNode&gt;</code>](#TreeNode) |  | 
| [nodes] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <code>this.nodes</code> | 
| [parents] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <code>[]</code> | 

<a name="Tree+sortNode"></a>

### @.sortNode(node, compareFunction, [parents]) ⇒ [<code>TreeNode</code>](#TreeNode)
<hr/>
Sort children of givin node and return a new node with sorted children.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Default |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) |  | 
| compareFunction | [<code>NodeSorter.&lt;TreeNode&gt;</code>](#TreeNode) |  | 
| [parents] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <code>[]</code> | 

<a name="Tree+sortNodes"></a>

### @.sortNodes(compareFunction, [nodes], [parents]) ⇒ [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode)
<hr/>
Sort node list and their children.

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Default |
| --- | --- | --- |
| compareFunction | [<code>NodeSorter.&lt;TreeNode&gt;</code>](#TreeNode) |  | 
| [nodes] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) |  | 
| [parents] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <code>[]</code> | 

<a name="Tree+mapNode"></a>

### @.mapNode(node, mapFunction, [parents]) ⇒ [<code>TreeNode</code>](#TreeNode)
<hr/>
Map node

**Kind**: instance method of [<code>Tree</code>](#Tree)  

| Param | Type | Default |
| --- | --- | --- |
| node | [<code>TreeNode</code>](#TreeNode) |  | 
| mapFunction | [<code>NodeMapper.&lt;TreeNode&gt;</code>](#TreeNode) |  | 
| [parents] | [<code>Array.&lt;TreeNode&gt;</code>](#TreeNode) | <code>[]</code> | 

<a name="KeyField"></a>

## KeyField : <code>string</code>
<p>defaults 'key'</p>

**Kind**: global typedef  
<a name="ChildrenField"></a>

## ChildrenField : <code>string</code>
<p>defaults 'children'</p>

**Kind**: global typedef  
<a name="TreeNode"></a>

## TreeNode : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| key | [<code>KeyField</code>](#KeyField) | 
| children | [<code>ChildrenField</code>](#ChildrenField) | 
| others | <code>Any</code> | 

