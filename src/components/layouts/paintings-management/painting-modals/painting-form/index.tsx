/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, User, FileText, Palette } from "lucide-react";
import ImageUpload from "@/components/common/image-upload";
import type { Painting } from "@/@types/painting";

interface PaintingFormProps {
  initialData?: Painting | null;
  onDataChange: (data: Omit<Painting, "id">) => void;
  mode: "add" | "edit";
}

export const PaintingForm: React.FC<PaintingFormProps> = ({
  initialData,
  onDataChange,
}) => {
  const [formData, setFormData] = useState<Omit<Painting, "id">>({
    title: initialData?.title || "",
    author: initialData?.author || "",
    content: initialData?.content || "",
    style: initialData?.style || "horizontal",
    thumbnail: initialData?.thumbnail || "",
  });

  // Update form data when initialData changes (important for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        content: initialData.content,
        style: initialData.style,
        thumbnail: initialData.thumbnail,
      });
    }
  }, [initialData]);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleInputChange = (
    field: keyof Omit<Painting, "id">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));
  };

  const styles = [
    {
      value: "horizontal",
      label: "Horizontal",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "vertical",
      label: "Vertical",
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Image Section */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-700">
                Thumbnail Image
              </Label>
            </div>

            {/* Image Upload Component */}
            <div className="flex justify-center">
              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImage={formData.thumbnail}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Title and Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title
                </Label>
              </div>
              <Input
                id="title"
                placeholder="Enter painting title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                <Label
                  htmlFor="author"
                  className="text-sm font-medium text-gray-700"
                >
                  Artist
                </Label>
              </div>
              <Input
                id="author"
                placeholder="Enter artist name"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Style Selection */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-700">Style</Label>
            </div>
            <div className="flex gap-2">
              {styles.map((style) => (
                <Badge
                  key={style.value}
                  variant={
                    formData.style === style.value ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    formData.style === style.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleInputChange("style", style.value as any)}
                >
                  {style.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-600" />
              <Label
                htmlFor="content"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </Label>
            </div>
            <Textarea
              id="content"
              placeholder="Describe the painting, its history, techniques, or any interesting details..."
              rows={4}
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
