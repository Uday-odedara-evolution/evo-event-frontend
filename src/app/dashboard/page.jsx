"use client";
import {
  ArrowIcon,
  CardViewButtonIcon,
  CrossIcon,
  EvoEventIcon,
  FilterButtonIcon,
  LeafIcon,
  ListViewButtonIcon,
  NoRecordIcon,
  SearchIcon,
  UserIcon,
} from "@/assets/svg";
import { DeleteModal, EventModal } from "@/components";
import { useEffect, useState } from "react";
import CardView from "./components/card_view/CardView";
import ListView from "./components/list_view/ListView";
import APICall from "@/utils/ApiCall";

export default function Dashboard() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasRecord, setHasRecord] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCardView, setIsCardView] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    const params = {
      pageSize: 10,
      pageNumber: 1,
    };

    APICall.get("/event", { params })
      .then((res) => {
        console.log("res", res);
        setEventList(res.data);
        setHasRecord(res?.data?.totalCount > 0);
        // setTotalCount(res?.data?.totalCount);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleClickUpdate = (item) => {
    console.log("item", item);
    setUpdatingItem(item);
    setIsAddModalOpen(true);
  };

  const handleClickDelete = (item) => {
    console.log("item", item);
    setUpdatingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleAddModalClose = () => {
    getEvents();
    setUpdatingItem(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteItem = () => {
    setUpdatingItem(null);
    getEvents();
  };

  return (
    <div className="h-full">
      <div className=" bg-[#FFF1EA] h-[100%] p-3 lg:px-20 flex flex-col gap-2 w-[100vw]">
        {isSearching ? (
          <div className="bg-white p-2 px-4 flex gap-1 rounded-[16px] items-center shadow-md shadow-[#00000014]">
            <div>
              <ArrowIcon />
            </div>
            <div>
              <input
                type="text"
                className="outline-0 ms-2"
                placeholder="Search here.."
              />
            </div>
            <div className="ms-auto">
              <span>
                <CrossIcon />
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white p-2 flex gap-1 rounded-[16px] items-center shadow-md shadow-[#00000014]">
            <div className="h-[40px]">
              <EvoEventIcon />
            </div>
            <div className="ms-auto flex items-center justify-center rounded-md border-[1px] p-1 h-full border-[#EAEAEA]">
              <button className="flex h-[18px] w-[18px] max-h-[40px] max-w-[40px] cursor-pointer">
                <SearchIcon />
              </button>
              <div className="hidden lg:block">
                <input
                  type="text"
                  className="outline-0 ms-2"
                  placeholder="Search here.."
                />
              </div>
            </div>
            <div className="flex items-center justify-center rounded-md  p-1 bg-[#EAEAEA]">
              <div>
                <UserIcon />
              </div>
            </div>
          </div>
        )}
        {hasRecord ? (
          <>
            {eventList?.totalCount > 0 ? (
              <>
                <div className="h-full flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row lg:justify-between ">
                    <div className="mt-2">
                      <div className="font-medium text-[24px] text-[#060606] font-sans">
                        Events
                      </div>
                      <div className="font-normal text-[16px] text-[#06060680]">
                        View and manage every events of the future.
                      </div>
                    </div>
                    <div className="flex gap-2 justify-between mt-2 lg:mt-0 lg:items-center">
                      <div className="flex gap-2">
                        <span className="rounded-[8px] border-[1px] border-[#06060680] p-2">
                          <FilterButtonIcon />
                        </span>
                        <button
                          onClick={() => setIsCardView((prev) => !prev)}
                          className="rounded-[8px] border-[1px] border-[#06060680] p-2"
                        >
                          {isCardView ? (
                            <CardViewButtonIcon />
                          ) : (
                            <ListViewButtonIcon />
                          )}
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setUpdatingItem(null);
                            setIsAddModalOpen(true);
                          }}
                          className="gradient-bg px-6 font-sans py-2 text-[16px] text-white"
                        >
                          Add New Event
                        </button>
                      </div>
                    </div>
                  </div>
                  {isCardView ? (
                    <CardView
                      handleClickUpdate={handleClickUpdate}
                      handleClickDelete={handleClickDelete}
                      data={eventList}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  ) : (
                    <ListView
                      handleClickUpdate={handleClickUpdate}
                      handleClickDelete={handleClickDelete}
                      data={eventList}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 flex justify-center items-center gap-2 flex-col p-2">
                  <div>
                    <LeafIcon />
                  </div>
                  <div className="text-center">
                    <span className="text-[#06060680] text-[20px] text-center">
                      No Event’s to show yet ! add new event here...
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setUpdatingItem(null);
                        setIsAddModalOpen(true);
                      }}
                      className="gradient-bg px-6 font-sans py-2 text-[16px] text-white"
                    >
                      Add New Event
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center gap-2 flex-col p-2">
            <div>
              <NoRecordIcon />
            </div>
            <div className="text-[#06060680] flex flex-col text-center text-[20px] lg:text-[24px]">
              <span>No events found !</span>
              <span>try searching with different word.</span>
            </div>
          </div>
        )}
      </div>
      <EventModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        updatingItem={updatingItem}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteItem}
        itemId={updatingItem?.id}
      />
    </div>
  );
}
