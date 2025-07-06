import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X } from "lucide-react";
import type { Painting } from "@/@types/painting";
import { PaintingForm } from "../painting-form";

interface AddPaintingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (painting: Omit<Painting, "id">) => void;
}

export const AddPaintingModal: React.FC<AddPaintingModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState<Omit<Painting, "id"> | null>(null);

  const handleAdd = () => {
    if (formData) {
      onAdd(formData);
      onClose();
    }
  };

  const isFormValid = formData?.title && formData?.author;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-y-auto">
        <div className="flex flex-col max-h-[90vh]">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                  <Plus className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900">
                    Add New Painting
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Create a new painting entry for your collection
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

          {/* Content */}
          <ScrollArea className="flex-1 p-6">
            <PaintingForm mode="add" onDataChange={setFormData} />
          </ScrollArea>

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
              onClick={handleAdd}
              disabled={!isFormValid}
              className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
            >
              Add Painting
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
