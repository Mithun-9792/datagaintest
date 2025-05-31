import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  color: string;
}

interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<CalendarEvent, "id">>) => {
      state.events.push({ ...action.payload, id: Date.now().toString() });
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },
    updateEvent: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<CalendarEvent> }>
    ) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload.updates,
        };
      }
    },
  },
});

export const { addEvent, deleteEvent, updateEvent } = calendarSlice.actions;
export const getEvents = (state: { calendar: CalendarState }) =>
  state.calendar.events;
export default calendarSlice.reducer;
