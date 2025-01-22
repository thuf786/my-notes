"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/Components/firebaseConfig";
import {
    collection,
    query,
    orderBy,
    getDocs,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import Link from "next/link";

export default function Dashboard() {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const router = useRouter();


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
                const querySnapshot = await getDocs(q);
                const fetchedNotes = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNotes(fetchedNotes);
            } catch (error) {
                console.error("Error fetching notes: ", error);
            }
        };

        fetchNotes();
    }, []);


    const addNote = async () => {
        if (note.trim() === "") return;
        try {
            const docRef = await addDoc(collection(db, "notes"), {
                content: note,
                timestamp: serverTimestamp(),
            });
            setNotes([{ id: docRef.id, content: note }, ...notes]);
            setNote("");
        } catch (error) {
            console.error("Error adding note: ", error);
        }
    };

    return (
        <div className="flex h-screen">

            <aside className="w-1/4 bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold mb-4 ">Sidebar</h1>
                <ul className="sidebar">
                    <li className="mb-2 cursor-pointer">
                        <Link href="/Pages/dashboard">Dashboard</Link>
                    </li>
                    <li className="mb-2 cursor-pointer">
                        <Link href="/Pages/display">Display</Link>
                    </li>
                    <li className="mb-2 cursor-pointer">
                        <Link href="/Pages/savednotes">Saved Notes</Link>

                    </li>
                </ul>
            </aside>


            <main className="flex-1 bg-gray-100 p-4 flex flex-col justify-between">
                <div className="flex-1 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Notes</h2>
                    {notes?.length === 0 ? (
                        <p className="text-gray-500">No notes yet. Add one below!</p>
                    ) : (
                        <ul>
                            {notes?.map((note) => (
                                <li key={note?.id} className="mb-2 p-2 bg-white rounded shadow">
                                    {note?.content}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


                <div className="mt-4">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your note here..."
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                        onClick={async () => {
                            await addNote();
                            router.push("/Pages/savednotes");
                        }}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Note
                    </button>

                </div>
            </main>
        </div>
    );
}
