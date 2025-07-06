/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Painting } from "@/@types/painting";

interface PaintingManagementTableProps {
  paintings: Painting[];
  onView?: (painting: Painting) => void;
  onEdit?: (painting: Painting) => void;
  onDelete?: (painting: Painting) => void;
  onStyleToggle?: (
    paintingId: string,
    newStyle: "horizontal" | "vertical"
  ) => void;
}

const truncateText = (text: string, maxLength: number): string => {
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
};

const PaintingManagementTable: React.FC<PaintingManagementTableProps> = ({
  paintings,
  onView,
  onEdit,
  onDelete,
  onStyleToggle,
}) => {
  const handleView = (painting: Painting): void => {
    onView ? onView(painting) : alert(`Viewing: ${painting.title}`);
  };

  const handleEdit = (painting: Painting): void => {
    onEdit ? onEdit(painting) : alert(`Editing: ${painting.title}`);
  };

  const handleDelete = (painting: Painting): void => {
    if (onDelete) {
      onDelete(painting);
    } else {
      if (
        window.confirm(`Are you sure you want to delete "${painting.title}"?`)
      ) {
        // Optional fallback delete logic
      }
    }
  };

  const handleStyleToggle = (
    paintingId: string,
    newStyle: "horizontal" | "vertical"
  ): void => {
    if (onStyleToggle) {
      onStyleToggle(paintingId, newStyle);
    }
  };

  return (
    <div className="py-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Thumbnail",
                  "Title",
                  "Author",
                  "Content",
                  "Style",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paintings.map((painting) => (
                <tr key={painting.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 w-16 h-16">
                      {painting.thumbnail ? (
                        <img
                          src={painting.thumbnail}
                          alt={painting.title}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {painting.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {painting.author}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    {truncateText(painting.content, 50)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={painting.style === "vertical"}
                        onCheckedChange={(checked: boolean) =>
                          handleStyleToggle(
                            painting.id,
                            checked ? "vertical" : "horizontal"
                          )
                        }
                      />
                      <span className="text-sm text-gray-600">
                        {painting.style}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(painting)}
                        className="p-2"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(painting)}
                        className="p-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(painting)}
                        className="p-2 text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaintingManagementTable;
