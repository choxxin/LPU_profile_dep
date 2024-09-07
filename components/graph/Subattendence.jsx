import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import Timetable from "./Timetable";

const chartSetting = {
  xAxis: [
    {
      label: "Aggregate Attendance (%)",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value}%`;

export default function HorizontalBars() {
  const [data, setData] = useState([]);
  const { registrationNumber, pass, cook } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [todayTimetable, setTodayTimetable] = useState([]);
  useEffect(() => {
    const requestBody = {
      reg_no: registrationNumber,
      password: pass,
      cookie: cook,
    };
    setLoading(true);

    fetch("http://localhost:8000/api/v1/timetable/today", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `ASP.NET_SessionId=${requestBody.cookie}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((result) => {
        // Mapping timetable courses to their corresponding misc_details
        const transformedData = Object.values(result.misc_details).map(
          (timetableItem) => {
            return {
              month: timetableItem.course_code, // Using course_code as the label for the chart
              london: parseFloat(timetableItem.agg_attendance), // Converting attendance string to float
            };
          }
        );
        setTodayTimetable(result.today_time_table);

        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching timetable data:", error);
        setLoading(false); // Stop loading in case of an error
      });
  }, [registrationNumber, pass, cook]);

  return loading ? (
    <div className="flex justify-center min-h-16">
      <span className="loading loading-infinity loading-lg text-5xl"></span>
    </div>
  ) : (
    <div className="flex  mt-10">
      <div>
        <h2 className="text-2xl  text-slate-950 font-extrabold mb-5">
          Today's Timetable
        </h2>
        <div className="flex flex-wrap gap-5">
          {todayTimetable.map((item, index) => (
            <div key={index}>
              <Timetable
                Timing={item.timing}
                coursecode={item.course_code}
                RoomNumber={item.room_number}
              />
            </div>
          ))}
        </div>
      </div>

      <BarChart
        dataset={data}
        yAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          {
            dataKey: "london",
            label: "Subject-wise Attendance",
            valueFormatter,
          },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
}
