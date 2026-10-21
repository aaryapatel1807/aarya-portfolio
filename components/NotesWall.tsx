"use client";

import { useEffect, useState } from "react";

interface Note {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export default function NotesWall() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load notes from the mirror's self-healing API
  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        if (data.notes) {
          setNotes(data.notes);
        }
      })
      .catch((err) => {
        console.error("Failed to load notes:", err);
        // Fallback to static demo notes
        setNotes([
          {
            id: "1",
            name: "Manu Singh",
            message: "Impressive I also want my landing page something like this",
            timestamp: "2024-10-15",
            avatar: "0lalrh9",
          },
          {
            id: "2",
            name: "Karan Rajpoot",
            message: "Love from India. Amazing portfolio.",
            timestamp: "2024-10-18",
            avatar: "0lalrh9",
          },
          {
            id: "3",
            name: "Emma",
            message: "Your timeline journey is inspiring ✨",
            timestamp: "2024-10-19",
            avatar: "0lalrh9",
          },
        ]);
      });
  }, []);

  // Submit a new note
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setError("Please fill in both name and message");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
          timestamp: new Date().toISOString(),
          avatar: "0lalrh9", // default avatar
        }),
      });
      if (response.ok) {
        setNotes((prev) => [ { id: Date.now().toString(), ...formData, timestamp: new Date().toISOString(), avatar: "0lalrh9" }, ...prev ]);
        setFormData({ name: "", message: "" });
        setError(null);
      } else {
        setError("Failed to submit note. Try again.");
      }
    } catch (err) {
      setError("Network error. Note not saved.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="notes-wall-section section-padding" id="notes">
      <h2 className="text-4xl font-bold mb-8 text-center">The Wall</h2>
      <p className="text-lg text-center text-gray-500 mb-8">
        Before you leave, leave a note. Say hi, share feedback, or tell me what you're building. It goes up on the wall.
      </p>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-8 animate-bounce">
          {error}
        </div>
      )}

      {isSubmitting && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-8">
          Submitting your note...
        </div>
      )}

      <form className="notes-form max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none dark:bg-gray-800 dark:text-white min-h-[120px]"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Leaving note..." : "Leave Note"}
        </button>
      </form>

      <div className="notes-display mt-12">
        {notes.map((note) => (
          <div key={note.id} className="note-card bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-white/20 mb-4 dark:border-gray-700">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-primary-100 text-primary-600 font-medium shrink-0">
                {note.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{escapeHtml(note.name)}</p>
                <p className="text-sm text-gray-500">{escapeHtml(note.message)}</p>
                <p className="text-xs text-gray-400">{note.timestamp}</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-2 -mt-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-xs text-gray-300 dark:text-gray-600">1d</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Simple HTML escape
function escapeHtml(text: string) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}