import { useFormik } from 'formik';
import { updateTask } from '../services/taskService';
import { useNavigate } from 'react-router-dom';
import Task from '../types/Task';

const EditTask = ({ task }: { task: Task }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.slice(0, 10),
      status: task.status,
    },
    onSubmit: async (values) => {
      try {
        await updateTask(task.id, values);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <input name="title" onChange={formik.handleChange} value={formik.values.title} />
      <textarea name="description" onChange={formik.handleChange} value={formik.values.description} />
      <input type="date" name="dueDate" onChange={formik.handleChange} value={formik.values.dueDate} />
      <select name="status" onChange={formik.handleChange} value={formik.values.status}>
        <option value={0}>Pending</option>
        <option value={1}>InProgress</option>
        <option value={2}>Completed</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
};

export default EditTask;
