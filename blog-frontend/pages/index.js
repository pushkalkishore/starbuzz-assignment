import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <h1>Starbuzz.ai Assignment</h1>
        <nav className="nav">
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
          <Link href="/posts">Posts</Link>
        </nav>
      </header>

      <main className="main">
        <h2>Welcome to Starbuzz.ai Assignment</h2>
        <p>
          This is a sample project demonstrating a blog application with login,
          signup, and posts functionality.
        </p>
        <p>Use the navigation links above to login, signup, or view posts.</p>
      </main>

      <footer className="footer">
        <p>Powered by Next.js</p>
      </footer>
    </div>
  );
}
