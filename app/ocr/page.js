'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, ScanText, Copy, Check } from 'lucide-react';
import Tesseract from 'tesseract.js';

export default function OCRPage() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setText('');
            setProgress(0);
        }
    };

    const handleExtract = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const result = await Tesseract.recognize(
                image,
                'eng',
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setProgress(parseInt(m.progress * 100));
                        }
                    }
                }
            );
            setText(result.data.text);
        } catch (err) {
            console.error(err);
            alert('Error extracting text');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="main-layout">
            <header className="header">
                <div className="container nav">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'hsl(var(--muted-foreground))' }}>
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>OCR (Image to Text)</h1>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '2rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Input Section */}
                <div className="card">
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Upload size={18} /> Upload Image
                    </h2>
                    <div style={{
                        border: '2px dashed hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        position: 'relative',
                        backgroundColor: 'hsl(var(--secondary) / 0.2)'
                    }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                        />
                        <div style={{ pointerEvents: 'none' }}>
                            {image ? (
                                <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: 'var(--radius)' }} />
                            ) : (
                                <div style={{ color: 'hsl(var(--muted-foreground))' }}>
                                    <Upload size={32} style={{ marginBottom: '0.5rem' }} />
                                    <p>Click or drag image here</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleExtract}
                        disabled={!image || loading}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem' }}
                    >
                        {loading ? `Extracting... ${progress}%` : (
                            <>
                                <ScanText size={16} style={{ marginRight: '0.5rem' }} />
                                Extract Text
                            </>
                        )}
                    </button>
                </div>

                {/* Output Section */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Extracted Text</h2>
                        {text && (
                            <button onClick={copyToClipboard} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? ' Copied' : ' Copy'}
                            </button>
                        )}
                    </div>
                    <textarea
                        value={text}
                        readOnly
                        placeholder="Extracted text will appear here..."
                        style={{
                            flex: 1,
                            width: '100%',
                            minHeight: '300px',
                            padding: '1rem',
                            borderRadius: 'var(--radius)',
                            border: '1px solid hsl(var(--input))',
                            backgroundColor: 'hsl(var(--background))',
                            color: 'hsl(var(--foreground))',
                            resize: 'none',
                            fontFamily: 'monospace'
                        }}
                    />
                </div>

            </main>
        </div>
    );
}
