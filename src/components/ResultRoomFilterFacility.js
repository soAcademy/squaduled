import React from "react";

const ResultRoomFilterFacility = ({ facilities, setSelectedItem }) => {
  return (
    <div>
      <div className="text-lg font-bold">อุปกรณ์ที่ต้องการ</div>
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        <div className="relative flex items-center justify-center w-full">
          <ul className="flex list-none ml-0 -mx-4 overflow-x-auto scrollbar-none">
            {facilities.map((item) => (
              <li
                key={item.id}
                className="mx-4 py-4 text-gray-800 cursor-pointer hover:text-black"

              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultRoomFilterFacility;