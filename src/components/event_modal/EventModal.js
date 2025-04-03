import {
  CalendarIcon,
  CrossIcon,
  DownArrowIcon,
  UploadImageIcon,
} from "@/assets/svg";
import { ModalView } from "@/components";
import { EventNames } from "@/constants/constants";
import APICall from "@/utils/ApiCall";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Popper } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ImageCropModal from "../image_crop_modal/ImageCropModal";

export default function EventModal({
  isOpen = false,
  onClose = () => {},
  updatingItem = null,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  console.log("errors", errors);

  const [file, setFile] = useState(null);
  console.log("file", file);
  const [fileURL, setFileURL] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventCategory, setEventCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    const el = document.getElementById("cat-select-input");
    console.log("el", el);
    if (el) {
      // event.preventDefault();
      el.focus();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "category-pop" : undefined;

  // const fileUrl = file ? URL.createObjectURL(file) : null;

  useEffect(() => {
    if (!isOpen) {
      setEventName("");
      setEventCategory(null);
      setEventDate("");
      setFileURL(null);
      reset();
    }
  }, [isOpen]);
  console.log("updatingItem", updatingItem);

  useEffect(() => {
    if (updatingItem) {
      const formattedDate = updatingItem.event_date.split("T")[0];
      const catName = EventNames[updatingItem.event_category_id];

      setEventCategory(updatingItem.event_category_id);
      setFileURL(`http://localhost:3000/uploads/${updatingItem.image_url}`);
      setValue("name", updatingItem.name);
      setValue("date", formattedDate);
      setValue("event_category", catName);
    } else {
      setEventName("");
      setEventCategory(null);
      setEventDate("");
      setFileURL(null);
    }
  }, [updatingItem]);

  if (!isOpen) {
    return null;
  }

  const handleUploadFile = () => {
    const fileEl = document.getElementById("file-input");
    if (fileEl) {
      fileEl.click();
    }
  };

  const handleFileChange = e => {
    const [file] = e.target.files;

    setFile(file);
    setIsCropModalOpen(true);
  };

  const handleUpdate = data => {
    const payload = new FormData();
    const userDataString = localStorage.getItem("userdata");
    const userData = JSON.parse(userDataString);

    payload.append("name", data.name);
    payload.append("date", data.date);

    payload.append("id", updatingItem.id);
    if (file) {
      payload.append("file", file);
    }
    payload.append("categoryId", eventCategory);
    payload.append("creatorId", userData.data.userId);

    APICall.put("/event", payload, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }).then(() => {
      onClose();
    });
  };

  const handleSave = data => {
    const userDataString = localStorage.getItem("userdata");
    const userData = JSON.parse(userDataString);
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("date", data.date);

    payload.append("file", file);
    payload.append("categoryId", eventCategory);
    payload.append("creatorId", userData.data.userId);

    APICall.post("/event", payload, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }).then(() => {
      onClose();
    });
  };

  const handleSelectCategory = (catId, catName) => {
    console.log("catId", catId);
    setEventCategory(catId);
    setValue("event_category", catName);
    clearErrors("event_category");
    setAnchorEl(null);
  };

  const checkError = field => {
    const isAvailable = errors.hasOwnProperty(field);
    console.log("isAvailable", field, isAvailable);

    return !!isAvailable;
  };

  const handleRemoveImage = () => {
    setFile(null);
    setFileURL(null);
  };

  const handleChangeType = type => {
    const el = document.getElementById("date-selector");

    if (type === "text") {
      el.type = "text";
    }
    if (type === "date") {
      el.type = "date";
      try {
        el.showPicker();
      } catch (error) {
        console.log("show date picker error", error);
      }
    }
  };

  const handleCroppedImage = croppedImgFile => {
    setFile(croppedImgFile);
    setFileURL(URL.createObjectURL(croppedImgFile));
    setIsCropModalOpen(false);
  };

  return (
    <>
      <ModalView isOpen={isOpen} onClose={onClose}>
        <div className="mt-0 flex h-full flex-col gap-2 bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[20px] font-medium">New Event</span>
            <button
              onClick={onClose}
              className="btn-hover-1 cursor-pointer rounded-[8px] border-[1px] border-[#EAEAEA] px-2 py-0"
            >
              x
            </button>
          </div>
          <div className="relative">
            {fileURL ? (
              <div className="relative">
                <img
                  className="relative z-0 h-[240px] w-full rounded-xl object-fill"
                  src={fileURL}
                  alt=""
                />
                <button
                  className="absolute top-0 right-0 m-2 rounded-2xl bg-red-800 p-2"
                  onClick={handleRemoveImage}
                >
                  <CrossIcon stroke="#fff" strokeOpacity={1} />
                </button>
                <div className="mt-2">
                  <button
                    onClick={handleUploadFile}
                    className="w-full flex-1 cursor-pointer rounded-[8px] bg-[#EAEAEA] py-1 text-[20px] font-medium text-[#06060680]"
                  >
                    Change Image
                  </button>
                  <input
                    className="hidden"
                    type="file"
                    name=""
                    onChange={handleFileChange}
                    id="file-input"
                    accept="image/png, image/gif, image/jpeg"
                  />
                </div>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={handleUploadFile}
                  style={{ pointerEvents: "none" }}
                  className="dashed-border relative z-0 h-[240px] w-full max-w-[528px] cursor-pointer"
                >
                  <span>
                    <UploadImageIcon />
                  </span>
                  <span className="font-sans text-[20px] text-[#06060680] lg:hidden">
                    Click to upload !
                  </span>
                  <span className="hidden font-sans text-[20px] text-[#06060680] lg:block">
                    Drop an image here or click to upload !
                  </span>
                </button>
                <input
                  className="absolute top-0 right-0 bottom-0 left-0 z-10 cursor-pointer opacity-0"
                  type="file"
                  name=""
                  onChange={handleFileChange}
                  id="file-input"
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
            )}
          </div>
          <div>
            <div className="text-[16px] text-[#06060680]">Event Name</div>
            <div className="mt-1">
              <input
                className="w-full rounded-[12px] border-1 bg-white px-[16px] py-[8px] outline-0"
                type="text"
                placeholder="Ex. Fluffy’s Stand up"
                style={{
                  borderColor: checkError("name") ? "red" : "#06060620",
                }}
                // value={eventName}
                // onChange={(e) => setEventName(e.target.value)}
                {...register("name", { required: "Please add event name" })}
              />
            </div>
            {checkError("name") && (
              <div className="font-sans text-[12px] text-[#FF000080] lg:text-[12px]">
                {errors?.name?.message}
              </div>
            )}
          </div>
          <div onBlur={() => handleChangeType("text")}>
            <div className="text-[16px] text-[#06060680]">Event Date</div>
            <div className="relative mt-1">
              <input
                className="w-full rounded-[12px] border-1 bg-white px-[16px] py-[8px] outline-0"
                id="date-selector"
                type="text"
                onFocus={() => handleChangeType("date")}
                onClick={() => handleChangeType("date")}
                onBlur={() => handleChangeType("text")}
                {...register("date", { required: "Please add event date" })}
                placeholder="Select a date"
                style={{
                  borderColor: checkError("date") ? "red" : "#06060620",
                }}
              />
              <button className="icon-container absolute top-0 right-0 bottom-0 z-0 flex cursor-pointer items-center pe-2">
                <CalendarIcon />
              </button>
            </div>
            {checkError("date") && (
              <div className="font-sans text-[12px] text-[#FF000080] lg:text-[12px]">
                {errors?.date?.message}
              </div>
            )}
          </div>
          <div>
            <div className="text-[16px] text-[#06060680]">Event Category</div>
            <div className="relative mt-1" onClick={handleClick}>
              <input
                className="category-selection pointer-events-none w-full cursor-pointer rounded-[12px] border-1 bg-white px-[16px] py-[8px] outline-0"
                type="text"
                id="cat-select-input"
                value={EventNames[eventCategory] || ""}
                placeholder="Select a option..."
                {...register("event_category", {
                  required: "Please select category of event",
                })}
                style={{
                  borderColor: open
                    ? "#FD5900"
                    : checkError("event_category")
                      ? "red"
                      : "#06060620",
                }}
              />
              <button className="cat-select-icon-container absolute top-0 right-0 bottom-0 flex cursor-pointer items-center pe-2">
                <DownArrowIcon />
              </button>
            </div>
            {checkError("event_category") && (
              <div className="font-sans text-[12px] text-[#FF000080] lg:text-[12px]">
                {errors?.event_category?.message}
              </div>
            )}
          </div>
          <div className="mt-auto h-full">
            <div className="flex h-full items-end justify-between gap-2">
              <button
                onClick={onClose}
                className="secondary-button flex-1 rounded-[8px] py-1 text-[20px]"
              >
                Cancel
              </button>
              {updatingItem ? (
                <button
                  onClick={handleSubmit(handleUpdate)}
                  className="gradient-bg btn-hover-2 flex-1 rounded-[8px] py-1 text-[20px] text-white"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleSubmit(handleSave)}
                  className="gradient-bg btn-hover-2 flex-1 rounded-[8px] py-1 text-[20px] text-white"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
        <Popper id={id} open={open} anchorEl={anchorEl} sx={{ width: "100%" }}>
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <div className="w-full rounded-xl p-3">
              <div className="flex flex-col gap-2 rounded-xl border-1 border-[rgba(0,0,0,0.15)] p-[8px]">
                {Object.entries(EventNames).map(([key, value]) => {
                  const isActive = key === eventCategory;
                  return (
                    <button
                      key={`event-option-${key}`}
                      className="cursor-pointer rounded-lg p-[6px] text-[16px]"
                      style={{
                        backgroundColor: isActive ? "#FFF1EA" : "white",
                        color: isActive ? "#FD5900" : "#06060680",
                      }}
                      onClick={() => handleSelectCategory(key, value)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          </ClickAwayListener>
        </Popper>
      </ModalView>

      <ImageCropModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        file={file && URL.createObjectURL(file)}
        onFileCrop={handleCroppedImage}
      />
    </>
  );
}
