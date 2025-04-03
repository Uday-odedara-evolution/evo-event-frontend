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
      className="grid items-center py-2"
      style={{ gridTemplateColumns: columnWidth }}
    >
      <div className="flex items-center gap-2">
        <span className="h-[56px] w-[56px]">
          <img
            className="h-full w-full rounded-xl"
            src={`http://localhost:3000/uploads/${item?.image_url}`}
            alt=""
          />
        </span>
        <span className="text-[16px font-sans] font-medium">{item?.name}</span>
      </div>
      <div>
        <span className="font-sans text-[16px] text-[#06060680]">
          {formattedDate}
        </span>
      </div>
      <div className="flex items-center pe-2">
        <span className="font-sans text-[16px] text-[#06060680]">
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
