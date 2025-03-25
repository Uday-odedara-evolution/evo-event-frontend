import { DeleteIcon, UpdateIcon } from "@/assets/svg";
import { EventNames } from "@/constants/constants";

const EventCard = ({ handleClickUpdate, handleClickDelete, item }) => {
  const formattedDate = item?.event_date ? item?.event_date.split("T")[0] : "";

  return (
    <div className="w-full lg:w-[30%] bg-white flex flex-col p-3 rounded-xl gap-1 m-auto">
      <div className="max-w-full">
        <img
          className="h-full w-full rounded-xl"
          src={`http://localhost:3000/uploads/${item?.image_url}`}
          alt=""
        />
      </div>
      <div className="flex items-center">
        <span className="text-[24px] font-sans">{item?.name}</span>
        <button onClick={() => handleClickDelete(item)} className="ms-auto">
          <DeleteIcon />
        </button>
        <button className="ms-1" onClick={() => handleClickUpdate(item)}>
          <UpdateIcon />
        </button>
      </div>
      <div className="flex items-center">
        <div className="bg-[#FFF1EA] rounded-[8px] px-2 py-0 me-2x flex items-center">
          <span className="text-[12px] font-sans text-[#FD5900]">
            {EventNames[item?.event_category_id] || "-"}
          </span>
        </div>
        <span className="text-[#06060680] text-[16px] font-sans">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
