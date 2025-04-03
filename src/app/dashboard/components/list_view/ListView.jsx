import {
  DownArrowLongIcon,
  ForwardIcon,
  LoaderIcon,
  PreviousIcon,
} from "@/assets/svg";
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
  isLoading = true,
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

  const handlePageChange = type => {
    if (type === "back") {
      setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    } else {
      setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    }
  };

  const handleSortChange = field => {
    console.log("field", field);
    onChangeSorting(field);
  };

  return (
    <div className="flex h-full flex-col overflow-auto rounded-2xl bg-white p-3">
      <div className="">
        <div className="grid" style={{ gridTemplateColumns: columnWidth }}>
          <div className="flex border-b-[1px] border-b-[#EAEAEA] pb-2">
            <span className="font-sans text-[12px] font-medium">
              Event Name
            </span>
            <button
              className="btn-hover-1 ms-2 rounded-xl px-1 hover:border-1"
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
          <div className="flex border-b-[1px] border-b-[#EAEAEA] pb-2">
            <span className="font-sans text-[12px] font-medium">Date</span>
            <button
              className="btn-hover-1 ms-2 rounded-xl px-1 hover:border-1"
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
          <span className="border-b-[1px] border-b-[#EAEAEA] pb-2 font-sans text-[12px] font-medium">
            Event Type
          </span>
        </div>
      </div>
      {isLoading ? (
        <div>
          <LoaderIcon />
        </div>
      ) : (
        <div className="flex h-full flex-col">
          {data?.totalCount > 0 &&
            data?.list.map(item => {
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
          <div className="mt-auto flex items-center justify-between">
            <button
              onClick={() => handlePageChange("back")}
              style={{ pointerEvents: currentPage === 1 ? "none" : "all" }}
              className="btn-hover-1 flex items-center gap-2 rounded-[8px] border-[1px] border-[#EAEAEA] px-2 py-1"
            >
              <span>
                <PreviousIcon />
              </span>
              <span className="hidden text-[16px] text-[#06060680] lg:block">
                Previous
              </span>
            </button>
            <div className="flex gap-1">
              {pages.map(page => (
                <button
                  key={`page-${page}`}
                  style={{
                    backgroundColor: currentPage === page ? "#FD5900" : "unset",
                    color: currentPage === page ? "white" : "#667085",
                    pointerEvents: currentPage === page ? "none" : "all",
                  }}
                  onClick={() => setCurrentPage(page)}
                  className="btn-hover-1 flex h-[40px] w-[40px] items-center justify-center rounded-[8px] font-sans text-[14px] font-medium text-[#667085]"
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
              className="btn-hover-1 flex items-center gap-2 rounded-[8px] border-[1px] border-[#06060680] px-2 py-1"
            >
              <span className="hidden text-[16px] text-[#06060680] lg:block">
                Forward
              </span>
              <span>
                <ForwardIcon />
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListView;
