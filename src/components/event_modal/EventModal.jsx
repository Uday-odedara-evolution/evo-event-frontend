import { CalendarIcon, DownArrowIcon, UploadImageIcon } from "@/assets/svg";
import { ModalView } from "@/components";

export default function EventModal({ isOpen = false, onClose = () => {} }) {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalView isOpen={isOpen} onClose={onClose}>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-sans font-medium text-[20px]">New Event</span>
          <button
            onClick={onClose}
            className="border-[1px] rounded-[8px] px-2 border-[#06060680] py-0 cursor-pointer"
          >
            x
          </button>
        </div>
        <div>
          <button className="h-[240px] w-full max-w-[528px] cursor-pointer">
            <UploadImageIcon />
          </button>
        </div>
        <div>
          <div className="text-[#06060680] text-[16px]">Event Name</div>
          <div className="mt-1">
            <input
              className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620]"
              type="text"
              placeholder="Ex. Fluffy’s Stand up"
            />
          </div>
        </div>
        <div>
          <div className="text-[#06060680] text-[16px]">Event Date</div>
          <div className="mt-1 relative">
            <input
              className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620]"
              type="text"
              placeholder="Select a date"
            />
            <button
              // onClick={handleShowPassword}
              className="absolute top-0 right-0 bottom-0 flex items-center pe-2 cursor-pointer"
            >
              <CalendarIcon />
            </button>
          </div>
        </div>
        <div>
          <div className="text-[#06060680] text-[16px]">Event Category</div>
          <div className="mt-1 relative">
            <input
              className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620]"
              type="text"
              placeholder="Select a option..."
            />
            <button
              // onClick={handleShowPassword}
              className="absolute top-0 right-0 bottom-0 flex items-center pe-2 cursor-pointer"
            >
              <DownArrowIcon />
            </button>
          </div>
        </div>
        <div className="h-full mt-auto">
          <div className="h-full flex justify-between items-end gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-[#EAEAEA] font-medium cursor-pointer text-[#06060680] rounded-[8px]  text-[20px] py-1"
            >
              Cancel
            </button>
            <button className="flex-1 gradient-bg text-white text-[20px] rounded-[8px] py-1">
              Save
            </button>
          </div>
        </div>
      </div>
    </ModalView>
  );
}
