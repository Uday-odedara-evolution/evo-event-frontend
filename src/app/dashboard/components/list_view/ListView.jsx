import { DownArrowLongIcon, ForwardIcon, PreviousIcon } from "@/assets/svg";
import { EventListItem } from "@/components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

const ListView = ({
  handleClickUpdate,
  handleClickDelete,
  data,
  currentPage,
  setCurrentPage,
  sortingFilters,
  onChangeSorting,
}) => {
  const [pages, setPages] = useState([]);
  const isMobileView = useMediaQuery("(max-width:600px)");
  const totalPages = Math.ceil(data?.totalCount / 10);

  console.log("sortingFilters", sortingFilters);
  const columnWidth = isMobileView
    ? "200px 200px minmax(400px, 1fr)"
    : "400px 300px minmax(200px, 1fr)";

  useEffect(() => {
    const arr = [];

    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [data]);

  const handlePageChange = (type) => {
    if (type === "back") {
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    } else {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    }
  };

  const handleSortChange = (field) => {
    console.log("field", field);
    onChangeSorting(field);
  };

  return (
    <div className="h-full bg-white rounded-2xl flex flex-col overflow-auto p-3">
      <div className="">
        <div className=" grid" style={{ gridTemplateColumns: columnWidth }}>
          <div className="border-b-[1px] border-b-[#EAEAEA]  pb-2 flex">
            <span className="text-[12px] font-sans font-medium">
              Event Name
            </span>
            <button
              className="ms-2 hover:border-1 btn-hover-1 px-1 rounded-xl"
              style={{
                transform:
                  sortingFilters.eventName === "desc"
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
              onClick={() => handleSortChange("name")}
            >
              <DownArrowLongIcon />
            </button>
          </div>
          <div className="border-b-[1px] border-b-[#EAEAEA]  pb-2 flex">
            <span className="text-[12px] font-sans font-medium">Date</span>
            <button
              className="ms-2 hover:border-1 btn-hover-1 px-1 rounded-xl"
              style={{
                transform:
                  sortingFilters.eventDate === "desc"
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
              onClick={() => handleSortChange("date")}
            >
              <DownArrowLongIcon />
            </button>
          </div>
          <span className="border-b-[1px] border-b-[#EAEAEA] text-[12px] font-sans font-medium pb-2">
            Event Type
          </span>
        </div>
      </div>
      <div className="h-full flex flex-col">
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
        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={() => handlePageChange("back")}
            style={{ pointerEvents: currentPage === 1 ? "none" : "all" }}
            className="flex items-center border-[1px] border-[#06060680] px-2 py-1 rounded-[8px] gap-2 btn-hover-1"
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
                  pointerEvents: currentPage === page ? "none" : "all",
                }}
                onClick={() => setCurrentPage(page)}
                className="text-[#667085] h-[40px] w-[40px] flex justify-center items-center text-[14px] font-medium font-sans rounded-[8px] btn-hover-1"
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange("next")}
            style={{
              pointerEvents: currentPage === pages.at(-1) ? "none" : "all",
            }}
            className="flex items-center border-[1px] border-[#06060680] px-2 py-1 rounded-[8px] gap-2 btn-hover-1"
          >
            <span className="text-[#06060680] text-[16px] hidden lg:block">
              Forward
            </span>
            <span>
              <ForwardIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListView;
