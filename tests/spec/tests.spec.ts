import { expect } from 'chai';
import { default as Tree, TreeNode, } from '../../src/index';
import { data as data1, NodeProps as np1, } from '../support/default-data';
import { data as data2, NodeProps as np2, } from '../support/custom-data';

function runTests <
  NodeProps,
  KeyField extends string,
  ChildrenField extends string
> (
  data: TreeNode<NodeProps, KeyField, ChildrenField>[],
  KEY: KeyField,
  CHILDREN: ChildrenField
) {
  type Node = TreeNode<NodeProps, KeyField, ChildrenField>;
  type Text = keyof NodeProps;
  let TEXT: Text = 'text' as keyof NodeProps;
  let utils: Tree<NodeProps, KeyField, ChildrenField> = new Tree<NodeProps, KeyField, ChildrenField>(data, KEY, CHILDREN);

  function createTree(text: string = 'new_node') {
    let data = utils.toJSON();
    let tree = new Tree<NodeProps, KeyField, ChildrenField>(data, KEY, CHILDREN);
    let node: TreeNode<NodeProps, KeyField, ChildrenField> = {
      [KEY as KeyField]: text,
      [TEXT as string]: text,
      [CHILDREN as ChildrenField]: [],
    } as TreeNode<NodeProps, KeyField, ChildrenField>;

    return {tree, data, node};
  }

  describe(`Tree utils tests with data structures: {${KEY}: string, ${CHILDREN}: [], ...props }.`, () => {

    describe('@toJSON()', () => {
      it ('toJSON', () => {
        expect(utils.toJSON()).to.deep.equal(data);
      })
    });

    describe('@toString()', () => {
      it ('covert tree to String with 4 space indents.', () => {
        expect(utils.toString(4)).equal(JSON.stringify(data, [], 4));
      });

      it ('covert tree to String with 2 space indents.', () => {
        expect(utils.toString(2)).equal(JSON.stringify(data, [], 2));
      });
    });

    describe('@hasChildren( node: Node ).', () => {
      it('Should node of given key that has children must return `true`', () => {
        expect(utils.hasChildren('moo')).equal(true);
        expect(utils.hasChildren('poo')).equal(true);

        expect(utils.hasChildren('xfoo')).equal(true);
        expect(utils.hasChildren('xmoo')).equal(true);
      });

      it('Should a not exists key must return `false`', () => {
        expect(utils.hasChildren('not_exists_key')).equal(false);
      });

      it('Should a node that has children must return `true`', () => {
        expect(utils.hasChildren(data[0])).equal(true);
        data[0][CHILDREN] && expect(utils.hasChildren(data[0][CHILDREN][2])).equal(true);

        expect(utils.hasChildren(data[1])).equal(true);
        data[1][CHILDREN] && expect(utils.hasChildren(data[1][CHILDREN][2])).equal(true);
      });

      it('Should a node that not has children must return `false`', () => {
        expect(utils.hasChildren(data[3])).equal(false);
        data[0][CHILDREN] && expect(utils.hasChildren(data[0][CHILDREN][0])).equal(false);
        data[1][CHILDREN] && expect(utils.hasChildren(data[1][CHILDREN][0])).equal(false);

      });

      it('Should a node\'s children length is 0 must return `false`', () => {
        expect(utils.hasChildren(data[3])).equal(false);
      });
    });

    describe('@isBranch( node: Node ).', () => {
      it('Should node of given key that has children must return `true`', () => {
        expect(utils.isBranch('xfoo3')).equal(true);
        expect(utils.isBranch('moo')).equal(true);
        expect(utils.isBranch('xfoo')).equal(true);
        expect(utils.isBranch('xmoo')).equal(true);
      });

      it('Should a node that not has children property must return `false`', () => {
        expect(utils.isBranch('xkar')).equal(false);
        expect(utils.isBranch('xboo')).equal(false);
      });

      it('Should a not exists key must return `false`', () => {
        expect(utils.isBranch('not_exists_key')).equal(false);
      });

      it('Should a node that has children must return `true`', () => {
        expect(utils.isBranch(data[0])).equal(true);
        data[0][CHILDREN] && expect(utils.isBranch(data[0][CHILDREN][2])).equal(true);

        expect(utils.isBranch(data[1])).equal(true);
        data[1][CHILDREN] && expect(utils.isBranch(data[1][CHILDREN][2])).equal(true);
      });

      it('Should a node that not has children must return `false`', () => {
        expect(utils.isBranch(data[2])).equal(false);
        data[0][CHILDREN] && expect(utils.isBranch(data[0][CHILDREN][0])).equal(false);
        data[1][CHILDREN] && expect(utils.isBranch(data[1][CHILDREN][0])).equal(false);
      });

      it('Should a node\'s children length is 0 must return `true`', () => {
        expect(utils.isBranch(data[3])).equal(true);
      });
    });

    describe('@getParent(key: string).', () => {
      it('Should return parent node of given key.', () => {
        expect(utils.getParent('bar')).property('text', 'foo');
        expect(utils.getParent('kar')).property('text', 'poo');
      });

      it('Should return NULL if given key has no parent.', () => {
        expect(utils.getParent('foo')).equal(null);
        expect(utils.getParent('xfoo')).equal(null);
        expect(utils.getParent('not_exists_key')).equal(null);
      });
    });

    describe('@contains(node: Node, keyOrNode: string).', () => {
      it('Should return true if node children contains given key.', () => {
        expect(utils.contains(data[0], 'bar')).eq(true);
        expect(utils.contains(data[0][CHILDREN][2], 'kar')).eq(true);
      });

      it('Should return false if node children not contains given key.', () => {
        expect(utils.contains(data[0], 'kar')).equal(false);
        expect(utils.contains(data[0][CHILDREN][2], 'bar')).equal(false);
      });

      it('Should return true if node children contains given node by second arg.', () => {
        expect(utils.contains(data[0], data[0][CHILDREN][2])).eq(true);
        expect(utils.contains(data[0], data[0][CHILDREN][0])).eq(true);
        expect(utils.contains(data[0][CHILDREN][2], data[0][CHILDREN][2][CHILDREN][1])).eq(true);
      });

      it('Should return false if node children not contains given node by second arg.', () => {
        expect(utils.contains(data[0], data[1])).equal(false);
        expect(utils.contains(data[0][CHILDREN][2], data[1])).equal(false);
      });
    });

    describe('@containsDeeply(node: Node, keyOrNode: string).', () => {
      it('Checks deeply if node’s children or posterity contains given key should return `true`.', () => {
        expect(utils.containsDeeply(data[0], 'bar')).eq(true);
        expect(utils.containsDeeply(data[0], 'kar')).eq(true);
        expect(utils.containsDeeply(data[0], 'dar sar')).eq(true);
        expect(utils.containsDeeply(data[1], 'xbar')).eq(true);
        expect(utils.containsDeeply(data[1], 'xkoo')).eq(true);
        expect(utils.containsDeeply(data[1], 'xdar sar')).eq(true);
      });

      it('Checks deeply if node’s children or posterity not contains given key should return `false`.', () => {
        expect(utils.containsDeeply(data[0], 'xfoo')).eq(false);
        expect(utils.containsDeeply(data[0], 'xkar')).eq(false);
        expect(utils.containsDeeply(data[0], 'xdar sar')).eq(false);
        expect(utils.containsDeeply(data[1], 'foo')).eq(false);
        expect(utils.containsDeeply(data[1], 'kar')).eq(false);
        expect(utils.containsDeeply(data[1], 'dar sar')).eq(false);
      });

      it('Checks deeply if node’s children or posterity contains given key should return `true`.', () => {
        expect(utils.containsDeeply('foo', 'bar')).eq(true);
        expect(utils.containsDeeply('foo', 'kar')).eq(true);
        expect(utils.containsDeeply('foo', 'dar sar')).eq(true);
        expect(utils.containsDeeply('xfoo', 'xbar')).eq(true);
        expect(utils.containsDeeply('xfoo', 'xkoo')).eq(true);
        expect(utils.containsDeeply('xfoo', 'xdar sar')).eq(true);
      });

      it('Checks deeply if node’s children or posterity not contains given key should return `false`.', () => {
        expect(utils.containsDeeply('foo', 'xfoo')).eq(false);
        expect(utils.containsDeeply('foo', 'xkar')).eq(false);
        expect(utils.containsDeeply('foo', 'xdar sar')).eq(false);
        expect(utils.containsDeeply('xfoo', 'foo')).eq(false);
        expect(utils.containsDeeply('xfoo', 'kar')).eq(false);
        expect(utils.containsDeeply('xfoo', 'dar sar')).eq(false);
      });
    });

    describe('@walker().', () => {
      it('Deep first.', () => {
        let res: string[] = [];
        let iterator = (node: any) => {
          if (res.length < 7) {
            res.push(node[KEY]);
          }
        }

        utils.walker(iterator, null, 'depth');

        expect(res).to.deep.eq(['foo', 'bar', 'boo', 'poo', 'kar', 'moo', 'dar sar']);
      });

      it('Deep first breakable.', () => {
        let res: string[] = [];
        let iterator = (node: any) => {
          res.push(node[KEY]);
          return node[KEY] === 'poo';
        }

        utils.walker(iterator, null, 'depth', true);

        expect(res).to.deep.eq(['foo', 'bar', 'boo', 'poo']);
      });

      it('Parallel first.', () => {
        let res: string[] = [];
        let iterator = (node: any) => {
          if (res.length < 5) {
            res.push(node[KEY]);
          }
        }

        utils.walker(iterator, null, 'breadth');

        expect(res).to.deep.eq(['foo', 'xfoo', 'xfoo2', 'xfoo3', 'bar']);
      });

      it('Parallel first breakable.', () => {
        let res: string[] = [];
        let iterator = (node: any) => {
          res.push(node[KEY]);
          return node[KEY] === 'xfoo2';
        }

        utils.walker(iterator, null, 'breadth', true);

        expect(res).to.deep.eq(['foo', 'xfoo', 'xfoo2']);
      });

      it('Parallel first breakable .', () => {
        let res: string[] = [];
        let iterator = (node: any) => {
          res.push(node[KEY]);
          return node[KEY] === 'poo';
        }

        utils.walker(iterator, null, 'breadth', true);

        expect(res).to.deep.eq(['foo', 'xfoo', 'xfoo2', 'xfoo3', 'bar', 'boo', 'poo']);
      });
    });

    describe('@siblings( key: string ).', () => {
      it('Should return siblings node of given key.', () => {
        expect(utils.siblings('foo')).length(3);
        expect(utils.siblings('bar')).length(2);
        expect(utils.siblings('poo')).to.deep.equal([
          {
            [TEXT]: 'bar',
            [KEY]: 'bar',
          },
          {
            [TEXT]: 'boo',
            [KEY]: 'boo',
          },
        ]);
      });

      it('Should return [] if given key has no siblings.', () => {
        expect(utils.siblings('xdar sar')).length(0);
        expect(utils.siblings('not_exists_key')).length(0);
      });
    });

    describe('@prevSibling( key: string ).', () => {
      it('Should return prevSibling node of given key.', () => {
        expect(utils.prevSiblings('xmoo')).property(KEY, 'xkar');
        expect(utils.prevSiblings('boo')).property(KEY, 'bar');
        expect(utils.prevSiblings('poo')).to.deep.equal(
          {
            [TEXT]: 'boo',
            [KEY]: 'boo',
          },
        );
      });

      it('Should return [] if given key has no prevSibling.', () => {
        expect(utils.prevSiblings('foo')).eq(null);
        expect(utils.prevSiblings('not_exists_key')).eq(null);
      });
    });

    describe('@nextSibling( key: string ).', () => {
      it('Should return nextSibling node of given key.', () => {
        expect(utils.nextSiblings('bar')).property(KEY, 'boo');
        expect(utils.nextSiblings('xkar')).property(KEY, 'xmoo');
        expect(utils.nextSiblings('moo')).to.deep.equal(
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
        );
      });

      it('Should return [] if given key has no nextSibling.', () => {
        expect(utils.nextSiblings('koo')).eq(null);
        expect(utils.nextSiblings('not_exists_key')).eq(null);
      });
    });

    describe('@prevSiblingAll( key: string ).', () => {
      it('Should return all prev siblings node of given key.', () => {
        expect(utils.prevSiblingsAll('xfoo3')).length(3);
        expect(utils.prevSiblingsAll('poo')).length(2);
        expect(utils.prevSiblingsAll('xfoo')).length(1);
        expect(utils.prevSiblingsAll('poo')).to.deep.equal([
          {
            [TEXT]: 'bar',
            [KEY]: 'bar',
          },
          {
            [TEXT]: 'boo',
            [KEY]: 'boo',
          },
        ]);
      });

      it('Should return [] if given key has no prev siblings.', () => {
        expect(utils.prevSiblingsAll('bar')).length(0);
        expect(utils.prevSiblingsAll('kar')).length(0);
        expect(utils.prevSiblingsAll('not_exists_key')).length(0);
      });
    });

    describe('@prevSiblingAll( node: Node ).', () => {
      it('Should return all prev siblings node of given node.', () => {
        expect(utils.prevSiblingsAll(data[3])).length(3);
        expect(utils.prevSiblingsAll(data[2])).length(2);
        expect(utils.prevSiblingsAll(data[0][CHILDREN][2])).length(2);
        expect(utils.prevSiblingsAll(data[1][CHILDREN][2])).length(2);
        expect(utils.prevSiblingsAll(data[0][CHILDREN][2])).to.deep.equal([
          {
            [TEXT]: 'bar',
            [KEY]: 'bar',
          },
          {
            [TEXT]: 'boo',
            [KEY]: 'boo',
          },
        ]);
      });

      it('Should return [] if given node has no prev siblings.', () => {
        expect(utils.prevSiblingsAll(data[0])).length(0);
        expect(utils.prevSiblingsAll(data[0][CHILDREN][0])).length(0);
      });
    });

    describe('@nextSiblingAll( key: string ).', () => {
      it('Should return all next siblings node of given key.', () => {
        expect(utils.nextSiblingsAll('kar')).length(2);
        expect(utils.nextSiblingsAll('xfoo')).to.deep.equal([
          {
            [TEXT]: 'xfoo2',
            [KEY]: 'xfoo2',
          },
          {
            [TEXT]: 'xfoo3',
            [KEY]: 'xfoo3',
            [CHILDREN]: [],
          },
        ]);
      });

      it('Should return [] if given key has no next siblings.', () => {
        expect(utils.nextSiblingsAll('koo')).length(0);
        expect(utils.nextSiblingsAll('not_exists_key')).length(0);
      });
    });

    describe('@nextSiblingAll( node: Node ).', () => {
      it('Should return all next siblings node of given node.', () => {
        expect(utils.nextSiblingsAll(data[0][CHILDREN][0])).length(2);
        expect(utils.nextSiblingsAll(data[0][CHILDREN][1])).length(1);
        expect(utils.nextSiblingsAll(data[1])).to.deep.equal([
          {
            [TEXT]: 'xfoo2',
            [KEY]: 'xfoo2',
          },
          {
            [TEXT]: 'xfoo3',
            [KEY]: 'xfoo3',
            [CHILDREN]: [],
          },
        ]);
        expect(utils.nextSiblingsAll(data[1][CHILDREN][2][CHILDREN][0])).to.deep.equal([
          {
            [TEXT]: 'xmoo',
            [KEY]: 'xmoo',
            [CHILDREN]: [
              {
                [TEXT]: 'xdar sar',
                [KEY]: 'xdar sar',
              },
            ],
          },
          {
            [TEXT]: 'xkoo',
            [KEY]: 'xkoo',
          },
        ]);
      });

      it('Should return [] if given node has no next siblings.', () => {
        expect(utils.nextSiblingsAll(data[3])).length(0);
        expect(utils.nextSiblingsAll(data[1][CHILDREN][2][CHILDREN][2])).length(0);
      });
    });

    describe('@siblingsAndSelf( key: string ).', () => {
      it('Should return siblings node of given key.', () => {
        expect(utils.siblingsAndSelf('foo')).length(4);
        expect(utils.siblingsAndSelf('bar')).length(3);
        expect(utils.siblingsAndSelf('dar sar')).to.deep.equal([{
          [TEXT]: 'dar sar',
          [KEY]: 'dar sar',
        }]);
        expect(utils.siblingsAndSelf('poo')).to.deep.equal([
          {
            [TEXT]: 'bar',
            [KEY]: 'bar',
          },
          {
            [TEXT]: 'boo',
            [KEY]: 'boo',
          },
          {
            [TEXT]: 'poo',
            [KEY]: 'poo',
            [CHILDREN]: [
              {
                [TEXT]: 'kar',
                [KEY]: 'kar',
              },
              {
                [TEXT]: 'moo',
                [KEY]: 'moo',
                [CHILDREN]: [
                  {
                    [TEXT]: 'dar sar',
                    [KEY]: 'dar sar',
                  },
                ],
              },
              {
                [TEXT]: 'koo',
                [KEY]: 'koo',
              },
            ],
          },
        ]);
      });

      it('Should return [] if given key has no siblings.', () => {
        expect(utils.siblings('xdar sar')).length(0);
        expect(utils.siblings('not_exists_key')).length(0);
      });
    });

    describe('@indexOf( node: Node | string, siblings: Node[] ).', () => {
      it('Get  key\'s index in children of it parent', () => {
        expect(utils.indexOf('foo')).eq(0);
        expect(utils.indexOf('boo')).eq(1);
        expect(utils.indexOf('koo')).eq(2);
      });

      it('Get  key\'s index in given siblings', () => {
        expect(utils.indexOf('foo', data)).eq(0);
        expect(utils.indexOf('boo', data[0][CHILDREN])).eq(1);
        expect(utils.indexOf('koo', data[0][CHILDREN][2][CHILDREN])).eq(2);
      });

      it('Get node index in children of it parent', () => {
        expect(utils.indexOf(data[0])).eq(0);
        expect(utils.indexOf(data[0][CHILDREN][1])).eq(1);
        expect(utils.indexOf(data[0][CHILDREN][2][CHILDREN][2])).eq(2);
      });

      it('Get node index in given siblings', () => {
        expect(utils.indexOf(data[0], data)).eq(0);
        expect(utils.indexOf(data[0][CHILDREN][1], data[0][CHILDREN])).eq(1);
        expect(utils.indexOf(data[0][CHILDREN][2][CHILDREN][2], data[0][CHILDREN][2][CHILDREN])).eq(2);
      });

      it('Get node index will return -1 if node not exists.', () => {
        expect(utils.indexOf('not_exists_ket')).eq(-1);
        expect(utils.indexOf('not_exists_ket', data)).eq(-1);
      });

      it('Get index will return -1 if given nodeList not contains node.', () => {
        expect(utils.indexOf(data[1][CHILDREN][1], data[0][CHILDREN])).eq(-1);
        expect(utils.indexOf(data[1][CHILDREN][1], data)).eq(-1);
      });
    });

    describe('@append( node: Node, tagart: Node | string ).', () => {

      it('Append new node will be added to end of target specified by key.', () => {
        const text = 'append-1'
        const { tree, data, node } = createTree(text);
        tree.append(node, 'poo');

        let n = data[0][CHILDREN][2][CHILDREN];
        expect(n).length(4);
        expect(n[n.length - 1]).property(KEY, text);
      });

      it(`Append new node to the target specified by key that not has ${ CHILDREN } property.`, () => {
        const text = 'append-2'
        const { tree, data, node } = createTree(text);
        tree.append(node, 'bar');

        let n = data[0][CHILDREN][0];
        expect(n).property(CHILDREN);
        expect(n[CHILDREN]).length(1);
        expect(n[CHILDREN][0]).property(KEY, text);
      });

      it('Append new node will be added to end of target node.', () => {
        const text = 'append-3'
        const { tree, data, node } = createTree(text);
        tree.append(node, data[1][CHILDREN][2]);

        let n = data[1][CHILDREN][2][CHILDREN];
        expect(n).length(4);
        expect(n[n.length - 1]).property(KEY, text);
      });

      it(`Append new node to the target node that not has ${ CHILDREN } property.`, () => {
        const text = 'append-4'
        const { tree, data, node } = createTree(text);
        tree.append(node, data[1][CHILDREN][0]);

        let n = data[1][CHILDREN][0];
        expect(n).property(CHILDREN);
        expect(n[CHILDREN]).length(1);
        expect(n[CHILDREN][0]).property(KEY, text);
      });

      it('Append new node will be added to root if target is not provided.', () => {
        const text = 'append-5'
        const { tree, data, node } = createTree(text);
        tree.append(node);
        expect(data).length(5);
        expect(data[data.length - 1]).property(KEY, text);
      });
    });

    describe('@prepend( node: Node, tagart: Node | string ).', () => {
      it('Prepend new node will be added to end of target specified by key.', () => {
        const text = 'prepend-1'
        const { tree, data, node } = createTree(text);
        tree.prepend(node, 'poo');

        let n = data[0][CHILDREN][2][CHILDREN];
        expect(n).length(4);
        expect(n[0]).property(KEY, text);
      });

      it(`Prepend new node to the target specified by key that not has ${ CHILDREN } property.`, () => {
        const text = 'prepend-2'
        const { tree, data, node } = createTree(text);
        tree.prepend(node, 'bar');

        let n = data[0][CHILDREN][0];
        expect(n).property(CHILDREN);
        expect(n[CHILDREN]).length(1);
        expect(n[CHILDREN][0]).property(KEY, text);
      });

      it('Prepend new node will be added to end of target node.', () => {
        const text = 'prepend-3'
        const { tree, data, node } = createTree(text);
        tree.prepend(node, data[1][CHILDREN][2]);

        let n = data[1][CHILDREN][2][CHILDREN];
        expect(n).length(4);
        expect(n[0]).property(KEY, text);
      });

      it(`Prepend new node to the target node that not has ${ CHILDREN } property.`, () => {
        const text = 'prepend-4'
        const { tree, data, node } = createTree(text);
        tree.prepend(node, data[1][CHILDREN][0]);

        let n = data[1][CHILDREN][0];
        expect(n).property(CHILDREN);
        expect(n[CHILDREN]).length(1);
        expect(n[CHILDREN][0]).property(KEY, text);
      });

      it('Prepend new node will be added to root if target is not provided.', () => {
        const text = 'prepend-5'
        const { tree, data, node } = createTree(text);
        tree.prepend(node);
        expect(data).length(5);
        expect(data[0]).property(KEY, text);
      });
    });

    describe('@insertBefore( node: Node | string, target: Node | string ).', () => {
      it('Insert new node before target that specified by key.', () => {
        const text = 'ins-before-1'
        const { tree, data, node } = createTree(text);
        tree.insertBefore(node, 'bar');

        let n = data[0][CHILDREN];
        expect(n).length(4);
        expect(n[0]).property(KEY, text);
      });

      it('Insert new node before target that specified by key.', () => {
        const text = 'ins-before-2'
        const { tree, data, node } = createTree(text);
        tree.insertBefore(node, 'koo');

        let n = data[0][CHILDREN][2][CHILDREN];
        expect(n).length(4);
        expect(n[2]).property(KEY, text);
      });

      it('Insert new node before specified target node.', () => {
        const text = 'ins-before-1'
        const { tree, data, node } = createTree(text);
        tree.insertBefore(node, data[0][CHILDREN][0]);

        let n = data[0][CHILDREN];
        expect(n).length(4);
        expect(n[0]).property(KEY, text);
      });

      it('Insert new node before specified target node.', () => {
        const text = 'ins-before-2'
        const { tree, data, node } = createTree(text);
        tree.insertBefore(node, data[0][CHILDREN][2][CHILDREN][2]);

        let n = data[0][CHILDREN][2][CHILDREN];
        expect(n).length(4);
        expect(n[2]).property(KEY, text);
      });
    });

    describe('@insertAfter( node: Node | string, target: Node | string ).', () => {
      it('Insert new node after target that specified by key.', () => {
        const text = 'ins-after-1'
        const { tree, data, node } = createTree(text);
        tree.insertAfter(node, 'bar');

        let n = data[0][CHILDREN];
        expect(n).length(4);
        expect(n[1]).property(KEY, text);
      });

      it('Insert new node after target that specified by key.', () => {
        const text = 'ins-after-2'
        const { tree, data, node } = createTree(text);
        tree.insertAfter(node, 'koo');

        let n = data[0][CHILDREN][2][CHILDREN];
        expect(n).length(4);
        expect(n[3]).property(KEY, text);
      });

      it('Insert new node after specified target node.', () => {
        const text = 'ins-after-1'
        const { tree, data, node } = createTree(text);
        tree.insertAfter(node, data[0][CHILDREN][0]);

        let n = data[0][CHILDREN];
        expect(n).length(4);
        expect(n[1]).property(KEY, text);
      });

      it('Insert new node after specified target node.', () => {
        const text = 'ins-after-2'
        const { tree, data, node } = createTree(text);
        tree.insertAfter(node, data[0][CHILDREN][2][CHILDREN][2]);

        let n = data[0][CHILDREN][2][CHILDREN];
        expect(n).length(4);
        expect(n[3]).property(KEY, text);
      });
    });

    describe('@forward( key: Node | string ).', () => {
      it('[1] move forwards a node specificed by key.', () => {
        const text = 'ins-after-1'
        const { tree, data, } = createTree(text);
        tree.forward('moo');
        expect(data[0][CHILDREN][2][CHILDREN][0]).property(KEY, 'moo');
        expect(data[0][CHILDREN][2][CHILDREN][1]).property(KEY, 'kar');
        expect(data[0][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'moo',
            [KEY]: 'moo',
            [CHILDREN]: [
              {
                [TEXT]: 'dar sar',
                [KEY]: 'dar sar',
              },
            ],
          },
          {
            [TEXT]: 'kar',
            [KEY]: 'kar',
          },
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
        ])
      });

      it('[2] move forwards a node specificed by key.', () => {
        const text = 'ins-after-1'
        const { tree, data, } = createTree(text);
        tree.forward('kar');
        expect(data[0][CHILDREN][2][CHILDREN][0]).property(KEY, 'kar');
        expect(data[0][CHILDREN][2][CHILDREN][1]).property(KEY, 'moo');
        expect(data[0][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'kar',
            [KEY]: 'kar',
          },
          {
            [TEXT]: 'moo',
            [KEY]: 'moo',
            [CHILDREN]: [
              {
                [TEXT]: 'dar sar',
                [KEY]: 'dar sar',
              },
            ],
          },
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
        ])
      });

      it('[1] move forwards a specificed node.', () => {
        const text = 'ins-after-1'
        const { tree, data, } = createTree(text);
        tree.forward(data[0][CHILDREN][2][CHILDREN][1]);
        expect(data[0][CHILDREN][2][CHILDREN][0]).property(KEY, 'moo');
        expect(data[0][CHILDREN][2][CHILDREN][1]).property(KEY, 'kar');
        expect(data[0][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'moo',
            [KEY]: 'moo',
            [CHILDREN]: [
              {
                [TEXT]: 'dar sar',
                [KEY]: 'dar sar',
              },
            ],
          },
          {
            [TEXT]: 'kar',
            [KEY]: 'kar',
          },
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
        ])
      });

      it('[2] move forwards a specificed node.', () => {
        const text = 'ins-after-1'
        const { tree, data, } = createTree(text);
        tree.forward(data[0][CHILDREN][2][CHILDREN][0]);
        expect(data[0][CHILDREN][2][CHILDREN][0]).property(KEY, 'kar');
        expect(data[0][CHILDREN][2][CHILDREN][1]).property(KEY, 'moo');
        expect(data[0][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'kar',
            [KEY]: 'kar',
          },
          {
            [TEXT]: 'moo',
            [KEY]: 'moo',
            [CHILDREN]: [
              {
                [TEXT]: 'dar sar',
                [KEY]: 'dar sar',
              },
            ],
          },
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
        ])
      });
    });

    describe('@backward( key: Node | string ).', () => {
      it('[1] move backwards a node specificed by key.', () => {
        const text = 'backward-1'
        const { tree, data, } = createTree(text);
        tree.backward('moo');
        expect(data[0][CHILDREN][2][CHILDREN][1]).property(KEY, 'koo');
        expect(data[0][CHILDREN][2][CHILDREN][2]).property(KEY, 'moo');
        expect(data[0][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'kar',
            [KEY]: 'kar',
          },
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
          {
            [TEXT]: 'moo',
            [KEY]: 'moo',
            [CHILDREN]: [
              {
                [TEXT]: 'dar sar',
                [KEY]: 'dar sar',
              },
            ],
          },
        ])
      });

      it('[2] move backwards a node specificed by key.', () => {
        const text = 'backward-2'
        const { tree, data, } = createTree(text);
        tree.backward('koo');
        expect(data[0][CHILDREN][2][CHILDREN][1]).property(KEY, 'moo');
        expect(data[0][CHILDREN][2][CHILDREN][2]).property(KEY, 'koo');
        expect(data[0][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'kar',
            [KEY]: 'kar',
          },
          {
            [TEXT]: 'moo',
            [KEY]: 'moo',
            [CHILDREN]: [
              {
                [TEXT]: 'dar sar',
                [KEY]: 'dar sar',
              },
            ],
          },
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
        ])
      });

      it('[1] move backwards a specificed node.', () => {
        const text = 'backward-3'
        const { tree, data, } = createTree(text);
        tree.backward(data[0][CHILDREN][2][CHILDREN][1]);
        expect(data[0][CHILDREN][2][CHILDREN][1]).property(KEY, 'koo');
        expect(data[0][CHILDREN][2][CHILDREN][2]).property(KEY, 'moo');
        expect(data[0][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'kar',
            [KEY]: 'kar',
          },
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
          {
            [TEXT]: 'moo',
            [KEY]: 'moo',
            [CHILDREN]: [
              {
                [TEXT]: 'dar sar',
                [KEY]: 'dar sar',
              },
            ],
          },
        ])
      });

      it('[2] move backwards a specificed node.', () => {
        const text = 'backward-4'
        const { tree, data, } = createTree(text);
        tree.backward(data[0][CHILDREN][2][CHILDREN][2]);
        expect(data[0][CHILDREN][2][CHILDREN][1]).property(KEY, 'moo');
        expect(data[0][CHILDREN][2][CHILDREN][2]).property(KEY, 'koo');
        expect(data[0][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'kar',
            [KEY]: 'kar',
          },
          {
            [TEXT]: 'moo',
            [KEY]: 'moo',
            [CHILDREN]: [
              {
                [TEXT]: 'dar sar',
                [KEY]: 'dar sar',
              },
            ],
          },
          {
            [TEXT]: 'koo',
            [KEY]: 'koo',
          },
        ])
      });
    });

    describe('@remove( key: Node | string ).', () => {
      it('remove node by given key from root.', () => {
        const { tree, data, } = createTree();
        tree.remove('foo');
        expect(data).length(3);
        expect(data[0]).property(KEY, 'xfoo');
      });

      it('[1] remove node by given key from deep children.', () => {
        const { tree, data, } = createTree();
        tree.remove('xkar');
        expect(data[1][CHILDREN][2][CHILDREN]).length(2);
        expect(data[1][CHILDREN][2][CHILDREN][0]).property(KEY, 'xmoo');
      });

      it('[2] remove node by given key from deep children.', () => {
        const { tree, data, } = createTree();
        tree.remove('xkoo');
        expect(data[1][CHILDREN][2][CHILDREN]).length(2);
        expect(data[1][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'xkar',
            [KEY]: 'xkar',
          },
          {
            [TEXT]: 'xmoo',
            [KEY]: 'xmoo',
            [CHILDREN]: [
              {
                [TEXT]: 'xdar sar',
                [KEY]: 'xdar sar',
              },
            ],
          },
        ]);
      });

      it('remove given node from root.', () => {
        const { tree, data, } = createTree();
        tree.remove(data[0]);
        expect(data).length(3);
        expect(data[0]).property(KEY, 'xfoo');
      });

      it('[1] remove given node from deep children.', () => {
        const { tree, data, } = createTree();
        tree.remove(data[1][CHILDREN][2][CHILDREN][0]);
        expect(data[1][CHILDREN][2][CHILDREN]).length(2);
        expect(data[1][CHILDREN][2][CHILDREN][0]).property(KEY, 'xmoo');
      });

      it('[2] remove given node from deep children.', () => {
        const { tree, data, } = createTree();
        tree.remove(data[1][CHILDREN][2][CHILDREN][2]);
        expect(data[1][CHILDREN][2][CHILDREN]).length(2);
        expect(data[1][CHILDREN][2][CHILDREN]).to.deep.eq([
          {
            [TEXT]: 'xkar',
            [KEY]: 'xkar',
          },
          {
            [TEXT]: 'xmoo',
            [KEY]: 'xmoo',
            [CHILDREN]: [
              {
                [TEXT]: 'xdar sar',
                [KEY]: 'xdar sar',
              },
            ],
          },
        ]);
      });
    });

    describe('@getNode( key: string ).', () => {
      it('Should return Node when key is exists in nodes.', () => {
        expect(utils.getNode('foo')).to.haveOwnProperty(TEXT as string);
        expect(utils.getNode('foo')).property(TEXT as string, 'foo');
        expect(utils.getNode('xfoo')).property(CHILDREN);
        expect(utils.getNode('xfoo2')).property(TEXT as string, 'xfoo2');
        expect(utils.getNode('bar')).property(TEXT as string, 'bar');
      });

      it('Should return Node when key is exists under of children.', () => {
        expect(utils.getNode('bar')).to.haveOwnProperty(TEXT as string);
        expect(utils.getNode('bar')).property(TEXT as string, 'bar');
        expect(utils.getNode('xpoo')).property(CHILDREN);
        expect(utils.getNode('xpoo')).property(TEXT as string, 'xpoo');
        expect(utils.getNode('xmoo')).property(TEXT as string, 'xmoo');
      });

      it('Should return NULL when key is not exists.', () => {
        expect(utils.getNode('not_exists')).equal(null);
        expect(utils.getNode('not_exists_xxx')).equal(null);
      });
    });

    describe('@findNodes( filter: (node: Node, parents: Node[]) => boolean ).', () => {
      it('should find single node', () => {
        const predicate = (node: Node) => node[KEY] === 'xdar sar';
        const result = utils.findNodes(predicate);
        expect(result).to.deep.equal([{
          [TEXT]: 'xdar sar',
          [KEY]: 'xdar sar',
        }]);
      });

      it('should find multiple nodes', () => {
        const predicate = (node: Node) => node[KEY].includes('oo') && !node[KEY].includes('x');
        const result = utils.findNodes(predicate);
        expect(result.map(node => node[KEY])).to.deep.equal(['foo', 'boo', 'poo', 'moo', 'koo']);
      });

      it('should find multiple nodes using parents', () => {
        const predicate = (node: Node, parents: Node[]) => {
          if (node[CHILDREN]) {
            return false;
          }
          return parents.map(parent => parent[TEXT]).some(text => text === 'xfoo');
        };
        const result = utils.findNodes(predicate);
        expect(result.map(node => node[KEY])).to.deep.equal(['xbar', 'xboo', 'xkar', 'xdar sar', 'xkoo']);
      });
    });

    describe('filterNodes', () => {
      it('should filter tree by a predicate function', () => {
        const result = utils.filterNodes(i => i[TEXT].includes('x'));
        expect(result.length).to.equal(3);
        expect(result[0][KEY]).to.equal('xfoo');
        expect(result[1][KEY]).to.equal('xfoo2');
        expect(result[2][KEY]).to.equal('xfoo3');
        result[0][CHILDREN] && result[0][CHILDREN][2][CHILDREN] && expect(result[0][CHILDREN][2][CHILDREN][1][KEY]).to.equal('xmoo');
      });

      it('should filter tree by parent nodes', () => {
        const result = utils.filterNodes((i, parents) => {
          const parentMatched = parents.some(parent => parent[TEXT].includes('poo'));
          const nodeMatched = i[TEXT].includes('poo');
          return nodeMatched || parentMatched;
        });
        expect(result).to.deep.equal([
          {
            [TEXT]: 'foo',
            [KEY]: 'foo',
            [CHILDREN]: [
              {
                [TEXT]: 'poo',
                [KEY]: 'poo',
                [CHILDREN]: [
                  {
                    [TEXT]: 'kar',
                    [KEY]: 'kar',
                  },
                  {
                    [TEXT]: 'moo',
                    [KEY]: 'moo',
                    [CHILDREN]: [
                      {
                        [TEXT]: 'dar sar',
                        [KEY]: 'dar sar',
                      },
                    ],
                  },
                  {
                    [TEXT]: 'koo',
                    [KEY]: 'koo',
                  },
                ],
              },
            ],
          },
          {
            [TEXT]: 'xfoo',
            [KEY]: 'xfoo',
            [CHILDREN]: [
              {
                [TEXT]: 'xpoo',
                [KEY]: 'xpoo',
                [CHILDREN]: [
                  {
                    [TEXT]: 'xkar',
                    [KEY]: 'xkar',
                  },
                  {
                    [TEXT]: 'xmoo',
                    [KEY]: 'xmoo',
                    [CHILDREN]: [
                      {
                        [TEXT]: 'xdar sar',
                        [KEY]: 'xdar sar',
                      },
                    ],
                  },
                  {
                    [TEXT]: 'xkoo',
                    [KEY]: 'xkoo',
                  },
                ],
              },
            ],
          },
        ]);
      });
    });

    describe('sortNodes', () => {
      it('should get sort nodes', () => {
        const compareFunc = (a: Node, b: Node) => a[TEXT].localeCompare(b[TEXT]);
        let result: any = utils.sortNodes(compareFunc);
        expect(result[0][CHILDREN][2][CHILDREN].map((i: Node) => i[TEXT])).to.deep.equal(['kar', 'koo', 'moo']);
        expect(result[1][CHILDREN][2][CHILDREN].map((i: Node) => i[TEXT])).to.deep.equal(['xkar', 'xkoo', 'xmoo']);
      });

      it('should get sort nodes by parents', () => {
        const compareFunc = (a: Node, b: Node, parents?: Node[]) => {
          if (parents && parents.map(item => item[TEXT]).some(text => text.includes('x'))) {
            return b[TEXT].localeCompare(a[TEXT]);
          }
          return a[TEXT].localeCompare(b[TEXT]);
        };
        let result: any = utils.sortNodes(compareFunc);
        expect(result[0][CHILDREN][2][CHILDREN].map((i: Node) => i[TEXT])).to.deep.equal(['kar', 'koo', 'moo']);
        expect(result[1][CHILDREN][0][CHILDREN].map((i: Node) => i[TEXT])).to.deep.equal(['xmoo', 'xkoo', 'xkar']);
      });
    });

    describe('mapNodes', () => {
      it('should map sort nodes', () => {
        const mapFunc = (n: Node, parents: Node[] = []) =>
          ({...n, path: `${parents.length ? '/' : ''}${parents.map(parent => parent[KEY]).join('/')}/${n[KEY]}`});
        let result: any = utils.mapNodes(mapFunc);

        expect(result[0].path).to.equal('/foo');
        expect(result[0][CHILDREN][2][CHILDREN][1].path).to.equal('/foo/poo/moo');
      });
    });
  });
}

runTests<np1, 'key', 'children'>(data1, 'key', 'children');
runTests<np2, 'id', 'list'>(data2, 'id', 'list');
