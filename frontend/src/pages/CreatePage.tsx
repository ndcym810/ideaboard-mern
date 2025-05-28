import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Idea created successfully");

      navigate("/");
      setIsLoading(false);
    } catch (error: unknown) {
      console.error("Error creating idea:", error);
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        toast.error("Too many requests, please try again later", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create idea");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Idea List
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Idea</h2>
              <form onSubmit={handleSubmit}>
                <div className="fieldset mb-4">
                  <label className="label">Title</label>
                  <input
                    type="text"
                    placeholder="Enter your idea title"
                    className="input rounded-selector"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="fieldset mb-4">
                  <label className="label">Content</label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
