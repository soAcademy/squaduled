import React from "react";

const ResultRoomLists = ({ setSelectedRoom, availableRoomsFilterd }) => {
  return (
    <>
      {" "}
      <div className="text-lg text-center font-bold mb-2">
       {availableRoomsFilterd.length === 0 ? "ไม่มีห้องว่าง":"รายการห้องที่สามารถจองได้"}
      </div>
      <div className="overflow-y-auto max-h-70">
      <div className="relative items-center justify-center text-center w-full overflow-hidden ">
        {availableRoomsFilterd.map((room) => (
          <div
            key={room.id}
            className="flex bg-gray-200 rounded-lg mx-4 mb-1 py-4 text-gray-800 cursor-pointer hover:text-black"
          >
            <h1 className="text-sm">{room.name}</h1>
            <h1 className="text-sm">{room.buildingName}</h1>
            <h1 className="text-sm">{room.floor}</h1>
            <h1 className="text-sm">{room.capacityMax}</h1>
{room.roomFacilities.map((facility) =>(
  <div>
    <h2 className="text-sm">{facility.facilityName}</h2>
  </div>
))}
            <button className="px-6 py-2 rounded-lg bg-[#4A7654] text-center text-gray-200 text-sm">
              จอง
            </button>
          </div>
        ))}
      </div>
      </div>

    </>
  );
};

export default ResultRoomLists;
