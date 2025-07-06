import React from "react";
import type { ModalType, Painting } from "@/@types/painting";
import { DeletePaintingModal } from "./delete-painting-modal";
import { ViewPaintingModal } from "./view-painting-modal";
import { AddPaintingModal } from "./add-painting-modal";
import { EditPaintingModal } from "./edit-painting-modal";

interface PaintingModalsProps {
  modalType: ModalType;
  selectedPainting: Painting | null;
  onClose: () => void;
  onConfirmDelete: () => void;
  onUpdatePainting?: (painting: Painting) => void;
  onAddPainting?: (painting: Omit<Painting, "id">) => void;
}

export const PaintingModals: React.FC<PaintingModalsProps> = ({
  modalType,
  selectedPainting,
  onClose,
  onConfirmDelete,
  onUpdatePainting,
  onAddPainting,
}) => {
  return (
    <>
      <DeletePaintingModal
        isOpen={modalType === "delete"}
        painting={selectedPainting}
        onClose={onClose}
        onConfirm={onConfirmDelete}
      />

      <ViewPaintingModal
        isOpen={modalType === "view"}
        painting={selectedPainting}
        onClose={onClose}
      />

      <AddPaintingModal
        isOpen={modalType === "add"}
        onClose={onClose}
        onAdd={onAddPainting!}
      />

      <EditPaintingModal
        isOpen={modalType === "edit"}
        painting={selectedPainting}
        onClose={onClose}
        onUpdate={onUpdatePainting!}
      />
    </>
  );
};

export default PaintingModals;
