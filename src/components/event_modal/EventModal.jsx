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
import { useEffect, useRef, useState } from "react";
import { Popper } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";

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
    formState: { errors },
  } = useForm();
  console.log("errors", errors);

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventCategory, setEventCategory] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "category-pop" : undefined;

  // const fileUrl = file ? URL.createObjectURL(file) : null;

  useEffect(() => {
    if (!isOpen) {
      setEventName("");
      setEventCategory(1);
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

      // setEventName(updatingItem.name);
      setEventCategory(updatingItem.event_category_id);
      // setEventDate(formattedDate);
      setFileURL(`http://localhost:3000/uploads/${updatingItem.image_url}`);
      setValue("name", updatingItem.name);
      setValue("date", formattedDate);
      setValue("event_category", catName);
    } else {
      setEventName("");
      setEventCategory(1);
      setEventDate("");
      setFileURL(null);
    }
  }, [updatingItem]);

  const fileRef = useRef();
  if (!isOpen) {
    return null;
  }

  const handleUploadFile = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    console.log("file", file);
    const fileUrl = URL.createObjectURL(file);

    setFile(file);
    setFileURL(fileUrl);
  };

  const handleUpdate = (data) => {
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

  const handleSave = (data) => {
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
  };

  const checkError = (field) => {
    const isAvailable = errors.hasOwnProperty(field);
    console.log("isAvailable", isAvailable);

    return !!isAvailable;
  };

  const handleRemoveImage = () => {
    setFile(null);
    setFileURL(null);
  };

  const handleChangeType = (type) => {
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

  return (
    <ModalView isOpen={isOpen} onClose={onClose}>
      <div className="p-3 flex flex-col gap-2 bg-white mt-0 h-full">
        <div className="flex justify-between items-center">
          <span className="font-sans font-medium text-[20px]">New Event</span>
          <button
            onClick={onClose}
            className="border-[1px] rounded-[8px] px-2 border-[#EAEAEA] py-0 cursor-pointer btn-hover-1"
          >
            x
          </button>
        </div>
        <div className="relative">
          {fileURL ? (
            <div className="relative">
              <img
                className="rounded-xl h-[240px] w-full object-fill z-0 relative"
                src={fileURL}
                alt=""
              />
              <button
                className="absolute top-0 right-0 p-2 bg-red-800 m-2 rounded-2xl"
                onClick={handleRemoveImage}
              >
                <CrossIcon stroke="#fff" strokeOpacity={1} />
              </button>
              <div className="mt-2 ">
                <button
                  onClick={handleUploadFile}
                  className="flex-1 w-full bg-[#EAEAEA] font-medium cursor-pointer text-[#06060680] rounded-[8px]  text-[20px] py-1"
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={handleUploadFile}
                style={{ pointerEvents: "none" }}
                className="h-[240px] w-full max-w-[528px] cursor-pointer relative z-0 dashed-border"
              >
                <span>
                  <UploadImageIcon />
                </span>
                <span className="text-[#06060680] text-[20px] font-sans lg:hidden">
                  Click to upload !
                </span>
                <span className="text-[#06060680] text-[20px] font-sans hidden lg:block">
                  Drop an image here or click to upload !
                </span>
              </button>
              <input
                className="opacity-0  absolute top-0 bottom-0 right-0 left-0 z-10 cursor-pointer"
                type="file"
                name=""
                onChange={handleFileChange}
                ref={fileRef}
                id="file-input"
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          )}
        </div>
        <div>
          <div className="text-[#06060680] text-[16px]">Event Name</div>
          <div className="mt-1">
            <input
              className="bg-white border-1 w-full px-[16px] py-[8px] rounded-[12px] outline-0"
              type="text"
              placeholder="Ex. Fluffy’s Stand up"
              style={{ borderColor: checkError("name") ? "red" : "#06060620" }}
              // value={eventName}
              // onChange={(e) => setEventName(e.target.value)}
              {...register("name", { required: true })}
            />
          </div>
        </div>
        <div onBlur={() => handleChangeType("text")}>
          <div className="text-[#06060680] text-[16px]">Event Date</div>
          <div className="mt-1 relative">
            <input
              className="bg-white border-1 w-full px-[16px] py-[8px] rounded-[12px] outline-0"
              // type="date"
              // value={eventDate}
              // onChange={(e) => setEventDate(e.target.value)}
              id="date-selector"
              type="text"
              onFocus={() => handleChangeType("date")}
              onClick={() => handleChangeType("date")}
              onBlur={() => handleChangeType("text")}
              {...register("date", { required: true })}
              placeholder="Select a date"
              style={{ borderColor: checkError("date") ? "red" : "#06060620" }}
            />
            <button className="absolute z-0 top-0 right-0 bottom-0 flex items-center pe-2 cursor-pointer">
              <CalendarIcon />
            </button>
          </div>
        </div>
        <div>
          <div className="text-[#06060680] text-[16px]">Event Category</div>
          <div className="mt-1 relative " onClick={handleClick}>
            <input
              className="bg-white border-1 w-full px-[16px] py-[8px] rounded-[12px] outline-0 pointer-events-none cursor-pointer"
              type="text"
              placeholder="Select a option..."
              {...register("event_category", { required: true })}
              style={{
                borderColor: open
                  ? "#FD5900"
                  : checkError("event_category")
                  ? "red"
                  : "#06060620",
              }}
            />
            <button className="absolute top-0 right-0 bottom-0 flex items-center pe-2 cursor-pointer">
              <DownArrowIcon />
            </button>
          </div>
        </div>
        <div className="h-full mt-auto">
          <div className="h-full flex justify-between items-end gap-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-[8px] text-[20px] py-1 secondary-button"
            >
              Cancel
            </button>
            {updatingItem ? (
              <button
                onClick={handleSubmit(handleUpdate)}
                className="flex-1 gradient-bg text-white text-[20px] rounded-[8px] py-1 btn-hover-2"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleSubmit(handleSave)}
                className="flex-1 gradient-bg text-white text-[20px] rounded-[8px] py-1 btn-hover-2"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} sx={{ width: "100%" }}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div className="w-full p-3 rounded-xl">
            <div className="flex border-1 border-[rgba(0,0,0,0.15)] flex-col p-[8px] gap-2 rounded-xl">
              {Object.entries(EventNames).map(([key, value]) => {
                const isActive = key === eventCategory;
                return (
                  <div
                    key={`event-option-${key}`}
                    className="text-[16px] p-[6px] cursor-pointer rounded-lg"
                    style={{
                      backgroundColor: isActive ? "#FFF1EA" : "white",
                      color: isActive ? "#FD5900" : "#06060680",
                    }}
                    onClick={() => handleSelectCategory(key, value)}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
    </ModalView>
  );
}
