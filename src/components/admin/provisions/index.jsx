import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

const Provisions = () => {
  const [provisions, setProvisions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [filteredProvisions, setFilteredProvisions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch provisions data
    // TODO: actual backed api should be updated
    fetch("/data/scanteen_provisions_sampledata.json")
      .then((response) => response.json())
      .then((data) => {
        setProvisions(data);
      })
      .catch((error) => {
        console.error("Error fetching provisions data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter provisions based on selected date
    const filteredData = provisions.filter((provision) => {
      return (
        dayjs(provision.provPurchaseDate, "DD-MM-YYYY hh:mm:ss A").format(
          "DD-MM-YYYY"
        ) === dayjs(selectedDate).format("DD-MM-YYYY")
      );
    });
    setFilteredProvisions(filteredData);
  }, [selectedDate, provisions]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const totalAmount = filteredProvisions.reduce(
    (acc, provision) => acc + provision.provPrice * provision.provQuantity,
    0
  );

  return (
    <div className="p-4 w-full mx-auto bg-white min-h-[100vh]">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#5777C7]">
        Provisions
      </h1>

      <div className="flex justify-between mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          className="border p-2 rounded-lg pl-14"
        />
        <button
          onClick={() => navigate("/admin/provisions/new")}
          className="bg-[#5777C7] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition mt-4 ml-2"
        >
          Add Provision
        </button>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border p-2 text-center">Provision Name</th>
            <th className="border p-2 text-center">Quantity</th>
            <th className="border p-2 text-center">Price</th>
            <th className="border p-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredProvisions.map((provision) => (
            <tr key={provision.provId} className="bg-[#f5f5f5] rounded-lg mb-2">
              <td className="border p-2 text-center">{provision.provName}</td>
              <td className="border p-2 text-center">
                {provision.provQuantity}
              </td>
              <td className="border p-2 text-center">₹{provision.provPrice}</td>
              <td className="border p-2 text-center">
                ₹{provision.provPrice * provision.provQuantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-lg font-bold text-right text-[#5777C7]">
        Total Amount: ₹{totalAmount}
      </div>
    </div>
  );
};

export default Provisions;
