import React from "react";

const Timetable = ({ Timing, coursecode, RoomNumber }) => {
  return (
    <div className="min-h-36 flex flex-col  border-2 border-black max-w-44 justify-between timetable  rounded-xl">
      <div className="min-h-10 ttt">
        <h1 className="text-2xl font-bold">{coursecode}</h1>
        <h1 className="text-xl font-semibold">{Timing}</h1>
      </div>
      <div className="text-center ttt"> Room no: {RoomNumber}</div>
    </div>
  );
};

export default Timetable;
