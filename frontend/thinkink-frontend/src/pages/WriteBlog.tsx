import React, { useState, useRef, useEffect } from 'react';
import './WriteBlog.css';
import ImageCropperModal from './ImageCropperModal';

const WriteBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const toolbar = toolbarRef.current;
      if (!toolbar) return;

      const rect = toolbar.getBoundingClientRect();
      const isSticky = rect.top <= 0;
      toolbar.classList.toggle('floating-toolbar', isSticky);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorRef.current?.innerHTML || '';
    alert(`Blog Submitted!\nTitle: ${title}\nContent: ${content.substring(0, 100)}...`);
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const insertImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && /^image\//.test(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          setCropSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    setCropSrc(null);
    document.execCommand('insertImage', false, croppedDataUrl);
  };

  const insertSection = () => {
    const sectionTitle = prompt('Enter section title');
    if (sectionTitle && editorRef.current) {
      const sectionHTML = `<h3 style='margin-top: 30px;'>${sectionTitle}</h3><hr/>`;
      editorRef.current.focus();
      document.execCommand('insertHTML', false, sectionHTML);
    }
  };

  const applyHeading = (tag: string) => {
    document.execCommand('formatBlock', false, tag);
  };

  return (
    <div className="container-fluid px-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h2 className="mb-4 fancy-heading text-center">Write Your Own Story</h2>
          <form onSubmit={handleSubmit}>
            {/* Hidden Image Upload */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />

            {/* Title Input */}
            <input
              className="form-control form-control-lg blog-title mb-3"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Toolbar */}
            <div
              className="d-flex flex-wrap align-items-center mb-3 gap-2 toolbar floating-toolbar bg-white justify-content-center"
              ref={toolbarRef}
            >
              {/* Font Size & Family */}
              <div className="d-flex align-items-center">
                <label className="me-2">Font Size:</label>
                <select
                  className="form-select"
                  style={{ width: '80px' }}
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                >
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="20">20</option>
                  <option value="24">24</option>
                </select>
              </div>
              <div className="d-flex align-items-center">
                <label className="me-2">Font Family:</label>
                <select
                  className="form-select"
                  style={{ width: '150px' }}
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>

              {/* Formatting Buttons */}
              <div className="btn-group ms-2 flex-wrap" role="group">
                {/* Basic formatting */}
                <button type="button" className="btn btn-outline-secondary" onClick={() => formatText('bold')}><b>B</b></button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => formatText('italic')}><i>I</i></button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => formatText('underline')}><u>U</u></button>

                {/* Font color */}
                <button type="button" className="btn btn-outline-secondary" onClick={() => formatText('foreColor', 'red')} style={{ color: 'red' }}>A</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => formatText('foreColor', 'blue')} style={{ color: 'blue' }}>A</button>

                {/* Image & section */}
                <button type="button" className="btn btn-outline-secondary" onClick={insertImage}>🖼️</button>
                <button type="button" className="btn btn-outline-secondary" onClick={insertSection}>📑 Section</button>

                {/* Headings */}
                <button type="button" className="btn btn-outline-secondary" onClick={() => applyHeading('H1')}>H1</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => applyHeading('H2')}>H2</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => applyHeading('H3')}>H3</button>

                {/* Alignment */}
                <button type="button" className="btn btn-outline-secondary" title="Align Left" onClick={() => formatText('justifyLeft')}>⬅️</button>
                <button type="button" className="btn btn-outline-secondary" title="Align Center" onClick={() => formatText('justifyCenter')}>↔️</button>
                <button type="button" className="btn btn-outline-secondary" title="Align Right" onClick={() => formatText('justifyRight')}>➡️</button>
                <button type="button" className="btn btn-outline-secondary" title="Justify" onClick={() => formatText('justifyFull')}>📏</button>

                {/* Lists */}
                <button type="button" className="btn btn-outline-secondary" title="Bullet List" onClick={() => formatText('insertUnorderedList')}>• List</button>
                <button type="button" className="btn btn-outline-secondary" title="Numbered List" onClick={() => formatText('insertOrderedList')}>1. List</button>
              </div>
            </div>

            {/* Blog Content */}
            <div
              ref={editorRef}
              contentEditable
              className="form-control blog-content mb-3"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
                minHeight: '500px',
              }}
            ></div>

            {/* Submit */}
            <div className="text-center">
              <button className="btn btn-success px-5 py-2" type="submit">
                Publish
              </button>
            </div>
          </form>

          {/* Cropper Modal */}
          {cropSrc && (
            <ImageCropperModal
              imageSrc={cropSrc}
              onClose={() => setCropSrc(null)}
              onCropComplete={handleCropComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
