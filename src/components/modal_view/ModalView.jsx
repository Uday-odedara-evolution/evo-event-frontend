import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/system";

const ModalView = ({ isOpen = false, children, onClose }) => {
  const isMobileView = useMediaQuery("(max-width:600px)");
  console.log("isMobileView", isMobileView);

  if (!isMobileView) {
    return (
      <Modal open={isOpen} onClose={onClose}>
        <div className="w-[40vw] bg-white m-auto mt-5 rounded-2xl p-2 max-w-[520px]">
          {children}
        </div>
      </Modal>
    );
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-white h-full">
      {children}
    </div>
  );
};

export default ModalView;
