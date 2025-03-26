import { DeleteIcon, UpdateIcon } from "@/assets/svg";
import { EventNames } from "@/constants/constants";

const EventListItem = ({
  handleClickUpdate,
  handleClickDelete,
  item,
  columnWidth,
}) => {
  const formattedDate = item?.event_date ? item?.event_date.split("T")[0] : "";

  return (
    <div
      className=" grid py-2 items-center"
      style={{ gridTemplateColumns: columnWidth }}
    >
      <div className="flex gap-2 items-center">
        <span className="h-[56px] w-[56px]">
          <img
            className="h-full w-full rounded-xl"
            src={`http://localhost:3000/uploads/${item?.image_url}`}
            alt=""
          />
        </span>
        <span className="text-[16px font-medium font-sans]">{item?.name}</span>
      </div>
      <div>
        <span className="text-[16px] text-[#06060680] font-sans">
          {formattedDate}
        </span>
      </div>
      <div className="flex items-center pe-2">
        <span className="text-[16px] text-[#06060680] font-sans">
          {EventNames[item?.event_category_id] || "-"}
        </span>
        <button
          className="ms-auto cursor-pointer"
          onClick={() => handleClickDelete(item)}
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
    </div>
  );
};

export default EventListItem;
