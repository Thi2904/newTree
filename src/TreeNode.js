import { useState } from "react";
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
  
export default TreeNode;