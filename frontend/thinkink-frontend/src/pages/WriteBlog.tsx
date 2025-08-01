// WriteBlog.tsx
import React, { useState, useRef } from 'react';
import './WriteBlog.css';
import ToolbarSidebar from './ToolbarSidebar';
import ImageCropperModal from './ImageCropperModal';
import leftAlignIcon from './assets/left-align.svg';
import centerAlignIcon from './assets/center-align.svg';
import rightAlignIcon from './assets/right-align.svg';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WriteBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorRef.current?.innerHTML || '';

    if (!title.trim() || !content.trim()) {
      alert('Title and content cannot be empty.');
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('You are not logged in. Please log in to publish a blog.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/api/blogs/saveblog/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(`Failed to submit blog: ${data.detail || JSON.stringify(data)}`);
        return;
      }

      alert('Blog published successfully!');
      setTitle('');
      if (editorRef.current) editorRef.current.innerHTML = '';
    } catch (error) {
      alert('An error occurred while publishing the blog.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewBlog = () => {
    const content = editorRef.current?.innerHTML || '';
    if (!title.trim() || !content.trim()) {
      alert('Title and content cannot be empty for preview.');
      return;
    }
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <html><head><title>${title}</title>
          <style>body { font-family: ${fontFamily}; font-size: ${fontSize}px; padding: 2rem; }</style>
        </head><body><h1>${title}</h1>${content}</body></html>
      `);
      previewWindow.document.close();
    }
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
        if (typeof reader.result === 'string') setCropSrc(reader.result);
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
    <div className="write-blog-layout">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      <ToolbarSidebar
        formatText={formatText}
        applyHeading={applyHeading}
        insertSection={insertSection}
        insertImage={insertImage}
      />

      <div className="write-blog-main">
        <div className="d-flex justify-content-between mb-2">
          <input
            className="form-control blog-title me-3"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={previewBlog} disabled={isSubmitting}>Preview</button>
            <button className="btn btn-success" type="submit" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        <div
          ref={editorRef}
          contentEditable
          className="form-control blog-content"
          style={{ fontSize: `${fontSize}px`, fontFamily }}
        ></div>
      </div>

      {cropSrc && (
        <ImageCropperModal
          imageSrc={cropSrc}
          onClose={() => setCropSrc(null)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default WriteBlog;
