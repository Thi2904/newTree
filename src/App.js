import { useState } from 'react';
import './App.scss';

const TreeNode = ({ node, onCheck, parentChecked }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    onCheck(node.key, isChecked);
  };

  const hasCheckedChildren = (node) => {
    if (node.children) {
      return node.children.some(child => child.checked || hasCheckedChildren(child));
    }
    return false;
  };

  const isActive = !node.checked && hasCheckedChildren(node);

  return (
    <li>
      <div style={{ cursor: 'pointer', marginLeft: '5px', display: 'flex' }}>
        {node.children && node.children.length > 0 && (
          <span onClick={handleToggle}>
            {expanded ? (
              <i style={{ display: 'block', marginBottom: '3px' }} className="fa-solid fa-sort-down"></i>
            ) : (
              <i style={{ display: 'block', marginTop: '3px' }} className="fa-solid fa-caret-right"></i>
            )}
          </span>
        )}
        <input type="checkbox" checked={node.checked || false} onChange={handleCheck} className={isActive ? 'active' : ''} />
        <span>{node.title}</span>
      </div>
      {node.children && expanded && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.key} node={child} onCheck={onCheck} parentChecked={node.checked} />
          ))}
        </ul>
      )}
    </li>
  );
};

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

  const updateCheckState = (nodes, key, isChecked) => {
    return nodes.map((node) => {
      if (node.key === key) {
        const updatedNode = { ...node, checked: isChecked };
        if (node.children) {
          updatedNode.children = node.children.map((child) => updateCheckState([child], key, isChecked)[0]);
        }
        return updatedNode;
      } else if (node.children) {
        return { ...node, children: updateCheckState(node.children, key, isChecked) };
      } else {
        return node;
      }
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

    setTreeData(recursiveCheckUpdate(treeData, key, isChecked));
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
