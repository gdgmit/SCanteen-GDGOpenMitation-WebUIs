import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Navbar from "../../components/Navbar";

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);


const ProfitAnalysis = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedWeekData, setSelectedWeekData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Fetch provisions data
    // TODO: actual backed api should be updated
    fetch("/data/scanteen_profit_analysisdata.json")
      .then((response) => response.json())
      .then((data) => {
        setWeeklyData(data);

        const currentWeekStart = dayjs()
          .startOf("isoWeek")
          .format("DD-MM-YYYY");
        const currentWeekData = data.find((week) => {
          return week.weekStart === currentWeekStart;
        });

        setSelectedWeekData(currentWeekData || null);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const startOfWeek = dayjs(date).startOf("isoWeek").format("DD-MM-YYYY");
    const weekData = weeklyData.find((week) => week.weekStart === startOfWeek);

    setSelectedWeekData(weekData || null);
  };

  return (
    <div>
      
      <div className="p-4 w-full mx-auto bg-white min-h-[100vh]">
        <div className="sticky top-0 z-20 shadow-md">
          <Navbar role="admin" />
        </div>
        <h1 className="text-2xl font-bold mb-4 mt-4 text-center text-[#5777C7]">
          Profit Analysis
        </h1>

        <div className="flex justify-center mb-4 items-center">
          <label className="mr-2">Select a Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            className="border p-2 rounded-lg"
          />
        </div>

        {selectedWeekData ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#5777C7] text-white">
                <th className="border p-2">Week Start</th>
                <th className="border p-2">Provisions Purchased</th>
                <th className="border p-2">Sales Amount</th>
                <th className="border p-2">Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#f5f5f5]">
                <td className="border p-2">{selectedWeekData.weekStart}</td>
                <td className="border p-2">₹{selectedWeekData.purchaseTotal}</td>
                <td className="border p-2">₹{selectedWeekData.salesTotal}</td>
                <td className="border p-2">₹{selectedWeekData.profit}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg text-[#777] mt-4">
            No data available for this week.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfitAnalysis;
