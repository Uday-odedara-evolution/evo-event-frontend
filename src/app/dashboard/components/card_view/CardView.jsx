import { ForwardIcon, PreviousIcon } from "@/assets/svg";
import { EventCard } from "@/components";

const CardView = ({ setIsDeleteModalOpen, setIsAddModalOpen }) => {
  return (
    <>
      <div className=" h-full">
        <EventCard
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span>
            <PreviousIcon />
          </span>
        </div>
        <div className="flex gap-1">
          <button className="bg-[#FD5900] text-white h-[40px] w-[40px] flex justify-center items-center text-[14px] font-medium font-sans rounded-[8px] cursor-pointer">
            1
          </button>
          <button className="text-[#667085] h-[40px] w-[40px] flex justify-center items-center text-[14px] font-medium font-sans rounded-[8px] cursor-pointer">
            2
          </button>
          <button className="text-[#667085] h-[40px] w-[40px] flex justify-center items-center text-[14px] font-medium font-sans rounded-[8px] cursor-pointer">
            3
          </button>
        </div>
        <div>
          <span>
            <ForwardIcon />
          </span>
        </div>
      </div>
    </>
  );
};

export default CardView;
