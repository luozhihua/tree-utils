import { TreeNode } from '../../src/index';

export interface NodeProps {
  text: string;
}

export type Node = TreeNode<'id', 'list', NodeProps>;
export const data: Node[] = [
  {
    text: 'foo',
    id: 'foo',
    list: [
      {
        text: 'bar',
        id: 'bar',
      },
      {
        text: 'boo',
        id: 'boo',
      },
      {
        text: 'poo',
        id: 'poo',
        list: [
          {
            text: 'kar',
            id: 'kar',
          },
          {
            text: 'moo',
            id: 'moo',
            list: [
              {
                text: 'dar sar',
                id: 'dar sar',
              },
            ],
          },
          {
            text: 'koo',
            id: 'koo',
          },
        ],
      },
    ],
  },
  {
    text: 'xfoo',
    id: 'xfoo',
    list: [
      {
        text: 'xbar',
        id: 'xbar',
      },
      {
        text: 'xboo',
        id: 'xboo',
      },
      {
        text: 'xpoo',
        id: 'xpoo',
        list: [
          {
            text: 'xkar',
            id: 'xkar',
          },
          {
            text: 'xmoo',
            id: 'xmoo',
            list: [
              {
                text: 'xdar sar',
                id: 'xdar sar',
              },
            ],
          },
          {
            text: 'xkoo',
            id: 'xkoo',
          },
        ],
      },
    ],
  },
  {
    text: 'xfoo2',
    id: 'xfoo2',
  },
  {
    text: 'xfoo3',
    id: 'xfoo3',
    list: [],
  },
];