"use client";

import { useState } from "react";

interface Note {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function NotesWall() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      name: "Sarah",
      message: "Love the smooth scroll! Great work 🚀",
      timestamp: "2024-10-15",
    },
    {
      id: "2",
      name: "Mike",
      message: "The draggable notes are so cool!",
      timestamp: "2024-10-18",
    },
    {
      id: "3",
      name: "Emma",
      message: "Your timeline journey is inspiring ✨",
      timestamp: "2024-10-19",
    },
  ]);

  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newNote: Note = {
        id: Date.now().toString(),
        name: formData.name,
        message: formData.message,
        timestamp: new Date().toISOString().split("T")[0],
      };

      setNotes([newNote, ...notes]);
      setFormData({ name: "", message: "" });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-8 mb-12 shadow-2xl border-2 border-white/20 dark:border-white/10"
      >
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[var(--accent)] outline-none"
          />
          <input
            type="text"
            placeholder="Your message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[var(--accent)] outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[var(--accent)] text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Leave Note"}
        </button>
      </form>

      {/* Notes Wall */}
      <div className="grid md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-yellow-100 dark:bg-yellow-200 dark:opacity-90 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform"
          >
            <p className="text-gray-800 mb-3 italic">"{note.message}"</p>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="font-semibold">— {note.name}</span>
              <span className="text-xs">{note.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
