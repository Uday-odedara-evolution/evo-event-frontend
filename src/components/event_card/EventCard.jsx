import { DeleteIcon, UpdateIcon } from "@/assets/svg";

const EventCard = ({ setIsDeleteModalOpen, setIsAddModalOpen }) => {
  return (
    <div className=" w-full bg-white flex flex-col p-2 rounded-xl gap-1">
      <div>image</div>
      <div className="flex items-center">
        <span className="text-[24px] font-sans">One direction concert</span>
        <button onClick={() => setIsDeleteModalOpen(true)} className="ms-auto">
          <DeleteIcon />
        </button>
        <button className="ms-1" onClick={() => setIsAddModalOpen(true)}>
          <UpdateIcon />
        </button>
      </div>
      <div className="flex items-center">
        <div className="bg-[#FFF1EA] rounded-[8px] px-2 py-0 me-2x">
          <span className="text-[12px] font-sans text-[#FD5900]">
            Singing Concert
          </span>
        </div>
        <span className="text-[#06060680] text-[16px] font-sans">
          5, December 2024
        </span>
      </div>
    </div>
  );
};

export default EventCard;
