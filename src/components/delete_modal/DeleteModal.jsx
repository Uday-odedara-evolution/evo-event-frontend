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
      <div className="mt-[inherit] flex w-[inherit] max-w-[inherit] flex-col gap-2 bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[20px] font-medium">Delete ?</span>
          <button
            onClick={onClose}
            className="btn-hover-1 cursor-pointer rounded-[8px] border-[1px] border-[#EAEAEA] px-2 py-0"
          >
            x
          </button>
        </div>
        <div>
          <span className="font-sans text-[20px] font-medium text-[#06060680]">
            Are you sure you want to delete this event ?
          </span>
        </div>
        <div className="flex border-b-2">
          <span className="m-auto">
            <GirlThinkingIcon />
          </span>
        </div>
        <div className="mb-2">
          <div className="flex h-full items-end justify-between gap-2">
            <button
              onClick={onClose}
              className="btn-hover-1 flex-1 cursor-pointer rounded-[8px] bg-[#EAEAEA] py-1 text-[20px] font-medium text-[#06060680]"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="gradient-bg btn-hover-2 flex-1 rounded-[8px] py-1 text-[20px] text-white"
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
