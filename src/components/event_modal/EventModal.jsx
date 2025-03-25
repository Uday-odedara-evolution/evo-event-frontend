import { CalendarIcon, DownArrowIcon, UploadImageIcon } from "@/assets/svg";
import { ModalView } from "@/components";
import { EventNames } from "@/constants/constants";
import APICall from "@/utils/ApiCall";
import { useEffect, useRef, useState } from "react";

export default function EventModal({
  isOpen = false,
  onClose = () => {},
  updatingItem = null,
}) {
  console.log("updatingItem", updatingItem);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  console.log("fileURL", fileURL);
  const [eventName, setEventName] = useState("");
  console.log("eventName", eventName);
  const [eventDate, setEventDate] = useState("");
  const [eventCategory, setEventCategory] = useState(1);

  console.log("eventCategory", eventCategory);
  // const fileUrl = file ? URL.createObjectURL(file) : null;

  useEffect(() => {
    if (updatingItem) {
      const formattedDate = updatingItem.event_date.split("T")[0];

      console.log("updatingItem", updatingItem);
      setEventName(updatingItem.name);
      setEventCategory(updatingItem.event_category_id);
      setEventDate(formattedDate);
      setFileURL(`http://localhost:3000/uploads/${updatingItem.image_url}`);
    } else {
      setEventName("");
      setEventCategory(1);
      setEventDate("");
      setFileURL(null);
    }
  }, [updatingItem]);

  console.log("file", file);
  const fileRef = useRef();
  if (!isOpen) {
    return null;
  }

  const handleUploadFile = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log("e", e);
    console.log("e", e.target.files);
    const [file] = e.target.files;
    const fileUrl = URL.createObjectURL(file);

    setFile(file);
    setFileURL(fileUrl);
  };

  const handleUpdate = () => {
    const payload = new FormData();

    payload.append("name", eventName);
    payload.append("id", updatingItem.id);
    if (file) {
      payload.append("file", file);
    }
    payload.append("categoryId", eventCategory);
    payload.append("creatorId", 1);
    payload.append("date", eventDate);

    APICall.put("/event", payload, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }).then(() => {
      onClose();
    });
  };

  const handleSave = () => {
    const payload = new FormData();

    payload.append("name", eventName);
    payload.append("file", file);
    payload.append("categoryId", eventCategory);
    console.log("eventCategory", eventCategory);
    payload.append("creatorId", 1);
    payload.append("date", eventDate);

    APICall.post("/event", payload, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    }).then(() => {
      onClose();
    });
  };

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
        <div className="relative">
          {fileURL ? (
            <div>
              <img
                className="rounded-xl lg:h-[200px] w-full object-fill"
                src={fileURL}
                alt=""
              />
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
            <button
              onClick={handleUploadFile}
              className="h-[240px] w-full max-w-[528px] cursor-pointer"
            >
              <UploadImageIcon />
            </button>
          )}
          <input
            className="hidden"
            type="file"
            name=""
            onChange={handleFileChange}
            ref={fileRef}
            id="file-input"
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        <div>
          <div className="text-[#06060680] text-[16px]">Event Name</div>
          <div className="mt-1">
            <input
              className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620] outline-0"
              type="text"
              placeholder="Ex. Fluffy’s Stand up"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="text-[#06060680] text-[16px]">Event Date</div>
          <div className="mt-1 relative">
            <input
              className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620] outline-0"
              type="date"
              value={eventDate}
              placeholder="Select a date"
              onChange={(e) => setEventDate(e.target.value)}
            />
            <button className="absolute z-0 top-0 right-0 bottom-0 flex items-center pe-2 cursor-pointer">
              <CalendarIcon />
            </button>
          </div>
        </div>
        <div>
          <div className="text-[#06060680] text-[16px]">Event Category</div>
          <div className="mt-1 relative">
            {/* <input
              className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620] outline-0"
              type="text"
              placeholder="Select a option..."
            /> */}
            <button
              // onClick={handleShowPassword}
              className="absolute top-0 right-0 bottom-0 flex items-center pe-2 cursor-pointer"
            >
              <DownArrowIcon />
            </button>
            <select
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              defaultValue={1}
              className="bg-white border-2 w-full px-[16px] py-[8px] rounded-[12px] border-[#06060620] outline-0"
            >
              {Object.entries(EventNames).map(([key, value]) => {
                return (
                  <option key={`event-option-${key}`} value={key}>
                    {value}
                  </option>
                );
              })}
            </select>
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
            {updatingItem ? (
              <button
                onClick={handleUpdate}
                className="flex-1 gradient-bg text-white text-[20px] rounded-[8px] py-1"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex-1 gradient-bg text-white text-[20px] rounded-[8px] py-1"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </ModalView>
  );
}
