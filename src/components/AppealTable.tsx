"use client";
import {
  Search,
  MoreVertical,
  SlidersVertical,
  ChevronUp,
  ListFilter,
  ChevronDown,
  Ellipsis,
  Eye,
  FileDown,
  Trash,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import BottomCenterModal from "./BottomCenterModal";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, deleteRow, getRows } from "@/_redux/slices/tableSlice";
import Modal from "./Modal";
import AppealedForm from "./AppealedForm";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Define the TableRow type with an index signature for string keys
type TableRow = {
  id: number;
  taxYear: number;
  company: string;
  state: string;
  assessor: string;
  accountNumber: string;
  deadline: string;
  status: string;
  appealedDate: string;
  appealedBy: string;
  [key: string]: string | number; // <-- Add this line
};

export default function AppealTable() {
  const dispatch = useDispatch();
  const rowData = useSelector(getRows) as TableRow[];
  const [tableData, setTableData] = useState<TableRow[]>(rowData);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [open, setOpen] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = tableData.length; // e.g., 120
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPaginationNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  useEffect(() => {
    setTableData(rowData);
  }, [rowData]);

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setTableData((prevData) =>
      [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  useEffect(() => {
    if (
      selectedRows.length === currentItems.length &&
      currentItems.length > 0
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, currentItems]);

  const toggleDropdown = (id: number) =>
    setOpen((prev) => (prev === id ? 0 : id));

  const handleUpdate = (data: object) => {
    console.log(data);
    setEditData(data);
    setShowModal(true);
    setOpen(0);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteRow(id));
    setOpen(0);
  };

  const handleDownloadPDF = (rowData: object) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Row Data", 14, 20);

    const tableData = Object.entries(rowData).map(([key, value]) => [
      key,
      String(value),
    ]);

    autoTable(doc, {
      head: [["Field", "Value"]],
      body: tableData,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [78, 214, 190] },
    });

    const fileName = `row-${Date.now()}.pdf`;
    doc.save(fileName);
    setOpen(0);
  };

  return (
    <div className="bg-white rounded-b-lg p-4 shadow-sm">
      <div className="flex items-center justify-end mb-4 gap-2">
        <div className="relative w-[400px] max-w-full">
          <input
            type="text"
            placeholder="Search by Property, Jurisdiction, Parcel Number or Client"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C4A65]" />
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md border border-teal-500 hover:bg-gray-100">
            <SlidersVertical className="w-5 h-5 text-teal-500" />
          </button>
          <button className="p-2 rounded-4xl border border-gray-200 hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Table Placeholder */}
      <div className="table-scroll-wrapper">
        <div
          className="table-scroll overflow-x-auto"
          style={{ overflowY: "visible" }}
        >
          <table
            className="min-w-[1200px] w-full text-sm border-separate"
            style={{ borderSpacing: "0 10px" }}
          >
            <thead>
              <tr className="bg-[#F1F5F9] text-left text-gray-700 font-semibold h-[54px] rounded-tl-[5px] rounded-tr-[5px]">
                <th
                  className="px-4 sticky left-0 bg-[#F1F5F9] z-10 rounded-bl-lg rounded-tl-lg"
                  style={{ minWidth: "60px" }}
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-6 h-6 rounded border-gray-300 bg-white text-white accent-[#F28372] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="px-4 min-w-[135px]">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Tax Year</span>
                    <div>
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("taxYear", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("taxYear", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>

                <th className="px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Company</span>
                    <div>
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("company", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("company", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>
                <th className="px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">State</span>
                    <div>
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("state", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("state", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>
                <th className="px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Assessor</span>
                    <div>
                      {" "}
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("assessor", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("assessor", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>
                <th className="px-4 min-w-[195px]">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Account Number</span>
                    <div>
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("accountNumber", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("accountNumber", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>
                <th className="px-4 min-w-[200px]">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Appealed Deadline</span>
                    <div>
                      {" "}
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("appealedDeadline", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("appealedDeadline", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>
                <th className="px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Status</span>
                    <div>
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("status", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("status", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>
                <th className="px-4 min-w-[170px]">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Appealed Date</span>
                    <div>
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("appealedDate", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("appealedDate", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>
                <th className="px-4 min-w-[170px]">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Appealed By</span>
                    <div>
                      {" "}
                      <ChevronUp
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("appealedBy", "asc")}
                      />
                      <ChevronDown
                        className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => handleSort("appealedBy", "desc")}
                      />
                    </div>
                    <ListFilter className="w-4 h-4 text-white" />
                  </div>
                </th>
                <th className="px-4 rounded-br-lg rounded-tr-lg">
                  <div className="flex items-center gap-1">
                    <span className="text-[#5F7181]">Action</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((row, i) => (
                <tr
                  key={row.id}
                  className="h-[54px] bg-[#F6F7F9] hover:bg-gray-50"
                  style={{ marginTop: "10px" }}
                >
                  <td
                    className="px-4 sticky left-0  z-10 rounded-bl-lg rounded-tl-lg"
                    style={{ minWidth: "60px", backgroundColor: "#F6F7F9" }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      className="w-6 h-6 rounded border-gray-300 accent-[#F28372] bg-white text-white focus:ring-0 cursor-pointer"
                    />
                  </td>
                  <td className="px-4">{row.taxYear}</td>
                  <td className="px-4">{row.company}</td>
                  <td className="px-4">{row.state}</td>
                  <td className="px-4">{row.assessor}</td>
                  <td className="px-4">{row.accountNumber}</td>
                  <td className="px-4">{row.deadline}</td>
                  <td
                    className={`px-4 ${
                      row.status == "Sent" ? "text-teal-500" : "text-red-500"
                    }`}
                  >
                    {row.status}
                  </td>
                  <td className="px-4">{row.appealedDate}</td>
                  <td className="px-4">{row.appealedBy}</td>
                  <td className="px-4 rounded-br-lg rounded-tr-lg relative">
                    <button
                      className={`p-2 rounded-4xl border ${
                        open === row.id
                          ? "border-red-200 bg-red-400"
                          : "border-gray-200 bg-gray-200"
                      }`}
                      onClick={() => toggleDropdown(row.id)}
                    >
                      <Ellipsis
                        className={`w-5 h-5 ${
                          open === row.id ? "text-amber-50" : "text-gray-500"
                        }`}
                      />
                    </button>

                    {open === row.id && (
                      <div
                        className={`absolute z-50 right-15 top-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg
    ${tableData.length - 1 === i ? "bottom-full mb-2" : "mt-2"}`}
                      >
                        <button
                          onClick={() => handleUpdate(row)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm bg-white hover:bg-gray-100"
                        >
                          <Eye /> Edit Letter
                        </button>
                        <button
                          onClick={() => {
                            dispatch(
                              changeStatus({
                                id: row.id,
                                status:
                                  row?.status == "Not Sent"
                                    ? "Sent"
                                    : "Not Sent",
                              })
                            );
                            setOpen(0);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <Eye /> Change Status
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(row)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          <FileDown /> Download
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-red-500 text-sm hover:bg-gray-100"
                        >
                          <Trash2 /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 px-2 text-sm text-gray-600">
        <span>
          {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &larr; Previous
          </button>

          {getPaginationNumbers().map((num, idx) =>
            typeof num === "number" ? (
              <button
                key={idx}
                className={`px-2 py-1 rounded ${
                  num === currentPage
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ) : (
              <span key={idx} className="px-2 select-none">
                ...
              </span>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next &rarr;
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span>Go on to</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            className="w-12 h-8 text-center border rounded-md"
            defaultValue={currentPage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = Number((e.target as HTMLInputElement).value);
                if (page >= 1 && page <= totalPages) setCurrentPage(page);
              }
            }}
          />
        </div>
      </div>

      {selectedRows.length > 0 && (
        <BottomCenterModal
          isOpen={true}
          onClose={() => console.log("Modal closed")}
          selectedCount={selectedRows.length} // You can pass this dynamically
          onExportGridDetails={() => console.log("Export Grid Details")}
          onDownloadLetter={() => console.log("Download Letter")}
          onChangeStatus={() => console.log("Change Status")}
        />
      )}
      {/* <div className="p-10"> */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">Edit</h2>
        <AppealedForm
          isEdit={true}
          formdata={editData}
          onClose={() => setShowModal(false)}
        />
      </Modal>
      {/* </div> */}
    </div>
  );
}
