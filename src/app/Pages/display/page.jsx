import Sidebar from "@/Components/Sidebar";

export default function Display() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Display</h2>
        <p>This is the Display page.</p>
      </main>
    </div>
  );
}
