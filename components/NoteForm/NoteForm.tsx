"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, updateNote } from "../../lib/api";
import { Note } from "@/types/note";
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";

const tagOptions = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

interface NoteFormProps {
  note?: Note;
  onCancel: () => void;
  onSubmitSuccess?: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tag: Yup.string()
    .oneOf([...tagOptions])
    .required("Tag is required"),
});

export default function NoteForm({
  note,
  onCancel,
  onSubmitSuccess,
}: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: note ? updateNote : createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(note ? "Note updated!" : "Note created!");
      onSubmitSuccess?.();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Formik
      initialValues={{
        title: note?.title || "",
        content: note?.content || "",
        tag: note?.tag || "Todo",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (note) {
          mutation.mutate({ id: note.id, ...values });
        } else {
          mutation.mutate(values);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={6}
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
              {tagOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? note
                  ? "Updating..."
                  : "Creating..."
                : note
                  ? "Update"
                  : "Create"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
