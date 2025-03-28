import { DeleteIcon, UpdateIcon } from "@/assets/svg";
import { EventNames } from "@/constants/constants";

const EventCard = ({ handleClickUpdate, handleClickDelete, item }) => {
  const formattedDate = item?.event_date ? item?.event_date.split("T")[0] : "";

  return (
    <div className="flex-1 w-full lg:w-auto">
      <div className="w-full lg:max-w-[300px] bg-white flex flex-col p-3 rounded-xl gap-1">
        <div className="max-w-full  w-full h-[200px] lg:w-[300px]">
          <img
            className="h-full w-full object-fill rounded-xl m-auto"
            src={`http://localhost:3000/uploads/${item?.image_url}`}
            alt=""
          />
        </div>
        <div className="flex items-center">
          <span className="text-[24px] font-sans">{item?.name}</span>
          <button
            onClick={() => handleClickDelete(item)}
            className="ms-auto cursor-pointer"
          >
            <DeleteIcon />
          </button>
          <button
            className="ms-1 cursor-pointer"
            onClick={() => handleClickUpdate(item)}
          >
            <UpdateIcon />
          </button>
        </div>
        <div className="flex items-center">
          <div className="bg-[#FFF1EA] rounded-[8px] px-2 py-0 me-2x flex items-center">
            <span className="text-[12px] font-sans text-[#FD5900]">
              {EventNames[item?.event_category_id] || "-"}
            </span>
          </div>
          <span className="text-[#06060680] text-[16px] ms-2 font-sans">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
