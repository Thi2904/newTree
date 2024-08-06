import { useState } from 'react';
import './App.scss';
import TreeNode from './TreeNode';

const App = () => {
  const [treeData, setTreeData] = useState([
    {
      title: '0-0',
      key: '0-0',
      checked: false,
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          checked: false,
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', checked: false },
            { title: '0-0-0-1', key: '0-0-0-1', checked: false },
            { title: '0-0-0-2', key: '0-0-0-2', checked: false },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          checked: false,
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', checked: false },
            { title: '0-0-1-1', key: '0-0-1-1', checked: false },
            { title: '0-0-1-2', key: '0-0-1-2', checked: false },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          checked: false,
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      checked: false,
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', checked: false },
        { title: '0-1-0-1', key: '0-1-0-1', checked: false },
        { title: '0-1-0-2', key: '0-1-0-2', checked: false },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
      checked: false,
    },
  ]);

  const updateParentCheckStatus = (nodes) => {
    return nodes.map((node) => {
      if (node.children) {
        const updatedChildren = updateParentCheckStatus(node.children);
        const allChecked = updatedChildren.every(child => child.checked);
        return {
          ...node,
          checked: allChecked,
          children: updatedChildren,
        };
      }
      return node;
    });
  };

  const handleCheck = (key, isChecked) => {
    const recursiveCheckUpdate = (nodes, key, isChecked) => {
      return nodes.map((node) => {
        if (node.key === key) {
          const updatedNode = { ...node, checked: isChecked };
          if (node.children) {
            updatedNode.children = node.children.map((child) => recursiveCheckUpdate([child], child.key, isChecked)[0]);
          }
          return updatedNode;
        } else if (node.children) {
          return { ...node, children: recursiveCheckUpdate(node.children, key, isChecked) };
        } else {
          return node;
        }
      });
    };

    const updatedTreeData = recursiveCheckUpdate(treeData, key, isChecked);
    setTreeData(updateParentCheckStatus(updatedTreeData));
  };

  return (
    <div>
      <ul>
        {treeData.map((node) => (
          <TreeNode key={node.key} node={node} onCheck={handleCheck} />
        ))}
      </ul>
    </div>
  );
};

export default App;
