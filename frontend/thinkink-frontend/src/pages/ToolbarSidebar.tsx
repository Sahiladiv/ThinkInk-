import React from 'react';
import './ToolbarSidebar.css';

type Props = {
  formatText: (command: string, value?: string) => void;
  applyHeading: (tag: string) => void;
  insertSection: () => void;
  insertImage: () => void;
};

const ToolbarSidebar: React.FC<Props> = ({
  formatText,
  applyHeading,
  insertSection,
  insertImage,
}) => {
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formatText('fontName', e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formatText('fontSize', e.target.value);
  };

  return (
    <aside className="toolbar-sidebar">
      <div className="toolbar-group">
        <button onClick={() => formatText('bold')} title="Bold">B</button>
        <button onClick={() => formatText('underline')} title="Underline">U</button>
        <button onClick={() => formatText('italic')} title="Italic">I</button>
        <button onClick={() => formatText('strikeThrough')} title="Strikethrough">S</button>

        <select onChange={handleFontChange} defaultValue="" title="Font Style">
          <option value="" disabled>Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>

        <div className="toolbar-label">Font Settings</div>

        <select onChange={handleFontSizeChange} defaultValue="" title="Font Size">
          <option value="" disabled>Size</option>
          <option value="1">10px</option>
          <option value="2">13px</option>
          <option value="3">16px (Default)</option>
          <option value="4">18px</option>
          <option value="5">24px</option>
          <option value="6">32px</option>
          <option value="7">48px</option>
        </select>

        <div className="toolbar-label">Text Settings</div>
      </div>

      <div className="toolbar-group">
        <button onClick={() => formatText('justifyLeft')} title="Align Left">≡</button>
        <button onClick={() => formatText('justifyCenter')} title="Align Center">≣</button>
        <button onClick={() => formatText('justifyRight')} title="Align Right">☰</button>
      </div>

      <div className="toolbar-group">
        <button className="toolbar-label wide" onClick={insertSection}>Add Section</button>
      </div>

      <div className="toolbar-group">
        <button onClick={() => formatText('insertUnorderedList')} title="Bullet List">•</button>
        <button onClick={() => formatText('insertOrderedList')} title="Numbered List">1.</button>
        <br />
        <button onClick={() => applyHeading('H1')} title="Heading 1">H1</button>
        <button onClick={() => applyHeading('H2')} title="Heading 2">H2</button>
        <button onClick={() => applyHeading('H3')} title="Heading 3">H3</button>
      </div>
    </aside>
  );
};

export default ToolbarSidebar;
