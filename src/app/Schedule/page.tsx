"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "@/components/Modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, getEvents } from "@/_redux/slices/calenderSlice";
import { ArrowRightFromLine, Plus, Printer, Trash2 } from "lucide-react";
import type { DateClickArg } from "@fullcalendar/interaction";

interface EventData {
  id: string;
  title: string;
  date: string;
  color: string;
}

export default function Schedule() {
  const dispatch = useDispatch();
  const allEvents = useSelector(getEvents);
  const [events, setEvents] = useState<EventData[]>([
    {
      id: Date.now().toString(),
      title: "Blue",
      date: "2023-07-03",
      color: "blue",
    },
    {
      id: (Date.now() + 1).toString(),
      title: "Orange",
      date: "2023-07-03",
      color: "orange",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "Event",
    title: "",
    color: "blue",
    date: "",
  });

  useEffect(() => {
    if (allEvents.length > 0) {
      setEvents(allEvents);
    }
  }, [allEvents]);

  const handleDateClick = (info: DateClickArg) => {
    setFormData({
      type: "Event",
      title: "",
      color: "blue",
      date: info.dateStr,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title) return toast.warning("Please enter title");

    const newEvent: EventData = {
      id: Date.now().toString(),
      title: `${formData.type}: ${formData.title}`,
      date: formData.date,
      color: formData.color,
    };

    setEvents([...events, newEvent]);
    dispatch(addEvent(newEvent));

    setIsModalOpen(false);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="p-4">
      <div className="p-4 bg-gray-100 rounded-xl shadow-md space-y-4 my-4">
        {/* Top Row */}
        <div className="flex items-center gap-4 flex-wrap bg-gray-300 rounded-4xl p-3">
          <label className="text-lg font-bold whitespace-nowrap">
            Add new schedule(s) :
          </label>
          <select className="w-full sm:w-60 md:w-72 lg:w-80 px-4 py-2 bg-white border border-gray-300 rounded-4xl focus:outline-none focus:ring-0 focus:border-gray-400">
            <option value="">Select Months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <button className="bg-teal-500 text-white px-4 py-2 rounded-4xl hover:bg-teal-600 transition">
            SCHEDULE
          </button>
          <button className="bg-white border border-gray-400 text-gray-800 px-4 py-2 rounded-4xl hover:bg-gray-200 transition">
            RESET
          </button>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300" />

        {/* Bottom Row */}
        <div className="flex gap-3 flex-wrap">
          <button className="flex items-center gap-2 bg-teal-500 text-white font-semibold px-4 py-2 rounded-4xl hover:bg-teal-600 transition">
            <Plus /> REPLENISH
          </button>

          <button className="flex items-center gap-2 bg-teal-500 text-white font-semibold px-4 py-2 rounded-4xl hover:bg-teal-600 transition">
            <Trash2 /> DELETE SCHEDULE
          </button>

          <button className="flex items-center gap-2 bg-teal-500 text-white font-semibold px-4 py-2 rounded-4xl hover:bg-teal-600 transition">
            <ArrowRightFromLine /> EXPORT & DOWNLOAD
          </button>

          <button className="flex items-center gap-2 bg-teal-500 text-white font-semibold px-4 py-2 rounded-4xl hover:bg-teal-600 transition">
            <Printer /> PRINT
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        height="auto"
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
      />

      {/* Modal Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Add Event / Reminder</h2>
          <div className="space-y-2">
            <label className="block">Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            >
              <option value="Event">Event</option>
              <option value="Reminder">Reminder</option>
            </select>

            <label className="block">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />

            <label className="block">Color:</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-16 h-10 border p-1"
            />

            <label className="block">Date:</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              readOnly
              className="w-full border p-2 bg-gray-100 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>

      {/* Optional: Custom Styles */}
      <style jsx global>{`
        .fc-button {
          background-color: white !important;
          border: 1px solid #ccc !important;
          border-radius: 6px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
          padding: 5px 10px !important;
          text-transform: capitalize;
          color: #333 !important;
        }
        .fc-button-active {
          background-color: rgba(0, 0, 0, 0.2) !important;
          color: white !important;
        }
        .fc-toolbar-title {
          font-size: 20px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
