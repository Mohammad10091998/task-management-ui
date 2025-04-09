import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/Tasks/TaskCard";
import TaskModal from "../components/Tasks/TaskModal";
import { getAllTasks, deleteTask } from "../services/taskService";
import Task from "../types/Task";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // fixed to 6 (2 rows of 3 cards)
  const [sortBy, setSortBy] = useState<keyof Task>("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks(page, pageSize, sortBy, sortOrder);
      setTasks(data);
      setHasMore(data.length === pageSize);
    } catch (err: any) {
      console.error("Error fetching tasks", err);
      toast.error("Failed to fetch tasks", { position: "top-right" });

      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, pageSize, sortBy, sortOrder]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      toast.success("Task deleted successfully", { position: "top-right" });
      fetchTasks();
    } catch (err: any) {
      console.error("Error deleting task", err);
      toast.error("Failed to delete task", { position: "top-right" });
    }
  };

  const handleCreate = () => {
    setSelectedTask(undefined);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const toggleSort = (key: keyof Task) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eff6ff", padding: "40px 20px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e3a8a" }}>Task Dashboard</h1>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
          <button
            onClick={handleCreate}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          >
            Add Task
          </button>

          <button
            onClick={() => toggleSort("status")}
            style={{
              backgroundColor: "#16a34a",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
          >
            Sort by Status
          </button>

          <button
            onClick={() => toggleSort("dueDate")}
            style={{
              backgroundColor: "#16a34a",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
          >
            Sort by Due Date
          </button>
        </div>

        {/* Task Cards */}
        {tasks.length === 0 ? (
          <div style={{ textAlign: "center", color: "#4b5563" }}>No tasks found.</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151" }}>
            <label>Page Size:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              {[3, 6, 9, 12].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              style={{
                padding: "10px 16px",
                backgroundColor: "#e5e7eb",
                borderRadius: "6px",
                border: "none",
                cursor: page === 1 ? "not-allowed" : "pointer",
                opacity: page === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <span style={{ fontSize: "14px", color: "#374151" }}>Page {page}</span>
            <button
              disabled={!hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              style={{
                padding: "10px 16px",
                backgroundColor: "#e5e7eb",
                borderRadius: "6px",
                border: "none",
                cursor: !hasMore ? "not-allowed" : "pointer",
                opacity: !hasMore ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          task={selectedTask}
          onSuccess={() => {
            fetchTasks();
            toast.success(
              modalMode === "edit"
                ? "Task updated successfully"
                : "Task created successfully",
              { position: "top-right" }
            );
          }}
        />

        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard;