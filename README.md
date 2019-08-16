# Tree utils [![Build Status](https://travis-ci.org/luozhihua/tree-utils.svg?branch=master)](https://travis-ci.org/luozhihua/tree-utils)

Tree utils for `Typescript` and `Javascript`;

## Install

```bash
npm install @colin-luo/tree-utils
```

## Examples

### Javascript

with default data structure (has `key` and `children` properties).

```Javascript
import TreeUtils from '@colin-luo/tree-utils';

const data = [
  {key: 'a', label: 'A', icon: 'a.svg'},
  {key: 'b', label: 'B', icon: 'b.svg', children: [
    {key: 'b-a', label: 'B-A', icon: 'b-a.svg'},
    {key: 'b-b', label: 'B-B', icon: 'b-b.svg'},
  ]},
  {key: 'c', label: 'C', icon: 'c.svg', children: []},
];

const tree2 = new TreeUtils();

tree.hasChildren(data[0]) // => false
tree.hasChildren(data[1]) // => true
tree.hasChildren(data[2]) // => false

tree2.hasChildren(data[0]) // => false
tree2.hasChildren(data[1]) // => true
tree2.hasChildren(data[2]) // => false
```

with custom data structure (`id` as key fieldname and `sublist` as children fieldname)

```Javascript
import TreeUtils from '@colin-luo/tree-utils';

const data = [
  {id: 'a', label: 'A', icon: 'a.svg'},
  {id: 'b', label: 'B', icon: 'b.svg', sublist: [
    {id: 'b-a', label: 'B-A', icon: 'b-a.svg'},
    {id: 'b-b', label: 'B-B', icon: 'b-b.svg'},
  ]},
  {id: 'c', label: 'C', icon: 'c.svg', sublist: []},
];

const tree = new TreeUtils('id', 'sublist');

tree.hasChildren(data[0]) // => false
tree.hasChildren(data[1]) // => true
tree.hasChildren(data[2]) // => false
```

### Typescript

with default data structure (has `key` and `children` properties).

```typescript
import TreeUtils from '@colin-luo/tree-utils';

innterface NodeProps {
  key: string;
  children: NodeProps[];
  label: string;
  icon: string;
}

const data = [
  {key: 'a', label: 'A', icon: 'a.svg'},
  {key: 'b', label: 'B', icon: 'b.svg', children: [
    {key: 'b-a', label: 'B-A', icon: 'b-a.svg'},
    {key: 'b-b', label: 'B-B', icon: 'b-b.svg'},
  ]},
  {key: 'c', label: 'C', icon: 'c.svg', children: []},
];

const tree = new TreeUtils<'key', 'children', NodeProps>('key', 'children');
const tree2 = new TreeUtils<NodeProps>();

tree.hasChildren(data[0]) // => false
tree.hasChildren(data[1]) // => true
tree.hasChildren(data[2]) // => false

tree2.hasChildren(data[0]) // => false
tree2.hasChildren(data[1]) // => true
tree2.hasChildren(data[2]) // => false
```

with custom data structure (`id` as key fieldname and `sublist` as children fieldname)

```typescript
import TreeUtils from '@colin-luo/tree-utils';

innterface NodeProps {
  id: string;
  sublist: NodeProps[];
  text: string;
  avatar: string;
}

const data = [
  {id: 'a', text: 'A', avatar: 'a.svg'},
  {id: 'b', text: 'B', avatar: 'b.svg', sublist: [
    {id: 'b-a', text: 'B-A', avatar: 'b-a.svg'},
    {id: 'b-b', text: 'B-B', avatar: 'b-b.svg'},
  ]},
  {id: 'c', text: 'C', avatar: 'c.svg', sublist: []},
];

const tree = new TreeUtils<'id', 'sublist', NodeProps>('id', 'sublist');

tree.hasChildren(data[0]) // => false
tree.hasChildren(data[1]) // => true
tree.hasChildren(data[2]) // => false
```

## Api documentation

[Api documentation](./documentation.md)
