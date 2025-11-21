'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileJson, FileSpreadsheet, FileText, ArrowRight, Download } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export default function ConvertersPage() {
    const [activeTab, setActiveTab] = useState('csv-excel');

    return (
        <div className="main-layout">
            <header className="header">
                <div className="container nav">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', color: 'hsl(var(--muted-foreground))' }}>
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>File Converters</h1>
                    </div>
                </div>
            </header>

            <main className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid hsl(var(--border))', paddingBottom: '1rem' }}>
                    <button
                        onClick={() => setActiveTab('csv-excel')}
                        className={`btn ${activeTab === 'csv-excel' ? 'btn-primary' : 'btn-outline'}`}
                    >
                        CSV ↔ Excel
                    </button>
                    <button
                        onClick={() => setActiveTab('pdf-word')}
                        className={`btn ${activeTab === 'pdf-word' ? 'btn-primary' : 'btn-outline'}`}
                    >
                        PDF ↔ Word
                    </button>
                </div>

                {activeTab === 'csv-excel' ? <CsvExcelConverter /> : <PdfWordConverter />}
            </main>
        </div>
    );
}

function CsvExcelConverter() {
    const [file, setFile] = useState(null);
    const [converting, setConverting] = useState(false);

    const handleFile = (e) => setFile(e.target.files[0]);

    const convertToExcel = () => {
        if (!file) return;
        setConverting(true);
        Papa.parse(file, {
            complete: (results) => {
                const ws = XLSX.utils.json_to_sheet(results.data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                XLSX.writeFile(wb, "converted.xlsx");
                setConverting(false);
            },
            header: true // Assume header for better JSON conversion
        });
    };

    const convertToCsv = async () => {
        if (!file) return;
        setConverting(true);
        const data = await file.arrayBuffer();
        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const csv = XLSX.utils.sheet_to_csv(ws);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "converted.csv";
        link.click();
        setConverting(false);
    };

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>CSV / Excel Converter</h2>

            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select File (CSV or Excel)</label>
                <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFile} className="input" style={{ height: 'auto', padding: '0.5rem' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={convertToExcel} disabled={!file || converting} className="btn btn-primary" style={{ flex: 1 }}>
                    <FileSpreadsheet size={16} style={{ marginRight: '0.5rem' }} />
                    To Excel
                </button>
                <button onClick={convertToCsv} disabled={!file || converting} className="btn btn-primary" style={{ flex: 1 }}>
                    <FileText size={16} style={{ marginRight: '0.5rem' }} />
                    To CSV
                </button>
            </div>
        </div>
    );
}

function PdfWordConverter() {
    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>PDF / Word Converter</h2>
            <div style={{ padding: '3rem', backgroundColor: 'hsl(var(--secondary) / 0.1)', borderRadius: 'var(--radius)', border: '2px dashed hsl(var(--border))' }}>
                <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }}>
                    Client-side PDF/Word conversion is complex and requires heavy libraries.
                </p>
                <p style={{ fontWeight: '500' }}>This is a placeholder for the demo.</p>
            </div>
        </div>
    );
}
