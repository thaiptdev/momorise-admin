import type {
  FilterStyle,
  FilterStatus,
  ModalType,
  Painting,
} from "@/@types/painting";
import React, { useState } from "react";
import { usePaintings } from "@/hooks/usePaintings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import PaintingManagementHeader from "../../components/layouts/paintings-management/painting-management-header";
import PaintingSearchAndFilter from "../../components/layouts/paintings-management/painting-search-and-filter";
import PaintingManagementTable from "../../components/layouts/paintings-management/painting-management-table";
import PaintingStatsCards from "../../components/layouts/paintings-management/painting-stats-cards";
import PaintingModals from "../../components/layouts/paintings-management/painting-modals";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";

const PaintingManagement: React.FC = () => {
  const {
    paintings,
    loading,
    error,
    addPainting,
    updatePainting,
    deletePainting,
    refetchPaintings,
  } = usePaintings();

  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null
  );
  const [modalType, setModalType] = useState<ModalType>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStyle, setFilterStyle] = useState<FilterStyle>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const filteredPaintings = paintings.filter((painting) => {
    const matchesSearch =
      painting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      painting.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStyle === "all" || painting.style === filterStyle;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && painting.status.active) ||
      (filterStatus === "inactive" && !painting.status.active);
    return matchesSearch && matchesFilter && matchesStatus;
  });

  const handleView = (painting: Painting): void => {
    setSelectedPainting(painting);
    setModalType("view");
  };

  const handleEdit = (painting: Painting): void => {
    setSelectedPainting(painting);
    setModalType("edit");
  };

  const handleDelete = (painting: Painting): void => {
    setSelectedPainting(painting);
    setModalType("delete");
  };

  const handleAddPainting = (): void => {
    setSelectedPainting(null);
    setModalType("add");
  };

  const handleUpdatePainting = async (
    updatedPainting: Painting
  ): Promise<void> => {
    // Count active paintings (excluding the one being updated if it was already active)
    const activeCount =
      paintings.filter((p) => p.status.active && p.id !== updatedPainting.id)
        .length + (updatedPainting.status.active ? 1 : 0);
    if (updatedPainting.status.active && activeCount > 6) {
      toast.warning("You can only have 6 active paintings at once.");
      return;
    }
    try {
      await updatePainting(updatedPainting.id, updatedPainting);
      setModalType(null);
      setSelectedPainting(null);
    } catch (err) {
      console.error("Failed to update painting:", err);
      toast.error("Failed to update painting.");
    }
  };

  const handleAddNewPainting = async (
    newPainting: Omit<Painting, "id">
  ): Promise<void> => {
    // Count active paintings
    const activeCount = paintings.filter((p) => p.status.active).length;
    if (newPainting.status.active && activeCount >= 6) {
      toast.warning("You can only have 6 active paintings at once.");
      return;
    }
    try {
      await addPainting(newPainting);
      setModalType(null);
      setSelectedPainting(null);
    } catch (err) {
      console.error("Failed to add painting:", err);
      toast.error("Failed to add painting.");
    }
  };

  const confirmDelete = async (): Promise<void> => {
    if (selectedPainting) {
      try {
        await deletePainting(selectedPainting.id);
        setModalType(null);
        setSelectedPainting(null);
      } catch (err) {
        console.error("Failed to delete painting:", err);
        // You might want to show a toast notification here
      }
    }
  };

  const handleStyleToggle = async (
    paintingId: string,
    newStyle: "horizontal" | "vertical"
  ): Promise<void> => {
    try {
      await updatePainting(paintingId, { style: newStyle });
    } catch (err) {
      console.error("Failed to update painting style:", err);
      // You might want to show a toast notification here
    }
  };

  const closeModal = (): void => {
    setModalType(null);
    setSelectedPainting(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-lg">Loading paintings...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading paintings: {error}
            <button
              onClick={refetchPaintings}
              className="ml-2 text-sm underline hover:no-underline"
            >
              Try Again
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />
      <PaintingManagementHeader onAddPainting={handleAddPainting} />

      <PaintingSearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStyle={filterStyle}
        onFilterChange={setFilterStyle}
        filterStatus={filterStatus}
        onStatusFilterChange={setFilterStatus}
      />

      <PaintingManagementTable
        paintings={filteredPaintings}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStyleToggle={handleStyleToggle}
      />

      <PaintingStatsCards paintings={paintings} />

      <PaintingModals
        modalType={modalType}
        selectedPainting={selectedPainting}
        onClose={closeModal}
        onConfirmDelete={confirmDelete}
        onUpdatePainting={handleUpdatePainting}
        onAddPainting={handleAddNewPainting}
      />
    </div>
  );
};

export default PaintingManagement;
