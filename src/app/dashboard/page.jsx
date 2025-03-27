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
import { redirect } from "next/navigation";
import { useDebounce } from "use-debounce";
import { EventNames } from "@/constants/constants";
import { Popper } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { eventEmitter } from "@/utils/EventEmitter";
import AppLoader from "@/components/app_loader/AppLoader";

export default function Dashboard() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasRecord, setHasRecord] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCardView, setIsCardView] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbSearchQuery] = useDebounce(searchQuery, 1000);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    const userDataString = localStorage.getItem("userdata");
    const userData = JSON.parse(userDataString);
    if (userData) {
      getEvents();
    } else {
      redirect("/login");
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      getEvents(searchQuery);
    } else {
      getEvents();
    }
  }, [dbSearchQuery]);

  useEffect(() => {
    getEvents();
  }, [currentPage]);

  useEffect(() => {
    if (selectedFilters) {
      const string = selectedFilters.join(",");
      getEvents("", string);
    }
  }, [selectedFilters]);

  const getEvents = (query, filters) => {
    const userDataString = localStorage.getItem("userdata");
    const userData = JSON.parse(userDataString);
    const params = {
      pageSize: 9,
      pageNumber: currentPage,
      creatorId: userData.data.userId,
    };

    if (query) {
      params.searchQuery = query;
    }

    if (filters) {
      params.filters = filters;
    }

    eventEmitter.dispatch("loader", true);

    APICall.get("/event", { params })
      .then((res) => {
        setEventList(res.data);
        setHasRecord(res?.data?.totalCount > 0);
        if (res?.data?.totalCount <= 0) {
          setAnchorEl(null);
        }
        // setTotalCount(res?.data?.totalCount);
      })
      .catch((err) => {
        setAnchorEl(null);
      })
      .finally(() => {
        eventEmitter.dispatch("loader", false);
      });
  };

  const handleClickUpdate = (item) => {
    setUpdatingItem(item);
    setIsAddModalOpen(true);
  };

  const handleClickDelete = (item) => {
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

  const handleClickFilterItem = (val) => {
    const isExists = selectedFilters.includes(val);
    if (isExists) {
      setSelectedFilters((prev) => prev.filter((item) => item !== val));
    } else {
      setSelectedFilters((prev) => [...prev, val]);
    }
  };

  return (
    <div className="h-full flex">
      <div className="  h-[100%] p-3 lg:px-20 flex flex-col gap-2 w-[100vw]">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="ms-auto">
              <span
                className="cursor-pointer"
                onClick={() => setIsSearching(false)}
              >
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
              <button
                onClick={() => setIsSearching(true)}
                className="flex h-[18px] w-[18px] max-h-[40px] max-w-[40px] cursor-pointer"
              >
                <SearchIcon />
              </button>
              <div className="hidden lg:block">
                <input
                  type="text"
                  className="outline-0 ms-2"
                  placeholder="Search here.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                        <div
                          onClick={handleClick}
                          className="rounded-[8px] border-[1px] border-[#06060680] p-2 flex btn-hover-1"
                        >
                          <span>
                            <FilterButtonIcon />
                          </span>
                          <span className="text-[#06060680] text-[16px] hidden lg:block">
                            Filter
                          </span>
                        </div>
                        <button
                          onClick={() => setIsCardView((prev) => !prev)}
                          className="rounded-[8px] border-[1px] border-[#06060680] p-2 btn-hover-1"
                        >
                          {isCardView ? (
                            <div className="flex gap-2">
                              <CardViewButtonIcon />
                              <span className="text-[#06060680] text-[16px] hidden lg:block">
                                Card view
                              </span>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <ListViewButtonIcon />
                              <span className="text-[#06060680] text-[16px] hidden lg:block">
                                List view
                              </span>
                            </div>
                          )}
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setUpdatingItem(null);
                            setIsAddModalOpen(true);
                          }}
                          className="gradient-bg px-6 font-sans py-2 text-[16px] text-white btn-hover-2"
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
                      className="gradient-bg px-6 font-sans py-2 text-[16px] text-white btn-hover-2"
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
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div className="bg-amber-500 p-3 rounded-xl mt-1">
            <div>
              <span className="text-white">Select Categories</span>
            </div>
            <div className="flex gap-2 mt-2">
              {Object.entries(EventNames).map(([key, value]) => {
                const isActive = selectedFilters.includes(key);
                return (
                  <div
                    key={`filter-option-${key}`}
                    className="text-white text-[10px] rounded-xl px-3 py-1 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? "green" : "gray",
                    }}
                    onClick={() => handleClickFilterItem(key)}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
      <AppLoader />
    </div>
  );
}
