import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/system";

const ModalView = ({ isOpen = false, children, onClose, isDeleteModal }) => {
  const isMobileView = useMediaQuery("(max-width:600px)");

  if (!isMobileView) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <div className=" bg-white m-auto mt-5 rounded-2xl p-2 max-w-[520px]">
          {children}
        </div>
      </Modal>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex bg-[#000000ba]">
      <div className=" w-full  mt-0 lg:mt-auto lg:h-full">{children}</div>
    </div>
  );
};

export default ModalView;
