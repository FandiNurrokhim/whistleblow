import React, { useState, useEffect, useRef } from "react";
import Checkbox from "@/Components/Checkbox";
import Modal from "@/Components/Modal";

import { useTranslation } from "react-i18next";

function TableHeader({ columns, onSelectAll, isAllSelected, useSelectedDelete = true }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        {onSelectAll && useSelectedDelete && (
          <th className="px-4 py-3">
            <Checkbox
              checked={isAllSelected || false}
              onCheckedChange={(checked) => onSelectAll(!!checked)}
            />
          </th>
        )}

        {onSelectAll && !useSelectedDelete && (
          <th className="px-4 py-3 text-center">No</th>
        )}

        {columns.map((column, index) => {
          const autoCenter =
            typeof column.header === "string" &&
            (column.header.toLowerCase().includes("aksi") ||
              column.header.toLowerCase().includes("actions"));

          const headerClass =
            column.className || column.headerClassName || (autoCenter ? "text-center" : "");

          return (
            <th key={index} className={`px-4 py-3 ${headerClass}`}>
              {column.header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}


function TableBody({ columns, data, selectedRows, onRowSelect, isProcessing, useSelectedDelete = true, currentPage = 1, perPage = 10 }) {
  const skeletonRows = Array.from({ length: 5 });
  const { t } = useTranslation();

  return (
    <tbody>
      {isProcessing ? (
        skeletonRows.map((_, rowIndex) => (
          <tr key={rowIndex} className="animate-pulse bg-white border-b border-gray-200">
            {onRowSelect && (
              <td className="px-4 py-3">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </td>
            )}
            {columns.map((_, colIndex) => (
              <td key={colIndex} className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </td>
            ))}
          </tr>
        ))
      ) : data.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length + (onRowSelect ? 1 : 0)}
            className="py-10 text-center text-gray-800"
          >
            {t("global.noDataFound")}
          </td>
        </tr>
      ) : (
        data.map((row, rowIndex) => (
          <tr
            key={row.id}
            className="bg-white border-b border-gray-200 hover:bg-gray-50"
          >
            {onRowSelect && useSelectedDelete && (
              <td className="px-4 py-3">
                <Checkbox
                  checked={selectedRows?.has(row.id) || false}
                  onCheckedChange={(checked) => onRowSelect(row.id, !!checked)}
                />
              </td>
            )}
            {onRowSelect && !useSelectedDelete && (
              <td className="px-4 py-3 text-center">
                {(currentPage - 1) * perPage + rowIndex + 1}
              </td>
            )}
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className={`px-1 py-2 text-black ${column.className || ""}`}
              >
                {typeof column.accessor === "function"
                  ? column.accessor(row)
                  : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
}

const TableFooter = ({ currentPage, totalPages, onPageChange, isProcessing }) => {
  const { t } = useTranslation();

  const renderPageNumbers = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(
          <li key={i}>
            <button
              onClick={() => onPageChange(i)}
              className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border ${i === currentPage
                ? "text-white bg-[#D9B36A] hover:bg-[#c49d4e] border-primary-300"
                : "text-gray-800 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
            >
              {i}
            </button>
          </li>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <li key={`dots-${i}`}>
            <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-800 bg-white border border-gray-300">
              ...
            </span>
          </li>
        );
      }
    }

    return pages;
  };

  if (isProcessing) {
    return (
      <nav
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-800">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          {[...Array(5)].map((_, idx) => (
            <li key={idx}>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse mx-1" />
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-800">
        {t("global.showing")} <span className="font-semibold text-gray-900">{currentPage}</span> {t("global.of")}{" "}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-800 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        {renderPageNumbers()}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-800 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Next</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

function TableToolbar({
  onSearch,
  onAdd,
  addButtonText = "Tambah Data",
  filters,
  onFilterChange,
  actions,
  selectedRows,
  onDeleteSelected,
  hideAddButton,
}) {
  const { t } = useTranslation();

  const handleDelete = () => {
    if (onDeleteSelected) {
      onDeleteSelected(Array.from(selectedRows));
    }
  };

  return (
    <div className="lg:flex md:flex flex-row gap-2 items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        {onSearch && (
          <input
            type="text"
            placeholder={t("global.search") + "..."}
            className="border rounded px-2 py-1"
            onChange={(e) => onSearch(e.target.value)}
          />
        )}
        {filters && onFilterChange && (
          <select
            className="border rounded px-2 py-1"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="">All</option>
            {filters.map((filter, index) => (
              <option key={index} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {selectedRows.size > 0 ? (
          <div className="flex gap-2">
            {actions && Array.isArray(actions) && actions.map((action, index) => (
              <button
                key={index}
                onClick={() => action.action(Array.from(selectedRows))}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${action.className}`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
            {onDeleteSelected && (
              <button
                onClick={handleDelete}
                className="mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-300 ease-in-out hover:bg-red-800"
              >
                Hapus {selectedRows.size} data terpilih
              </button>
            )}
          </div>
        ) : (
          onAdd && !hideAddButton && (
            <button
              onClick={onAdd}
              className="mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-3 bg-[#D9B36A] text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D9B36A] transition-all duration-300 ease-in-out hover:bg-[#c49d4e]"
            >
              {t('global.create')} {addButtonText}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default function Table({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  onSearch,
  onAdd,
  onAddLink,
  addButtonText = "Tambah Data",
  filters,
  onFilterChange,
  selectable = false,
  onDeleteSelected,
  addType = "page",
  AddModalContent,
  isProcessing = false,
  useSelectedDelete = true,
  toolbarActions,
  perPage = 10,
  hideAddButton = false,
}) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const tableScrollRef = useRef(null);

  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allIds = new Set(data.map((row) => row.id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  useEffect(() => {
    if (isProcessing) {
      setSelectedRows(new Set());
    }
  }, [isProcessing]);

  const handleRowSelect = (rowId, isSelected) => {
    const newSelectedRows = new Set(selectedRows);
    if (isSelected) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleAdd = () => {
    if (addType === "modal") {
      onAdd();
    } else if (addType === "page" && onAddLink) {
      window.location.href = onAddLink;
    }
  };

  return (
    <div className="container h-full">
      <TableToolbar
        onSearch={(query) => setSearchQuery(query)}
        onAdd={handleAdd}
        addButtonText={addButtonText}
        filters={filters}
        onFilterChange={onFilterChange}
        selectedRows={selectedRows}
        actions={toolbarActions}
        onDeleteSelected={useSelectedDelete ? onDeleteSelected : undefined}
        hideAddButton={hideAddButton}
      />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
          <TableHeader
            columns={columns}
            onSelectAll={selectable ? handleSelectAll : undefined}
            isAllSelected={data.length > 0 && selectedRows.size === data.length}
            useSelectedDelete={useSelectedDelete}
          />
          <TableBody
            columns={columns}
            data={data}
            selectedRows={selectable ? selectedRows : undefined}
            onRowSelect={selectable ? handleRowSelect : undefined}
            isProcessing={isProcessing}
            useSelectedDelete={useSelectedDelete}
            currentPage={currentPage}
            perPage={perPage}
          />
        </table>
      </div>
      {currentPage !== undefined &&
        totalPages !== undefined &&
        onPageChange && (
          <TableFooter
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isProcessing={isProcessing}
          />
        )}

      {addType === "modal" && AddModalContent && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddModalContent onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
