import { expect } from 'chai';
import { default as TreeUtils, } from '../../src/index';
import { data, Node, NodeProps, } from '../support/default-data';


describe('Tree utils tests with default data structures.', () => {

  let utils: TreeUtils<'key', 'children', NodeProps>;

  before(() => {
    utils = new TreeUtils<'key', 'children', NodeProps>('key', 'children');
  });

  after(() => {
    utils = null as any;
  });

  describe('@hasChildren( node: Node ).', () => {
    it('Should a node that has children must return `true`', () => {
      expect(utils.hasChildren(data[0])).equal(true);
      data[0].children && expect(utils.hasChildren(data[0].children[2])).equal(true);

      expect(utils.hasChildren(data[1])).equal(true);
      data[1].children && expect(utils.hasChildren(data[1].children[2])).equal(true);
    });

    it('Should a node that not has children must return `false`', () => {
      expect(utils.hasChildren(data[3])).equal(false);
      data[0].children && expect(utils.hasChildren(data[0].children[0])).equal(false);
      data[1].children && expect(utils.hasChildren(data[1].children[0])).equal(false);

    });

    it('Should a node\'s children length is 0 must return `false`', () => {
      expect(utils.hasChildren(data[3])).equal(false);
    });
  });

  describe('@isBranch( node: Node ).', () => {
    it('Should a node that has children must return `true`', () => {
      expect(utils.isBranch(data[0])).equal(true);
      data[0].children && expect(utils.isBranch(data[0].children[2])).equal(true);

      expect(utils.isBranch(data[1])).equal(true);
      data[1].children && expect(utils.isBranch(data[1].children[2])).equal(true);
    });

    it('Should a node that not has children must return `false`', () => {
      expect(utils.isBranch(data[2])).equal(false);
      data[0].children && expect(utils.isBranch(data[0].children[0])).equal(false);
      data[1].children && expect(utils.isBranch(data[1].children[0])).equal(false);
    });

    it('Should a node\'s children length is 0 must return `true`', () => {
      expect(utils.isBranch(data[3])).equal(true);
    });
  });

  describe('@getNodeByKey( nodes: Node[], key: string ).', () => {
    it('Should return Node when key is exists in nodes.', () => {
      expect(utils.getNodeByKey(data, 'foo')).to.haveOwnProperty('text');
      expect(utils.getNodeByKey(data, 'foo')).property('text', 'foo');
      expect(utils.getNodeByKey(data, 'xfoo')).property('children');
      expect(utils.getNodeByKey(data, 'xfoo2')).property('text', 'xfoo2');
      data[0].children && expect(utils.getNodeByKey(data[0].children, 'bar')).property('text', 'bar');
    });

    it('Should return Node when key is exists under of children.', () => {
      expect(utils.getNodeByKey(data, 'bar')).to.haveOwnProperty('text');
      expect(utils.getNodeByKey(data, 'bar')).property('text', 'bar');
      expect(utils.getNodeByKey(data, 'xpoo')).property('children');
      expect(utils.getNodeByKey(data, 'xpoo')).property('text', 'xpoo');
      expect(utils.getNodeByKey(data, 'xmoo')).property('text', 'xmoo');
    });

    it('Should return NULL when key is not exists.', () => {
      expect(utils.getNodeByKey(data, 'not_exists')).equal(null);
      expect(utils.getNodeByKey(data, 'not_exists_xxx')).equal(null);
    });
  });

  describe('@findNodes( nodes: Node[], filter: (nodes: Nodes[], parents: Node[]) => boolean ).', () => {

    it('should find single node', () => {
      const predicate = (node: Node) => node.key === 'xdar sar';
      const result = utils.findNodes(data, predicate);
      expect(result).to.deep.equal([{
        text: 'xdar sar',
        key: 'xdar sar',
      }]);
    });

    it('should find multiple nodes', () => {
      const predicate = (node: Node) => node.key.includes('oo') && !node.key.includes('x');
      const result = utils.findNodes(data, predicate);
      expect(result.map(node => node.key)).to.deep.equal(['foo', 'boo', 'poo', 'moo', 'koo']);
    });

    it('should find multiple nodes using parents', () => {
      const predicate = (node: Node, parents: Node[]) => {
        if (node.children) {
          return false;
        }
        return parents.map(parent => parent.text).some(text => text === 'xfoo');
      };
      const result = utils.findNodes(data, predicate);
      expect(result.map(node => node.key)).to.deep.equal(['xbar', 'xboo', 'xkar', 'xdar sar', 'xkoo']);
    });

  });

  describe('filterNodes', () => {

    it('should filter tree by a predicate function', () => {
      const result = utils.filterNodes(data, i => i.text.includes('x'));
      expect(result.length).to.equal(3);
      expect(result[0].key).to.equal('xfoo');
      expect(result[1].key).to.equal('xfoo2');
      expect(result[2].key).to.equal('xfoo3');
      result[0].children && result[0].children[2].children && expect(result[0].children[2].children[1].key).to.equal('xmoo');
    });

    it('should filter tree by parent nodes', () => {
      const result = utils.filterNodes(data, (i, parents) => {
        const parentMatched = parents.some(parent => parent.text.includes('poo'));
        const nodeMatched = i.text.includes('poo');
        return nodeMatched || parentMatched;
      });
      expect(result).to.deep.equal([
        {
          text: 'foo',
          key: 'foo',
          children: [
            {
              text: 'poo',
              key: 'poo',
              children: [
                {
                  text: 'kar',
                  key: 'kar',
                },
                {
                  text: 'moo',
                  key: 'moo',
                  children: [
                    {
                      text: 'dar sar',
                      key: 'dar sar',
                    },
                  ],
                },
                {
                  text: 'koo',
                  key: 'koo',
                },
              ],
            },
          ],
        },
        {
          text: 'xfoo',
          key: 'xfoo',
          children: [
            {
              text: 'xpoo',
              key: 'xpoo',
              children: [
                {
                  text: 'xkar',
                  key: 'xkar',
                },
                {
                  text: 'xmoo',
                  key: 'xmoo',
                  children: [
                    {
                      text: 'xdar sar',
                      key: 'xdar sar',
                    },
                  ],
                },
                {
                  text: 'xkoo',
                  key: 'xkoo',
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
      const compareFunc = (a: Node, b: Node) => a.text.localeCompare(b.text);
      let result: any = utils.sortNodes(data, compareFunc);
      expect(result[0].children[2].children.map((i: Node) => i.text)).to.deep.equal(['kar', 'koo', 'moo']);
      expect(result[1].children[2].children.map((i: Node) => i.text)).to.deep.equal(['xkar', 'xkoo', 'xmoo']);
    });

    it('should get sort nodes by parents', () => {
      const compareFunc = (a: Node, b: Node, parents?: Node[]) => {
        if (parents && parents.map(item => item.text).some(text => text.includes('x'))) {
          return b.text.localeCompare(a.text);
        }
        return a.text.localeCompare(b.text);
      };
      let result: any = utils.sortNodes(data, compareFunc);
      expect(result[0].children[2].children.map((i: Node) => i.text)).to.deep.equal(['kar', 'koo', 'moo']);
      expect(result[1].children[0].children.map((i: Node) => i.text)).to.deep.equal(['xmoo', 'xkoo', 'xkar']);
    });
  });

  describe('mapNodes', () => {
    it('should map sort nodes', () => {
      const mapFunc = (n: Node, parents: Node[] = []) =>
        ({...n, path: `${parents.length ? '/' : ''}${parents.map(parent => parent.key).join('/')}/${n.key}`});
      let result: any = utils.mapNodes(data, mapFunc);

      expect(result[0].path).to.equal('/foo');
      expect(result[0].children[2].children[1].path).to.equal('/foo/poo/moo');
    });
  });

});
