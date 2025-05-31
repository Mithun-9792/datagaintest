import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TableRow {
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
}

interface TableState {
  rows: TableRow[];
}

const initialState: TableState = {
  rows: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const index = state.rows.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },

    changeStatus: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const { id, status } = action.payload;
      const row = state.rows.find((row) => row.id === id);
      if (row) {
        row.status = status;
      }
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
  },
});

export const { addRow, updateRow, deleteRow, setRows, changeStatus } =
  tableSlice.actions;
export const getRows = (state: { table: TableState }) => state.table.rows;
export default tableSlice.reducer;
