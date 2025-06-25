"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import NoteForm from "../NoteForm/NoteForm";
import { CreateNoteValues } from "@/types/note";
import css from "./NoteModal.module.css";
import { useState } from "react";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: CreateNoteValues;
}

export default function NoteModal({
  isOpen,
  onClose,
  initialValues,
}: NoteModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isMounted || !isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm
          initialValues={initialValues}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </div>
    </div>,
    document.body,
  );
}
