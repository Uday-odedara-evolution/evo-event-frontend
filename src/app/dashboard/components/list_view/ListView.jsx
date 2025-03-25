import { ForwardIcon, PreviousIcon } from "@/assets/svg";
import { EventListItem } from "@/components";

const ListView = ({ setIsAddModalOpen, setIsDeleteModalOpen }) => {
  return (
    <div className="h-full bg-white rounded-2xl flex flex-col overflow-auto p-2">
      <div className="">
        <div
          className=" grid"
          style={{ gridTemplateColumns: "200px 200px minmax(400px, 1fr)" }}
        >
          <span className="border-b-[1px] border-b-[#EAEAEA] text-[12px] font-sans font-medium pb-2">
            Event Name
          </span>
          <span className="border-b-[1px] border-b-[#EAEAEA] text-[12px] font-sans font-medium pb-2">
            Date
          </span>
          <span className="border-b-[1px] border-b-[#EAEAEA] text-[12px] font-sans font-medium pb-2">
            Event Type
          </span>
        </div>
      </div>
      <div className="h-full">
        <EventListItem
          setIsAddModalOpen={setIsAddModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center border-[1px] border-[#06060680] px-2 py-1 rounded-[8px] gap-2">
          <span>
            <PreviousIcon />
          </span>
          <span className="text-[#06060680] text-[16px] hidden lg:block">
            Previous
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
        <div className="flex items-center border-[1px] border-[#06060680] px-2 py-1 rounded-[8px] gap-2">
          <span className="text-[#06060680] text-[16px] hidden lg:block">
            Forward
          </span>
          <span>
            <ForwardIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListView;
