import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import css from "./Note.Form.module.css";
import * as Yup from "yup";
import type { CreateNoteValues } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "To short!")
    .max(50, "To long!")
    .required("Title is required!"),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
    .required("Tag is required!"),
});

const initialValues: CreateNoteValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
      toast.success("Success! Your note has been saved.");
    },
    onError: () => {
      toast.error("Oops! The note couldn't be saved.");
    },
  });

  function handleSubmit(
    values: CreateNoteValues,
    actions: FormikHelpers<CreateNoteValues>,
  ) {
    mutationCreate.mutate(values);
    actions.resetForm();
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            {mutationCreate.isPending ? (
              <button
                type="submit"
                className={css.submitButton}
                disabled={true}
              >
                Note creation...
              </button>
            ) : (
              <button
                type="submit"
                className={css.submitButton}
                disabled={false}
              >
                Create note
              </button>
            )}
          </div>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
}
