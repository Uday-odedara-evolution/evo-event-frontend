import { ForwardIcon, PreviousIcon } from "@/assets/svg";
import { EventListItem } from "@/components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

const ListView = ({
  handleClickUpdate,
  handleClickDelete,
  data,
  currentPage,
  setCurrentPage,
}) => {
  const [pages, setPages] = useState([]);
  const isMobileView = useMediaQuery("(max-width:600px)");
  console.log("isMobileView", isMobileView);
  console.log("currentPage", currentPage);
  const totalPages = Math.ceil(data?.totalCount / 10);

  const columnWidth = isMobileView
    ? "200px 200px minmax(400px, 1fr)"
    : "400px 300px minmax(200px, 1fr)";

  useEffect(() => {
    console.log("totalPages", totalPages);

    const arr = [];

    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPages(arr);
    console.log("arr", arr);
  }, [data]);

  const handlePageChange = (type) => {
    if (type === "back") {
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    } else {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    }
  };

  return (
    <div className="h-full bg-white rounded-2xl flex flex-col overflow-auto p-2">
      <div className="">
        <div className=" grid" style={{ gridTemplateColumns: columnWidth }}>
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
        {data?.totalCount > 0 &&
          data?.list.map((item) => {
            return (
              <EventListItem
                key={`list-item-${item.id}`}
                handleClickDelete={handleClickDelete}
                item={item}
                handleClickUpdate={handleClickUpdate}
                columnWidth={columnWidth}
              />
            );
          })}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => handlePageChange("prev")}
          className="flex items-center border-[1px] border-[#06060680] px-2 py-1 rounded-[8px] gap-2"
        >
          <span>
            <PreviousIcon />
          </span>
          <span className="text-[#06060680] text-[16px] hidden lg:block">
            Previous
          </span>
        </button>
        <div className="flex gap-1">
          {pages.map((page) => (
            <button
              key={`page-${page}`}
              style={{
                backgroundColor: currentPage === page ? "#FD5900" : "unset",
                color: currentPage === page ? "white" : "#667085",
              }}
              className="text-[#667085] h-[40px] w-[40px] flex justify-center items-center text-[14px] font-medium font-sans rounded-[8px] cursor-pointer"
            >
              {page}
            </button>
          ))}
        </div>
        <div
          onClick={() => handlePageChange("next")}
          className="flex items-center border-[1px] border-[#06060680] px-2 py-1 rounded-[8px] gap-2"
        >
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
