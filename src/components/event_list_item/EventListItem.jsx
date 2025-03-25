import { DeleteIcon, UpdateIcon } from "@/assets/svg";

const EventListItem = ({ setIsAddModalOpen, setIsDeleteModalOpen }) => {
  return (
    <div
      className=" grid py-2 items-center"
      style={{ gridTemplateColumns: "200px 200px minmax(400px, 1fr)" }}
    >
      <div className="flex gap-2 items-center">
        <span className="h-[56px] w-[56px]">img</span>
        <span className="text-[16px font-medium font-sans]">title</span>
      </div>
      <div>
        <span className="text-[16px] text-[#06060680] font-sans">
          5, December 2024
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-[16px] text-[#06060680] font-sans">
          5, December 2024
        </span>
        <button className="ms-auto" onClick={() => setIsDeleteModalOpen(true)}>
          <DeleteIcon />
        </button>
        <button className="ms-1" onClick={() => setIsAddModalOpen(true)}>
          <UpdateIcon />
        </button>
      </div>
    </div>
  );
};

export default EventListItem;
