import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-1/4 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Sidebar</h1>
      <ul>
        <li className="mb-2 cursor-pointer">
          <Link href="/">Dashboard</Link>
        </li>
        <li className="mb-2 cursor-pointer">
          <Link href="/display">Display</Link>
        </li>
        <li className="mb-2 cursor-pointer">
          <Link href="/saved-notes">Saved Notes</Link>
        </li>
      </ul>
    </aside>
  );
}
