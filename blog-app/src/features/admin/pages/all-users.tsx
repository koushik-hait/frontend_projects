import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry, RowSelectionOptions } from "@ag-grid-community/core";
import { expressApi } from "@/lib/axios-conf";
import { IResponse, IPayload, IUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { ColDef, GridReadyEvent, SideBarDef } from "ag-grid-community";
const getAllUsers = async ({
  status = false,
  role = "USER",
  username = "",
  email = "",
}) => {
  const { data } = await expressApi.get<IResponse<IPayload<IUser[]>>>(
    `/blog/admin/users/all?status=${status}&role=${role}&username=${username}&email=${email}&page=1&limit=100`
  );
  return data.data;
};
export const AllUsers = () => {
  const [reqPayload, setReqPayload] = useState({
    status: false,
    role: "USER",
    username: "",
    email: "",
  });
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["admin-users-all"],
    queryFn: async () => await getAllUsers(reqPayload),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  const [colDefs, setColDefs] = useState<ColDef<IUser>[]>([
    {
      field: "username",
      width: 150,
      headerName: "User Name",
    },
    {
      field: "email",
      width: 150,
      headerName: "Email",
    },
    { field: "role", width: 150, headerName: "User Role" },
    {
      field: "isEmailVerified",
      editable: true,
      width: 150,
      headerName: "Email Verified",
    },
    { field: "createdAt", width: 150, headerName: "Registered Date" },
  ]);

  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: ["columns"],
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    // colDefs.forEach((colDef, index) => {
    //   colDef.headerName = "C" + index;
    // });
    // params.api.setGridOption("columnDefs", colDefs);
  }, []);

  console.log(data);
  return (
    <div>
      {data && (
        <div
          className="ag-theme-quartz-dark"
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact
            rowData={data.data}
            columnDefs={colDefs}
            // enableRangeSelection={true}
            enableCellTextSelection={true}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
              // checkboxSelection: true,
            }}
            sideBar={sideBar}
            rowGroupPanelShow={"always"}
            pivotPanelShow={"always"}
            onGridReady={onGridReady}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
          />
        </div>
      )}
    </div>
  );
};
