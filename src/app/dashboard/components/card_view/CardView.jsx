import { ForwardIcon, PreviousIcon } from "@/assets/svg";
import { EventCard } from "@/components";
import { useEffect, useState } from "react";

const CardView = ({
  handleClickDelete,
  handleClickUpdate,
  data,
  currentPage,
  setCurrentPage,
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

  const handlePageChange = (type) => {
    if (type === "back") {
      setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    } else {
      setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    }
  };

  return (
    <>
      <div className=" h-full flex flex-col">
        <div className="w-full flex flex-col lg:flex-row lg:flex-wrap items-center gap-4">
          {data?.totalCount > 0 &&
            data?.list.map((item) => (
              <EventCard
                key={`card-item-${item.id}`}
                handleClickDelete={handleClickDelete}
                handleClickUpdate={handleClickUpdate}
                item={item}
              />
            ))}
        </div>
        <div className="flex justify-between items-center mt-auto pt-2">
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
                className="text-[#667085] h-[40px] w-[40px] flex justify-center items-center text-[14px] font-medium font-sans rounded-[8px] btn-hover-2"
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
    </>
  );
};

export default CardView;
