import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type TaskFormValues = {
  title: string;
  description: string;
  dueDate: string;
  status: string;
};

const TaskForm = ({ initialValues, onSubmit }: {
  initialValues: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
}) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required').max(100),
    description: Yup.string().required('Description is required').max(500),
    dueDate: Yup.string().required('Due date is required'),
    status: Yup.string().required('Status is required'),
  });

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Task</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="title"
              placeholder="Title"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field
              name="description"
              as="textarea"
              placeholder="Description"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field
              name="dueDate"
              type="date"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <Field
              name="status"
              as="select"
              className="w-full border p-2 rounded"
            >
              <option value="">Select Status</option>
              <option value="0">Pending</option>
              <option value="1">InProgress</option>
              <option value="2">Completed</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskForm;
