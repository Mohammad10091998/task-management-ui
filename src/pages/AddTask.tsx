import TaskForm from '../components/Tasks/TaskForm';

const AddTask = () => {
  const initialValues = {
    title: '',
    description: '',
    dueDate: '',
    status: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Task Submitted:', values);
    // You can call your API here
  };

  return <TaskForm initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default AddTask;
