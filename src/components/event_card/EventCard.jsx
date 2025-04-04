import { DeleteIcon, UpdateIcon } from "@/assets/svg";
import { EventNames } from "@/constants/constants";

const EventCard = ({ handleClickUpdate, handleClickDelete, item }) => {
  const formattedDate = item?.event_date ? item?.event_date.split("T")[0] : "";

  return (
    <div className="w-full flex-1 lg:w-auto">
      <div className="flex w-full flex-col gap-1 rounded-xl bg-white p-3 lg:max-w-[300px]">
        <div className="h-[200px] w-full max-w-full lg:w-[300px]">
          <img
            className="m-auto h-full w-full rounded-xl object-fill"
            src={`http://localhost:3000/uploads/${item?.image_url}`}
            alt=""
          />
        </div>
        <div className="flex items-center">
          <span className="font-sans text-[24px]">{item?.name}</span>
          <button
            onClick={() => handleClickDelete(item)}
            className="action-btn ms-auto cursor-pointer"
          >
            <DeleteIcon />
          </button>
          <button
            className="action-btn ms-1 cursor-pointer"
            onClick={() => handleClickUpdate(item)}
          >
            <UpdateIcon />
          </button>
        </div>
        <div className="flex items-center">
          <div className="me-2x flex items-center rounded-[8px] bg-[#FFF1EA] px-2 py-0">
            <span className="font-sans text-[12px] text-[#FD5900]">
              {EventNames[item?.event_category_id] || "-"}
            </span>
          </div>
          <span className="ms-2 font-sans text-[16px] text-[#06060680]">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
