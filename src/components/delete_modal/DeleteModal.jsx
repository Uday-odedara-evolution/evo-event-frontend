import { GirlThinkingIcon } from "@/assets/svg";
import { ModalView } from "..";
import APICall from "@/utils/ApiCall";

const DeleteModal = ({
  isOpen = false,
  onClose = () => {},
  itemId = null,
  onDelete = () => {},
}) => {
  if (!isOpen) {
    return null;
  }

  const handleDelete = () => {
    APICall.delete(`/event/${itemId}`).then(() => {
      onClose();
      onDelete();
    });
  };

  return (
    <ModalView isOpen={isOpen} onClose={onClose} isDeleteModal>
      <div className="p-3 flex flex-col gap-2 mt-[inherit] w-[inherit] bg-white max-w-[inherit]">
        <div className="flex justify-between items-center">
          <span className="font-sans font-medium text-[20px]">Delete ?</span>
          <button
            onClick={onClose}
            className="border-[1px] rounded-[8px] px-2 border-[#06060680] py-0 cursor-pointer"
          >
            x
          </button>
        </div>
        <div>
          <span className="text-[20px] font-medium font-sans text-[#06060680]">
            Are you sure you want to delete this event ?
          </span>
        </div>
        <div className="flex border-b-2">
          <span className="m-auto">
            <GirlThinkingIcon />
          </span>
        </div>
        <div className="mb-2">
          <div className="h-full flex justify-between items-end gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-[#EAEAEA] font-medium cursor-pointer text-[#06060680] rounded-[8px]  text-[20px] py-1"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 gradient-bg text-white text-[20px] rounded-[8px] py-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </ModalView>
  );
};

export default DeleteModal;
