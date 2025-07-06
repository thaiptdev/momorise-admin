import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import type { Painting } from "@/@types/painting";

interface DeletePaintingModalProps {
  isOpen: boolean;
  painting: Painting | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeletePaintingModal: React.FC<DeletePaintingModalProps> = ({
  isOpen,
  painting,
  onClose,
  onConfirm,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="space-y-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <AlertDialogTitle className="text-center text-xl font-semibold">
            Delete Painting
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-900">
              "{painting?.title}"
            </span>
            ? This action cannot be undone and will permanently remove this
            painting from your collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 sm:gap-2">
          <AlertDialogCancel className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white hover:bg-red-700 border-0"
          >
            Delete Painting
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
