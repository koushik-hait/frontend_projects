import React, { useState, useMemo } from "react";

type SortDirection = "asc" | "desc" | null;

type SortConfig<T> = {
  key: keyof T | string;
  direction: SortDirection;
};

// type TableProps = {
//   colDefs: ColumnDefinition[];
//   data: Record<string, any>[];
// };

type TableProps<T extends Record<string, any>> = {
  colDefs: ColumnDefinition<T>[];
  data: T[];
};

type ColumnDefinition<T> = {
  header: string;
  key: keyof T;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  hidden?: boolean;
  className?: string;
  style?: React.CSSProperties;
  editable?: boolean;
  // Rendering and formatting
  formatter?: (value: any, row?: T) => string | React.ReactNode;
  render?: (value: any, row: T) => React.ReactNode;
  transform?: (value: any) => any;
  // Interaction handlers
  onClick?: (value: any, row: T) => void;
  onDoubleClick?: (value: any, row: T) => void;
  // Validation and filtering
  validate?: (value: any) => boolean;
  filter?: (value: any, filterTerm: string) => boolean;
  // Conditional rendering
  visible?: (row: T) => boolean;
  // Custom sorting
  comparator?: (a: any, b: any) => number;
};

// type ColumnDefinition = {
//   header: string;
//   key: string;
//   width?: number;
//   sortable?: boolean;
//   filterable?: boolean;
//   searchable?: boolean;
//   hidden?: boolean;
//   formatter?: (value: any) => string;
//   editable?: boolean;
//   render?: (value: T[keyof T], row: T) => React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
//   onClick?: (value: any) => void;
//   onDoubleClick?: (value: any) => void;
//   onContextMenu?: (value: any) => void;
// };

/**
 * Renders a table with given column definitions and data.
 * @param {TableProps} props - The properties for the table component.
 * @returns {JSX.Element} The rendered table element.
 */
function Table<T extends Record<string, any>>({
  colDefs,
  data,
}: TableProps<T>): JSX.Element {
  // Sorting State
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  // Sorting Function
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      // Find the corresponding column definition
      const column = colDefs.find((col) => col.key === sortConfig.key);

      // Get value using nested key accessor
      const getValue = (obj: any, path: string) =>
        path
          .split(".")
          .reduce(
            (acc, part) =>
              acc && acc[part] !== undefined ? acc[part] : undefined,
            obj
          );

      const valueA = getValue(a, sortConfig.key as string);
      const valueB = getValue(b, sortConfig.key as string);

      // Use custom comparator if provided
      if (column?.comparator) {
        return sortConfig.direction === "asc"
          ? column.comparator(valueA, valueB)
          : column.comparator(valueB, valueA);
      }

      // Default comparison
      if (valueA == null) return sortConfig.direction === "asc" ? 1 : -1;
      if (valueB == null) return sortConfig.direction === "asc" ? -1 : 1;

      // String comparison
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Numeric comparison
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      // Fallback to string conversion
      return sortConfig.direction === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }, [data, sortConfig, colDefs]);

  // Handle Sorting
  const handleSort = (column: ColumnDefinition<T>) => {
    if (!column.sortable) return;

    // Determine next sort direction
    const getCurrentDirection = () => {
      if (!sortConfig || sortConfig.key !== column.key) {
        return "asc";
      }
      switch (sortConfig.direction) {
        case null:
          return "asc";
        case "asc":
          return "desc";
        case "desc":
          return null;
      }
    };

    const nextDirection = getCurrentDirection();

    setSortConfig(
      nextDirection ? { key: column.key, direction: nextDirection } : null
    );
  };

  // Render Sort Icon
  const renderSortIcon = (column: ColumnDefinition<T>) => {
    if (!column.sortable) return null;

    const isCurrentColumn = sortConfig?.key === column.key;

    return (
      <span className="sort-icon">
        {isCurrentColumn && (
          <>
            {sortConfig?.direction === "asc" && "▲"}
            {sortConfig?.direction === "desc" && "▼"}
          </>
        )}
      </span>
    );
  };
  // Function to safely render cell content
  const renderCellContent = (colDef: ColumnDefinition<T>, row: T) => {
    // const value = row[colDef.key];
    // Get cell value
    const getValue = (obj: any, path: string) =>
      path
        .split(".")
        .reduce(
          (acc, part) =>
            acc && acc[part] !== undefined ? acc[part] : undefined,
          obj
        );

    const value = getValue(row, colDef.key as string);

    // If custom render function exists, use it
    if (colDef.render) {
      return colDef.render(value, row);
    }

    // If formatter exists, use it
    if (colDef.formatter) {
      return colDef.formatter(value, row);
    }

    // Default rendering
    return value ?? "";
  };

  return (
    <table className="min-w-full text-sm text-gray-400">
      <thead className="bg-gray-800 text-xs uppercase font-medium">
        <tr>
          {colDefs.map((colDef, index) => (
            <th
              key={String(colDef.key) || index}
              scope="col"
              className={` px-6 py-3 text-left tracking-wider  
                ${colDef.className || ""} 
                ${colDef.sortable ? "sortable" : ""}
              `}
              style={colDef.width ? { width: `${colDef.width}px` } : {}}
              onClick={() => handleSort(colDef)}
            >
              {colDef.header}
              {renderSortIcon(colDef)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-gray-800">
        {sortedData.map((row, rowIndex) => (
          <tr className="bg-black bg-opacity-20" key={rowIndex}>
            {colDefs.map((colDef, colIndex) => (
              <td
                key={String(colDef.key) || colIndex}
                className="px-6 py-4 whitespace-nowrap"
                onClick={() => colDef.onClick?.(row[colDef.key], row)}
              >
                {renderCellContent(colDef, row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
