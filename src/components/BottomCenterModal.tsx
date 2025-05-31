import { Download, X } from "lucide-react";
import React from "react";

interface BottomCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onExportGridDetails: () => void;
  onDownloadLetter: () => void;
  onChangeStatus: () => void;
}

const BottomCenterModal: React.FC<BottomCenterModalProps> = ({
  isOpen,
  onClose,
  selectedCount,
  onExportGridDetails,
  onDownloadLetter,
  onChangeStatus,
}) => {
  if (!isOpen) {
    return null; // Don't render if not open
  }

  return (
    // Overlay for background and positioning
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-end justify-center p-4 sm:p-6 lg:p-8">
      {/* Modal content container */}
      <div className="relative w-full max-w-[800px] transform rounded-xl border border-gray-200 bg-white pt-5 pr-[10px] pb-5 pl-10 shadow-2xl transition-all">
        <div className="flex items-center justify-between gap-4">
          {/* Left section: Text and count */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-[#2C4E6C]">
              {selectedCount} Appeal Letter selected
            </span>
          </div>

          {/* Right section: Buttons and close icon */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Export Grid Details Button */}
            <button
              onClick={onExportGridDetails}
              className="flex items-center justify-center rounded-lg border border-teal-300 bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow-sm transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Grid Details
            </button>

            {/* Download Letter Button */}
            <button
              onClick={onDownloadLetter}
              className="flex items-center justify-center rounded-lg border border-teal-300 bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow-sm transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Download Letter
            </button>

            {/* Change Status Button */}
            <button
              onClick={onChangeStatus}
              className="flex items-center justify-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Change Status
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCenterModal;
