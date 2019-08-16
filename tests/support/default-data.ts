import { TreeNode } from '../../src/index';

export interface NodeProps {
  text: string;
}

export type Node = TreeNode<NodeProps, 'key', 'children'>;
export const data: Node[] = [
  {
    text: 'foo',
    key: 'foo',
    children: [
      {
        text: 'bar',
        key: 'bar',
      },
      {
        text: 'boo',
        key: 'boo',
      },
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
        text: 'xbar',
        key: 'xbar',
      },
      {
        text: 'xboo',
        key: 'xboo',
      },
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
  {
    text: 'xfoo2',
    key: 'xfoo2',
  },
  {
    text: 'xfoo3',
    key: 'xfoo3',
    children: [],
  },
];
