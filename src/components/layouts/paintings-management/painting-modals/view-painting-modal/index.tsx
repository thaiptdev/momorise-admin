import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Palette, FileText, X, ImageIcon } from "lucide-react";
import type { Painting } from "@/@types/painting";

interface ViewPaintingModalProps {
  isOpen: boolean;
  painting: Painting | null;
  onClose: () => void;
}

export const ViewPaintingModal: React.FC<ViewPaintingModalProps> = ({
  isOpen,
  painting,
  onClose,
}) => {
  if (!painting) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {painting.title}
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Painting details and information
                </p>
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
          <div className="flex-1 overflow-y-auto p-6 max-h-[65vh]">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Image */}
                  <div className="flex justify-center">
                    {painting.thumbnail ? (
                      <div className="relative group">
                        <img
                          src={painting.thumbnail}
                          alt={painting.title}
                          className="w-64 h-64 object-cover rounded-xl shadow-2xl transition-transform group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            No image available
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Title</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 pl-6">
                        {painting.title}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">Artist</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 pl-6">
                        {painting.author}
                      </p>
                    </div>
                  </div>

                  {/* Style Badge */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Palette className="w-4 h-4" />
                      <span className="text-sm font-medium">Style</span>
                    </div>
                    <div className="pl-6">
                      <Badge
                        variant="secondary"
                        className="capitalize bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 px-3 py-1"
                      >
                        {painting.style}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">Description</span>
                    </div>
                    <div className="pl-6">
                      <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                        {painting.content}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <DialogFooter className="px-6 py-4 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white hover:bg-gray-100"
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
