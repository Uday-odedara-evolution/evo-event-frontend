import { ForwardIcon, LoaderIcon, PreviousIcon } from "@/assets/svg";
import { EventCard } from "@/components";
import { useEffect, useState } from "react";

const CardView = ({
  handleClickDelete,
  handleClickUpdate,
  data,
  currentPage,
  setCurrentPage,
  isLoading,
}) => {
  const [pages, setPages] = useState([]);
  const totalPages = Math.ceil(data?.totalCount / 10);

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

  if (isLoading) {
    return (
      <div className="m-auto flex h-[100px] w-[100px]">
        <LoaderIcon />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:flex-wrap">
        {data?.totalCount > 0 &&
          data?.list.map(item => (
            <EventCard
              key={`card-item-${item.id}`}
              handleClickDelete={handleClickDelete}
              handleClickUpdate={handleClickUpdate}
              item={item}
            />
          ))}
      </div>
      <div className="mt-auto flex items-center justify-between pt-2">
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
              className="btn-hover-2 flex h-[40px] w-[40px] items-center justify-center rounded-[8px] font-sans text-[14px] font-medium text-[#667085]"
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
          className="btn-hover-1 flex items-center gap-2 rounded-[8px] border-[1px] border-[#EAEAEA] px-2 py-1"
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
  );
};

export default CardView;
