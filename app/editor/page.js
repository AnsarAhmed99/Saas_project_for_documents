'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Save, Download } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className="p-4">Loading Editor...</div>
});

export default function EditorPage() {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('Untitled Document');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const handleSave = () => {
        // Mock save functionality
        alert('Document saved! (Mock)');
        localStorage.setItem('saved-doc', value);
    };

    return (
        <div className="main-layout">
            <header className="header">
                <div className="container nav">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'hsl(var(--muted-foreground))', hover: { color: 'hsl(var(--foreground))' } }}>
                            <ArrowLeft size={20} />
                        </Link>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input"
                            style={{ width: 'auto', fontWeight: '600', border: 'none', padding: '0', height: 'auto', fontSize: '1.1rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={handleSave} className="btn btn-primary">
                            <Save size={16} style={{ marginRight: '0.5rem' }} />
                            Save
                        </button>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '2rem 1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    />
                </div>
            </main>

            <style jsx global>{`
        .quill {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .ql-container {
          flex: 1;
          font-size: 1.1rem;
        }
        .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid hsl(var(--border)) !important;
          background-color: hsl(var(--secondary) / 0.3);
        }
        .ql-container.ql-snow {
          border: none !important;
        }
        .ql-editor {
          padding: 2rem;
        }
      `}</style>
        </div>
    );
}
