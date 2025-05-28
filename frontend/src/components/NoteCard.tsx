import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import type { Note, Notes } from "../type/notes";

const NoteCard = ({
  note,
  setNotes,
  notes,
}: {
  note: Note;
  setNotes: (notes: Notes) => void;
  notes: Notes;
}) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: Note["_id"]
  ) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error: unknown) {
      console.error("Error deleting note:", error);
      if (error instanceof AxiosError && error.response?.status === 429) {
        toast.error("Too many requests, please try again later", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to delete note");
      }
    }
  };
  return (
    <Link
      to={`/notes/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;
