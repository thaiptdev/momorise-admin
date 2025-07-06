import React from "react";
import { Plus } from "lucide-react";

interface PaintingManagementHeaderProps {
  onAddPainting: () => void;
}

const PaintingManagementHeader: React.FC<PaintingManagementHeaderProps> = ({
  onAddPainting,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Painting Management
        </h1>
        <p className="text-gray-600 mt-1">Manage your painting collection</p>
      </div>
      <button
        onClick={onAddPainting}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Painting
      </button>
    </div>
  );
};

export default PaintingManagementHeader;
