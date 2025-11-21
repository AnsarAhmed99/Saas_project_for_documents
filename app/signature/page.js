'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, Eraser, Pen } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

export default function SignaturePage() {
    const sigCanvas = useRef({});
    const [penColor, setPenColor] = useState('black');

    const clear = () => sigCanvas.current.clear();

    const save = () => {
        const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="main-layout">
            <header className="header">
                <div className="container nav">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'hsl(var(--muted-foreground))' }}>
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Digital Signature</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={clear} className="btn btn-outline">
                            <Eraser size={16} style={{ marginRight: '0.5rem' }} />
                            Clear
                        </button>
                        <button onClick={save} className="btn btn-primary">
                            <Download size={16} style={{ marginRight: '0.5rem' }} />
                            Download
                        </button>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '2rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '0', overflow: 'hidden', backgroundColor: 'white' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: '#f9fafb' }}>
                        <span style={{ fontSize: '0.875rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Pen size={14} /> Pen Color:
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['black', 'blue', 'red', 'green'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setPenColor(color)}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                        border: penColor === color ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                                        cursor: 'pointer',
                                        padding: 0
                                    }}
                                    aria-label={`Select ${color} pen`}
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{ height: '400px', cursor: 'crosshair' }}>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor={penColor}
                            canvasProps={{
                                width: 800,
                                height: 400,
                                className: 'sigCanvas',
                                style: { width: '100%', height: '100%' }
                            }}
                        />
                    </div>
                </div>
                <p style={{ marginTop: '1rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
                    Draw your signature above and click Download to save as PNG.
                </p>
            </main>
        </div>
    );
}
