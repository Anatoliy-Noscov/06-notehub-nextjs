"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import NoteForm from "../NoteForm/NoteForm";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function NoteModal({ isOpen, onClose }: NoteModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <NoteForm onSuccess={onClose} onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}
