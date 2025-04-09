import React from "react";
import Task from "../../types/Task";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => {
  console.log(task);
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        height: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px", color: "#1e3a8a" }}>
          {task.title}
        </h3>

        <p
          style={{
            fontSize: "14px",
            color: "#374151",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "1.4",
            maxHeight: "4.2em", // 3 lines of 1.4 line-height
          }}
          title={task.description}
        >
          {task.description}
        </p>

        <p style={{ fontSize: "13px", marginTop: "10px", color: "#6b7280" }}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p style={{ fontSize: "13px", color: "#6b7280" }}>
          Status: {task.status}
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        <button
          onClick={() => onEdit(task)}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "6px 12px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          style={{
            backgroundColor: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "6px 12px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
