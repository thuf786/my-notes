"use client";

import { useEffect, useState } from "react";
import { db } from "@/Components/firebaseConfig";
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Edit, Trash } from "lucide-react";
import Sidebar from "@/Components/Sidebar";

export default function SavedNotes() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: "", title: "", content: "" });

  useEffect(() => {
    const fetchSavedNotes = async () => {
      try {
        const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching saved notes: ", error);
      }
    };

    fetchSavedNotes();
  }, []);

  const handleEdit = (noteId) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    if (noteToEdit) {
      setCurrentNote(noteToEdit);
      setIsModalOpen(true);
      console.log("Editing note:", noteToEdit);

    }
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const { id, title, content } = currentNote;
      await updateDoc(doc(db, "notes", id), { title, content });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, title, content } : note
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Saved Notes</h1>
        {notes.length === 0 ? (
          <p className="text-gray-500">No saved notes available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Edit
                    className="text-gray-500 hover:text-blue-500 cursor-pointer"
                    size={20}
                    onClick={() => handleEdit(note.id)}
                  />
                  <Trash
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                    size={20}
                    onClick={() => handleDelete(note.id)}
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {note.title || "Untitled"}
                </h2>
                <p className="text-gray-600">
                  {note.content || "No content available."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Edit Note</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={currentNote.title}
                onChange={(e) =>{
                  console.log("Input Change Fired, Value:", e.target.value);
                  setCurrentNote((prev) => ({ ...prev, title: e.target.value }))
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                value={currentNote.content}
                onChange={(e) =>{
                  setCurrentNote((prev) => ({ ...prev, content: e.target.value }))
                }}
                
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
