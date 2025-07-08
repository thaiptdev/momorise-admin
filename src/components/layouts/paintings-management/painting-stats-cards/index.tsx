import type { Painting } from "@/@types/painting";
import React from "react";

interface StatsCardsProps {
  paintings: Painting[];
}

const PaintingStatsCards: React.FC<StatsCardsProps> = ({ paintings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Paintings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">📊</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Paintings</p>
            <p className="text-2xl font-bold text-gray-900">
              {paintings.length}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold">🎨</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Horizontal</p>
            <p className="text-2xl font-bold text-gray-900">
              {paintings.filter((p) => p.style === "horizontal").length}
            </p>
          </div>
        </div>
      </div>

      {/* Vertical */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-semibold">🖼️</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Vertical</p>
            <p className="text-2xl font-bold text-gray-900">
              {paintings.filter((p) => p.style === "vertical").length}
            </p>
          </div>
        </div>
      </div>

      {/* Active */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold">✅</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Active</p>
            <p className="text-2xl font-bold text-gray-900">
              {paintings.filter((p) => p.status?.active).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingStatsCards;
