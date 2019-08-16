<a name="TreeUtils"></a>

## TreeUtils
**Kind**: global class  

* [TreeUtils](#TreeUtils)
    * [new TreeUtils()](#new_TreeUtils_new)
    * _instance_
        * [.hasChildren(node)](#TreeUtils+hasChildren) ⇒ <code>boolean</code>
        * [.isBranch(node)](#TreeUtils+isBranch) ⇒ <code>boolean</code>
        * [.getNodeByKey(nodes, key)](#TreeUtils+getNodeByKey) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.findNodes(nodes, predicate, [parents])](#TreeUtils+findNodes) ⇒ <code>Array.&lt;TreeNode&gt;</code>
        * [.filterNode(node, predicate, [parents])](#TreeUtils+filterNode) ⇒ <code>TreeNode</code> \| <code>null</code>
        * [.filterNodes(nodes, predicate, [parents])](#TreeUtils+filterNodes) ⇒ <code>Array.&lt;TreeNode&gt;</code>
        * [.sortNode(node, compareFunction, [parents])](#TreeUtils+sortNode) ⇒ <code>TreeNode</code>
        * [.sortNodes(nodes, compareFunction, [parents])](#TreeUtils+sortNodes) ⇒ <code>Array.&lt;TreeNode&gt;</code>
        * [.mapNode(node, mapFunction, [parents])](#TreeUtils+mapNode) ⇒ <code>TreeNode</code>
    * _static_
        * [.TreeUtils](#TreeUtils.TreeUtils)
            * [new TreeUtils([keyField], [childrenField])](#new_TreeUtils.TreeUtils_new)

<a name="new_TreeUtils_new"></a>

### new TreeUtils()
<p>Class Tree utils</p>

<a name="TreeUtils+hasChildren"></a>

### treeUtils.hasChildren(node) ⇒ <code>boolean</code>
<p>Checks if a node contains children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| node | <code>TreeNode</code> | 

<a name="TreeUtils+isBranch"></a>

### treeUtils.isBranch(node) ⇒ <code>boolean</code>
<p>Checks if a node has children property (whether the children's length is 0 or not)</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| node | <code>TreeNode</code> | 

<a name="TreeUtils+getNodeByKey"></a>

### treeUtils.getNodeByKey(nodes, key) ⇒ <code>TreeNode</code> \| <code>null</code>
<p>Get single node with a specific key.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type |
| --- | --- |
| nodes | <code>Array.&lt;TreeNode&gt;</code> | 
| key | <code>string</code> | 

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

### treeUtils.filterNodes(nodes, predicate, [parents]) ⇒ <code>Array.&lt;TreeNode&gt;</code>
<p>Filter the given list of nodes and their children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default |
| --- | --- | --- |
| nodes | <code>Array.&lt;TreeNode&gt;</code> |  | 
| predicate | <code>NodesFinder.&lt;TreeNode&gt;</code> |  | 
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

### treeUtils.sortNodes(nodes, compareFunction, [parents]) ⇒ <code>Array.&lt;TreeNode&gt;</code>
<p>Sort node list and their children.</p>

**Kind**: instance method of [<code>TreeUtils</code>](#TreeUtils)  

| Param | Type | Default |
| --- | --- | --- |
| nodes | <code>Array.&lt;TreeNode&gt;</code> |  | 
| compareFunction | <code>NodeSorter.&lt;TreeNode&gt;</code> |  | 
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

