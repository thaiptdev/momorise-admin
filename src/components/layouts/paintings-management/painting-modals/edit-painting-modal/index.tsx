import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit3, X } from "lucide-react";
import type { Painting } from "@/@types/painting";
import { PaintingForm } from "../painting-form";

interface EditPaintingModalProps {
  isOpen: boolean;
  painting: Painting | null;
  onClose: () => void;
  onUpdate: (painting: Painting) => void;
}

export const EditPaintingModal: React.FC<EditPaintingModalProps> = ({
  isOpen,
  painting,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Omit<Painting, "id"> | null>(null);

  useEffect(() => {
    if (painting) {
      setFormData({
        title: painting.title,
        author: painting.author,
        content: painting.content,
        style: painting.style,
        thumbnail: painting.thumbnail,
        status: painting.status,
      });
    }
  }, [painting]);

  const handleUpdate = () => {
    if (formData && painting) {
      onUpdate({ ...formData, id: painting.id });
      onClose();
    }
  };

  const isFormValid = formData?.title && formData?.author;

  if (!painting) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    Edit Painting
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Update the details of <strong>"{painting.title}"</strong>
                  </DialogDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-white/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 max-h-[65vh]">
            <PaintingForm
              mode="edit"
              initialData={painting}
              onDataChange={setFormData}
            />
          </div>

          {/* Footer */}
          <DialogFooter className="px-6 py-4 border-t bg-gray-50 gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={!isFormValid}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
