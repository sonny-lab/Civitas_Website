import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './App.css';

// Import content files
import welcomeToCivitas from '../content/blog/welcome-to-civitas.md?raw';
import theArtOfPoliticalStrategy from '../content/blog/the-art-of-political-strategy.md?raw';
import futureOfCivitas from '../content/blog/future-of-civitas.md?raw';
import testingNewContentSystem from '../content/blog/testing-new-content-system.md?raw';

import coreGameplaySystems from '../content/development/core-gameplay-systems.md?raw';
import userInterfaceDesign from '../content/development/user-interface-design.md?raw';
import educationalContentIntegration from '../content/development/educational-content-integration.md?raw';
import contentManagementUpgrade from '../content/development/content-management-upgrade.md?raw';

const parseMarkdown = (markdown) => {
  const frontmatterEnd = markdown.indexOf(
    `---\n`,
    markdown.indexOf(`---\n`) + 3
  );
  const content = markdown.substring(frontmatterEnd + 4).trim();
  return DOMPurify.sanitize(marked.parse(content));
};

const extractFrontmatter = (markdown) => {
  const frontmatterMatch = markdown.match(/---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const frontmatter = frontmatterMatch[1];
  const lines = frontmatter.split("\n");
  const data = {};
  lines.forEach((line) => {
    const [key, ...value] = line.split(":");
    if (key && value.length > 0) {
      data[key.trim()] = value.join(":").trim().replace(/^"|"$/g, "");
    }
  });
  return data;
};

const blogPosts = [
  { id: "welcome-to-civitas", file: welcomeToCivitas },
  { id: "the-art-of-political-strategy", file: theArtOfPoliticalStrategy },
  { id: "future-of-civitas", file: futureOfCivitas },
  { id: "testing-new-content-system", file: testingNewContentSystem },
].map((post) => ({
  ...post,
  frontmatter: extractFrontmatter(post.file),
  content: parseMarkdown(post.file),
}));

const devUpdates = [
  { id: "core-gameplay-systems", file: coreGameplaySystems },
  { id: "user-interface-design", file: userInterfaceDesign },
  { id: "educational-content-integration", file: educationalContentIntegration },
  { id: "content-management-upgrade", file: contentManagementUpgrade },
].map((update) => ({
  ...update,
  frontmatter: extractFrontmatter(update.file),
  content: parseMarkdown(update.file),
}));

const HomePage = () => (
  <div className="page-content">
    <section className="hero-section">
      <h1>Welcome to Civitas</h1>
      <p>A new era of political simulation begins.</p>
      <Link to="/blog" className="button">Explore the Blog</Link>
      <Link to="/development" className="button secondary">Dev Updates</Link>
    </section>

    <section className="about-section">
      <h2>About Civitas</h2>
      <p>Civitas is an immersive political simulation game where players can build, manage, and expand their own virtual nations. Navigate complex political landscapes, engage in diplomacy, manage resources, and lead your people to prosperity or peril.</p>
      <p>With deep strategic elements and dynamic AI, every decision you make shapes the destiny of your Civitas.</p>
    </section>

    <section className="features-section">
      <h2>Key Features</h2>
      <ul>
        <li>Deep Political Simulation</li>
        <li>Dynamic Diplomacy & Alliances</li>
        <li>Resource Management & Economy</li>
        <li>Strategic Decision Making</li>
        <li>Rich Historical & Cultural Elements</li>
      </ul>
    </section>

    <section className="cta-section">
      <h2>Join the Community</h2>
      <p>Be part of the Civitas journey. Follow our development, join discussions, and prepare to forge your legacy.</p>
      <a href="#" className="button">Sign Up for Updates</a>
    </section>
  </div>
);

const BlogPage = () => (
  <div className="page-content">
    <h1>Civitas Blog</h1>
    <div className="post-list">
      {blogPosts.map((post) => (
        <div key={post.id} className="post-card">
          <h2><Link to={`/blog/${post.id}`}>{post.frontmatter.title}</Link></h2>
          <p className="post-meta">{post.frontmatter.date}</p>
          <p>{post.frontmatter.excerpt}</p>
          <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
        </div>
      ))}
    </div>
  </div>
);

const BlogPostPage = () => {
  const { pathname } = window.location;
  const postId = pathname.split('/').pop();
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return <div className="page-content">Post not found.</div>;
  }

  return (
    <div className="page-content blog-post">
      <h1>{post.frontmatter.title}</h1>
      <p className="post-meta">{post.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Link to="/blog" className="back-link">← Back to Blog</Link>
    </div>
  );
};

const DevelopmentPage = () => (
  <div className="page-content">
    <h1>Development Updates</h1>
    <div className="update-list">
      {devUpdates.map((update) => (
        <div key={update.id} className="update-card">
          <h2><Link to={`/development/${update.id}`}>{update.frontmatter.title}</Link></h2>
          <p className="update-meta">Status: {update.frontmatter.status}</p>
          <p>{update.frontmatter.description}</p>
          <Link to={`/development/${update.id}`} className="read-more">View Update</Link>
        </div>
      ))}
    </div>
  </div>
);

const DevelopmentUpdatePage = () => {
  const { pathname } = window.location;
  const updateId = pathname.split('/').pop();
  const update = devUpdates.find((u) => u.id === updateId);

  if (!update) {
    return <div className="page-content">Update not found.</div>;
  }

  return (
    <div className="page-content dev-update">
      <h1>{update.frontmatter.title}</h1>
      <p className="update-meta">Status: {update.frontmatter.status}</p>
      <div dangerouslySetInnerHTML={{ __html: update.content }} />
      <Link to="/development" className="back-link">← Back to Development Updates</Link>
    </div>
  );
};

const NotFoundPage = () => (
  <div className="page-content">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Go to Home</Link>
  </div>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false); // Close menu on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header className="main-header">
          <div className="header-content">
            <Link to="/" className="site-logo">Civitas</Link>
            <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
              <ul>
                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
                <li><Link to="/development" onClick={() => setMenuOpen(false)}>Development</Link></li>
                <li><a href="#" onClick={() => setMenuOpen(false)}>About</a></li>
                <li><a href="#" onClick={() => setMenuOpen(false)}>Contact</a></li>
              </ul>
            </nav>
            <button className="menu-toggle" onClick={toggleMenu}>
              ☰
            </button>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:postId" element={<BlogPostPage />} />
            <Route path="/development" element={<DevelopmentPage />} />
            <Route path="/development/:updateId" element={<DevelopmentUpdatePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="main-footer">
          <p>&copy; 2025 Civitas. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
