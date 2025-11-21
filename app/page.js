import Link from 'next/link';
import { FileText, PenTool, ScanText, FileJson, FileType } from 'lucide-react';

export default function Home() {
  return (
    <div className="main-layout">
      <header className="header">
        <div className="container nav">
          <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
            SaaS<span style={{ color: 'hsl(var(--primary))' }}>Tools</span>
          </div>
          <nav className="nav-links">
            <Link href="/editor" className="nav-link">Editor</Link>
            <Link href="/signature" className="nav-link">Signature</Link>
            <Link href="/ocr" className="nav-link">OCR</Link>
            <Link href="/converters" className="nav-link">Converters</Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ padding: '4rem 1rem' }}>
        <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            All Your Productivity Tools <br />
            <span style={{ color: 'hsl(var(--primary))', background: 'linear-gradient(to right, hsl(var(--primary)), hsl(260, 100%, 60%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              In One Place
            </span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'hsl(var(--muted-foreground))', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Edit documents, sign files, extract text, and convert formats with our premium suite of tools.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/editor" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Get Started
            </Link>
            <Link href="#features" className="btn btn-outline" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Learn More
            </Link>
          </div>
        </section>

        <section id="features" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <FeatureCard
            icon={<FileText size={32} />}
            title="Doc Editor"
            description="Rich text editor with advanced formatting capabilities."
            href="/editor"
          />
          <FeatureCard
            icon={<PenTool size={32} />}
            title="Signature"
            description="Create and download digital signatures instantly."
            href="/signature"
          />
          <FeatureCard
            icon={<ScanText size={32} />}
            title="OCR Tool"
            description="Extract text from images using advanced AI."
            href="/ocr"
          />
          <FeatureCard
            icon={<FileJson size={32} />}
            title="Converters"
            description="Convert between PDF, Word, CSV, and Excel formats."
            href="/converters"
          />
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 SaaS Tools Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, href }) {
  return (
    <Link href={href} className="card" style={{ display: 'block', transition: 'transform 0.2s', textDecoration: 'none' }}>
      <div style={{ color: 'hsl(var(--primary))', marginBottom: '1rem' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>{title}</h3>
      <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>{description}</p>
    </Link>
  );
}
