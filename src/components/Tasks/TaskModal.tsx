import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { createTask, updateTask } from "../../services/taskService";
import Task from "../../types/Task";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  task?: Task;
  onSuccess: () => void;
}

const TaskModal = ({ isOpen, onClose, mode, task, onSuccess }: TaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && task) {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate.substring(0, 10));
        setStatus(task.status);
      } else {
        // This guarantees a reset even if `task` is still undefined
        setTitle("");
        setDescription("");
        setDueDate("");
        setStatus(0);
      }
    }
  }, [isOpen, mode, task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = { title, description, dueDate, status };

    try {
      if (mode === "edit" && task) {
        await updateTask(task.id, newTask);
      } else {
        await createTask(newTask);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Failed to save task", err);
      toast.error(err.response?.data?.message || "Failed to save task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        zIndex: 10,
      }}>
        <Dialog.Panel style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}>
          <Dialog.Title style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem", color: "#1e3a8a" }}>
            {mode === "edit" ? "Edit Task" : "Create Task"}
          </Dialog.Title>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "1rem" }}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "1rem", minHeight: "80px" }}
            />
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              required
              style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "1rem" }}
            />
            <select
              value={status}
              onChange={e => setStatus(Number(e.target.value))}
              style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "1rem" }}
            >
              <option value={0}>Pending</option>
              <option value={1}>In Progress</option>
              <option value={2}>Completed</option>
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "#e5e7eb",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer"
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
              >
                {mode === "edit" ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
      <ToastContainer />
    </Dialog>
  );
};

export default TaskModal;
