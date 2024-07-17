import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Starbuzz.ai Assignment</h1>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/signup">Signup</Link>
      <br />
      <Link href="/posts">Posts</Link>
    </div>
  );
}
