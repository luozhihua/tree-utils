## Classes

<dl>
<dt><a href="#TreeUtils">TreeUtils</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#nextSiblingAll">nextSiblingAll()</a></dt>
<dd></dd>
<dt><a href="#prevSiblingAll">prevSiblingAll()</a></dt>
<dd></dd>
</dl>

<a name="TreeUtils"></a>

## TreeUtils
**Kind**: global class  

* [TreeUtils](#TreeUtils)
    * [new TreeUtils()](#new_TreeUtils_new)
    * _instance_
        * [.walker(iterator, [nodes], [mode], [breakable])](#TreeUtils+walker)
        * [.hasChildren(nodeOrKey)](#TreeUtils+hasChildren) ⇒ <code>boolean</code>
        * [.isBranch(nodeOrKey)](#TreeUtils+isBranch) ⇒ <code>boolean</code>
        * [.getNode(key)](#TreeUtils+getNode) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.contains(parent, child)](#TreeUtils+contains) ⇒ <code>boolean</code>
        * [.containsDeeply(parent, child)](#TreeUtils+containsDeeply) ⇒ <code>boolean</code>
        * [.getParent(key, [nodes])](#TreeUtils+getParent) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.siblingsAndSelf(nodeOrKey, [nodes])](#TreeUtils+siblingsAndSelf) ⇒ <code>Array.&lt;TreeNode&gt;</code>
        * [.siblings(nodes, nodeOrKey)](#TreeUtils+siblings) ⇒ <code>Array.&lt;TreeNode&gt;</code>
        * [.prevSibling(nodeOrKey, [nodes])](#TreeUtils+prevSibling) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.nextSibling(nodeOrKey, [nodes])](#TreeUtils+nextSibling) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.nextSiblingAll(nodeOrKey, [nodes])](#TreeUtils+nextSiblingAll) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.prevSiblingAll(nodeOrKey, [nodes])](#TreeUtils+prevSiblingAll) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.indexOf(siblings, nodeOrKey)](#TreeUtils+indexOf) ⇒ <code>number</code>
        * [.append(node, [tagart])](#TreeUtils+append)
        * [.prepend(node, [tagart])](#TreeUtils+prepend)
        * [.insertBefore(node, target)](#TreeUtils+insertBefore)
        * [.insertAfter(node, target)](#TreeUtils+insertAfter)
        * [.forward(node)](#TreeUtils+forward)
        * [.findNodes(nodes, predicate, [parents])](#TreeUtils+findNodes) ⇒ <code>Array.&lt;TreeNode&gt;</code>
        * [.filterNode(node, predicate, [parents])](#TreeUtils+filterNode) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.filterNodes(predicate, [nodes], [parents])](#TreeUtils+filterNodes) ⇒ <code>Array.&lt;TreeNode&gt;</code>
        * [.sortNode(node, compareFunction, [parents])](#TreeUtils+sortNode) ⇒ <code>TreeNode</code>
        * [.sortNodes(compareFunction, [nodes], [parents])](#TreeUtils+sortNodes) ⇒ <code>Array.&lt;TreeNode&gt;</code>
        * [.mapNode(node, mapFunction, [parents])](#TreeUtils+mapNode) ⇒ <code>TreeNode</code>
    * _static_
        * [.TreeUtils](#TreeUtils.TreeUtils)
            * [new TreeUtils([keyField], [childrenField])](#new_TreeUtils.TreeUtils_new)

<a name="new_TreeUtils_new"></a>

### new TreeUtils()
<p>Class Tree utils</p>

<a name="TreeUtils+walker"></a>

### treeUtils.walker(iterator, [nodes], [mode], [breakable])
<p>Touch every node in tree.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iterator | <code>function</code> |  | <p>(node, index, level) =&gt; void; If return true and breakable if true will break traversing.</p> |
| [nodes] | <code>Array.&lt;Node&gt;</code> \| <code>null</code> | <code>&#x27;null&#x27;</code> | <p>Nodes to traversing, defaults is root nodes of the tree.</p> |
| [mode] | <code>&#x27;depth&#x27;</code> \| <code>&#x27;breadth&#x27;</code> | <code>&#x27;depth&#x27;</code> | <p>Indicates depth-first or breadth-first priority when traversing.</p> |
| [breakable] | <code>boolean</code> | <code>false</code> | <p>Break traversing when iterator return true;</p> |

<a name="TreeUtils+hasChildren"></a>

### treeUtils.hasChildren(nodeOrKey) ⇒ <code>boolean</code>
<p>Checks if a node contains children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| nodeOrKey | <code>TreeNode</code> \| <code>String</code> | 

<a name="TreeUtils+isBranch"></a>

### treeUtils.isBranch(nodeOrKey) ⇒ <code>boolean</code>
<p>Checks if a node has children property (whether the children's length is 0 or not)</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| nodeOrKey | <code>TreeNode</code> \| <code>String</code> | 

<a name="TreeUtils+getNode"></a>

### treeUtils.getNode(key) ⇒ <code>TreeNode</code> \| <code>null</code>
<p>Get single node with a specific key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="TreeUtils+contains"></a>

### treeUtils.contains(parent, child) ⇒ <code>boolean</code>
<p>Checks if a node contains another node as children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>string</code> \| <code>TreeNode</code> | <p>Parent node or key of parent node.</p> |
| child | <code>string</code> \| <code>TreeNode</code> | <p>Child node or key of child node.</p> |

<a name="TreeUtils+containsDeeply"></a>

### treeUtils.containsDeeply(parent, child) ⇒ <code>boolean</code>
<p>Checks if a node contains another node as children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>string</code> \| <code>TreeNode</code> | <p>Parent node or key of parent node.</p> |
| child | <code>string</code> \| <code>TreeNode</code> | <p>Child node or key of child node.</p> |

<a name="TreeUtils+getParent"></a>

### treeUtils.getParent(key, [nodes]) ⇒ <code>TreeNode</code> \| <code>null</code>
<p>Get parent node of given key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  
**Returns**: <code>TreeNode</code> \| <code>null</code> - <p>return parent node of given key.</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>node key.</p> |
| [nodes] | <code>Array.&lt;TreeNode&gt;</code> | <p>Tree root nodes or specific nodes.</p> |

<a name="TreeUtils+siblingsAndSelf"></a>

### treeUtils.siblingsAndSelf(nodeOrKey, [nodes]) ⇒ <code>Array.&lt;TreeNode&gt;</code>
<p>Get siblings node and itself of given key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  
**Returns**: <code>Array.&lt;TreeNode&gt;</code> - <p>return siblings node and itself of given node or key.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node ke y.</p> |
| [nodes] | <code>Array.&lt;TreeNode&gt;</code> | <p>Tree root nodes or specific nodes.</p> |

<a name="TreeUtils+siblings"></a>

### treeUtils.siblings(nodes, nodeOrKey) ⇒ <code>Array.&lt;TreeNode&gt;</code>
<p>Get siblings node of given key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  
**Returns**: <code>Array.&lt;TreeNode&gt;</code> - <p>return siblings node of given node or key.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodes | <code>Array.&lt;TreeNode&gt;</code> | <p>Tree root nodes or specific nodes.</p> |
| nodeOrKey | <code>string</code> | <p>node or key of node.</p> |

<a name="TreeUtils+prevSibling"></a>

### treeUtils.prevSibling(nodeOrKey, [nodes]) ⇒ <code>TreeNode</code> \| <code>null</code>
<p>Get prev siblings node of given key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  
**Returns**: <code>TreeNode</code> \| <code>null</code> - <p>return prev siblings node of given key or NULL.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node key.</p> |
| [nodes] | <code>Array.&lt;TreeNode&gt;</code> | <p>Tree root nodes or specific nodes.</p> |

<a name="TreeUtils+nextSibling"></a>

### treeUtils.nextSibling(nodeOrKey, [nodes]) ⇒ <code>TreeNode</code> \| <code>null</code>
<p>Get next siblings node of given key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  
**Returns**: <code>TreeNode</code> \| <code>null</code> - <p>return next siblings node of given key or null.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node key.</p> |
| [nodes] | <code>Array.&lt;TreeNode&gt;</code> | <p>Tree root nodes or specific nodes.</p> |

<a name="TreeUtils+nextSiblingAll"></a>

### treeUtils.nextSiblingAll(nodeOrKey, [nodes]) ⇒ <code>TreeNode</code> \| <code>null</code>
<p>Get all next siblings node of given key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  
**Returns**: <code>TreeNode</code> \| <code>null</code> - <p>return next siblings node of given key or null.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node key.</p> |
| [nodes] | <code>Array.&lt;TreeNode&gt;</code> | <p>Tree root nodes or specific nodes.</p> |

<a name="TreeUtils+prevSiblingAll"></a>

### treeUtils.prevSiblingAll(nodeOrKey, [nodes]) ⇒ <code>TreeNode</code> \| <code>null</code>
<p>Get all prev siblings node of given key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  
**Returns**: <code>TreeNode</code> \| <code>null</code> - <p>return next siblings node of given key or null.</p>  

| Param | Type | Description |
| --- | --- | --- |
| nodeOrKey | <code>string</code> | <p>node or key.</p> |
| [nodes] | <code>Array.&lt;TreeNode&gt;</code> | <p>Tree root nodes or specific nodes.</p> |

<a name="TreeUtils+indexOf"></a>

### treeUtils.indexOf(siblings, nodeOrKey) ⇒ <code>number</code>
<p>Get node index of siblings.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| siblings | <code>Array.&lt;TreeNode&gt;</code> | 
| nodeOrKey | <code>TreeNode</code> \| <code>string</code> | 

<a name="TreeUtils+append"></a>

### treeUtils.append(node, [tagart])
<p>Append a new node into first of target node.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>TreeNode</code> | <p>A new node to append.</p> |
| [tagart] | <code>TreeNode</code> \| <code>string</code> | <p>where for appending to.</p> |

<a name="TreeUtils+prepend"></a>

### treeUtils.prepend(node, [tagart])
<p>Prepend a node into last of target node.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>TreeNode</code> | <p>A new node to prepend.</p> |
| [tagart] | <code>TreeNode</code> \| <code>string</code> | <p>Where to prepend.</p> |

<a name="TreeUtils+insertBefore"></a>

### treeUtils.insertBefore(node, target)
<p>Insert a new node before target</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| node | <code>TreeNode</code> | 
| target | <code>TreeNode</code> \| <code>string</code> | 

<a name="TreeUtils+insertAfter"></a>

### treeUtils.insertAfter(node, target)
<p>Insert a new node after target</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| node | <code>TreeNode</code> | 
| target | <code>TreeNode</code> \| <code>string</code> | 

<a name="TreeUtils+forward"></a>

### treeUtils.forward(node)
<p>Move a node before of previous siblings.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>TreeNode</code> \| <code>string</code> | <p>Node or key.</p> |

<a name="TreeUtils+findNodes"></a>

### treeUtils.findNodes(nodes, predicate, [parents]) ⇒ <code>Array.&lt;TreeNode&gt;</code>
<p>Find nodes via a custom function.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default |
| --- | --- | --- |
| nodes | <code>Array.&lt;TreeNode&gt;</code> |  | 
| predicate | <code>NodesFinder.&lt;TreeNode&gt;</code> |  | 
| [parents] | <code>Array.&lt;TreeNode&gt;</code> | <code>[]</code> | 

<a name="TreeUtils+filterNode"></a>

### treeUtils.filterNode(node, predicate, [parents]) ⇒ <code>TreeNode</code> \| <code>null</code>
<p>Filter for a single node and its children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default |
| --- | --- | --- |
| node | <code>TreeNode</code> |  | 
| predicate | <code>NodesFinder.&lt;TreeNode&gt;</code> |  | 
| [parents] | <code>Array.&lt;TreeNode&gt;</code> | <code>[]</code> | 

<a name="TreeUtils+filterNodes"></a>

### treeUtils.filterNodes(predicate, [nodes], [parents]) ⇒ <code>Array.&lt;TreeNode&gt;</code>
<p>Filter the given list of nodes and their children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default |
| --- | --- | --- |
| predicate | <code>NodesFinder.&lt;TreeNode&gt;</code> |  | 
| [nodes] | <code>Array.&lt;TreeNode&gt;</code> | <code>this.nodes</code> | 
| [parents] | <code>Array.&lt;TreeNode&gt;</code> | <code>[]</code> | 

<a name="TreeUtils+sortNode"></a>

### treeUtils.sortNode(node, compareFunction, [parents]) ⇒ <code>TreeNode</code>
<p>Sort children of givin node and return a new node with sorted children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default |
| --- | --- | --- |
| node | <code>TreeNode</code> |  | 
| compareFunction | <code>NodeSorter.&lt;TreeNode&gt;</code> |  | 
| [parents] | <code>Array.&lt;TreeNode&gt;</code> | <code>[]</code> | 

<a name="TreeUtils+sortNodes"></a>

### treeUtils.sortNodes(compareFunction, [nodes], [parents]) ⇒ <code>Array.&lt;TreeNode&gt;</code>
<p>Sort node list and their children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default |
| --- | --- | --- |
| compareFunction | <code>NodeSorter.&lt;TreeNode&gt;</code> |  | 
| [nodes] | <code>Array.&lt;TreeNode&gt;</code> |  | 
| [parents] | <code>Array.&lt;TreeNode&gt;</code> | <code>[]</code> | 

<a name="TreeUtils+mapNode"></a>

### treeUtils.mapNode(node, mapFunction, [parents]) ⇒ <code>TreeNode</code>
<p>Map node</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default |
| --- | --- | --- |
| node | <code>TreeNode</code> |  | 
| mapFunction | <code>NodeMapper.&lt;TreeNode&gt;</code> |  | 
| [parents] | <code>Array.&lt;TreeNode&gt;</code> | <code>[]</code> | 

<a name="TreeUtils.TreeUtils"></a>

### TreeUtils.TreeUtils
**Kind**: static class of [<code>TreeUtils</code>](#TreeUtils)  
<a name="new_TreeUtils.TreeUtils_new"></a>

#### new TreeUtils([keyField], [childrenField])
<p>Creates an instance of TreeUtils.</p>


| Param | Type |
| --- | --- |
| [keyField] | <code>KeyField</code> | 
| [childrenField] | <code>ChildrenField</code> | 

<a name="nextSiblingAll"></a>

## nextSiblingAll()
**Kind**: global function  
<a name="prevSiblingAll"></a>

## prevSiblingAll()
**Kind**: global function  
