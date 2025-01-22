"use client";

import { useEffect, useState } from "react";
import { db } from "@/Components/firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Sidebar from "@/Components/Sidebar";

export default function SavedNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchSavedNotes = async () => {
      try {
        // Query to fetch notes ordered by timestamp
        const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        // Map the fetched data
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotes(fetchedNotes); // Update state with fetched notes
      } catch (error) {
        console.error("Error fetching saved notes: ", error);
      }
    };

    fetchSavedNotes();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
    <div className="p-4">
      
      <h1 className="text-2xl font-bold mb-4">Saved Notes</h1>
      {notes.length === 0 ? (
        <p className="text-gray-500">No saved notes available.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className="mb-2 p-2 bg-white rounded shadow text-gray-800"
            >
              {note.content}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}
