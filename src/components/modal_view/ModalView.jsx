import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/system";

const ModalView = ({ isOpen = false, children, onClose, isDeleteModal }) => {
  const isMobileView = useMediaQuery("(max-width:600px)");

  if (!isMobileView) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <div className="m-auto mt-5 max-w-[520px] rounded-2xl bg-white p-2">
          {children}
        </div>
      </Modal>
    );
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex bg-[#000000ba]">
      <div className="mt-0 w-full lg:mt-auto lg:h-full">{children}</div>
    </div>
  );
};

export default ModalView;
