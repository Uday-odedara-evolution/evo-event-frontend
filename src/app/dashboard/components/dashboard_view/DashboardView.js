"use client";

import { useEffect, useState } from "react";
import APICall from "@/utils/ApiCall";
import { redirect } from "next/navigation";
import { useDebounce } from "use-debounce";
import { eventEmitter } from "@/utils/EventEmitter";
import { EventNames, EventDateFilters } from "@/constants/constants";
import { Popper } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  ArrowIcon,
  CardViewButtonIcon,
  CrossIcon,
  EvoEventIcon,
  FilterButtonIcon,
  LeafIcon,
  ListViewButtonIcon,
  LogOutIcon,
  NoRecordIcon,
  RightIcon,
  SearchIcon,
  UserIcon,
} from "@/assets/svg";
import { DeleteModal, EventModal } from "@/components";
import CardView from "../card_view/CardView";
import ListView from "../list_view/ListView";
import { useAuth } from "@/hooks/use-auth";

const DashboardView = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasRecord, setHasRecord] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCardView, setIsCardView] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbSearchQuery] = useDebounce(searchQuery, 1000);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [dateFilters, setDateFilters] = useState([]);
  const [sortEventName, setSortEventName] = useState("");
  const [sortEventDate, setSortEventDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAuth();
  const open = Boolean(anchorEl);
  const userPopper = Boolean(userAnchorEl);
  const isListFiltered = selectedFilters.length > 0 || dateFilters.length > 0;

  useEffect(() => {
    if (!userData) return;

    if (searchQuery) {
      getEvents(searchQuery);
    } else {
      getEvents();
    }
  }, [dbSearchQuery, userData]);

  useEffect(() => {
    if (userData) getEvents();
  }, [currentPage, sortEventDate, sortEventName, userData]);

  const getEvents = query => {
    const catFilters = selectedFilters.join(",");
    const dFilters = dateFilters.join(",");

    const params = {
      pageSize: 9,
      pageNumber: currentPage,
      creatorId: userData.data.userId,
    };

    if (sortEventDate) {
      params.sortDate = sortEventDate;
    }

    if (sortEventName) {
      params.sortName = sortEventName;
    }

    if (query) {
      params.searchQuery = query;
    }

    if (catFilters) {
      params.filters = catFilters;
    }

    if (dFilters) {
      params.dFilters = dFilters;
    }

    eventEmitter.dispatch("loader", true);

    APICall.get("/event", { params })
      .then(res => {
        setEventList(res.data);
        setHasRecord(res?.data?.totalCount > 0);
        if (res?.data?.totalCount <= 0) {
          setAnchorEl(null);
        }
      })
      .catch(() => {
        setAnchorEl(null);
      })
      .finally(() => {
        eventEmitter.dispatch("loader", false);
      });
  };

  const handleClickUpdate = item => {
    setUpdatingItem(item);
    setIsAddModalOpen(true);
  };

  const handleClickDelete = item => {
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

  const handleClickFilterItem = val => {
    const isExists = selectedFilters.includes(val);
    if (isExists) {
      setSelectedFilters(prev => prev.filter(item => item !== val));
    } else {
      setSelectedFilters(prev => [...prev, val]);
    }
  };

  const handleClickDateFilterItem = val => {
    const isExists = dateFilters.includes(val);
    if (isExists) {
      setDateFilters(prev => prev.filter(item => item !== val));
    } else {
      setDateFilters(prev => [...prev, val]);
    }
  };

  const handleClick = (event, type) => {
    if (type === "user") {
      setUserAnchorEl(userAnchorEl ? null : event.currentTarget);
      return;
    }
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSortChange = field => {
    console.log("field", field);
    if (field === "name") {
      setSortEventName(prev => {
        return prev === "asc" ? "desc" : "asc";
      });
      setSortEventDate("");
    }

    if (field === "date") {
      setSortEventDate(prev => {
        return prev === "asc" ? "desc" : "asc";
      });
      setSortEventName("");
    }
  };

  const handleClickLogout = () => {
    localStorage.clear();
    redirect("/login");
  };

  const handleResetFilters = () => {
    setDateFilters([]);
    setSelectedFilters([]);
  };
  const handleApplyFilters = () => {
    getEvents();
    setAnchorEl(null);
  };

  return (
    <>
      <div className="flex h-[100%] w-[100vw] flex-col gap-2 p-3 lg:px-20">
        {isSearching ? (
          <div className="flex items-center gap-1 rounded-[16px] bg-white p-2 px-4 shadow-md shadow-[#00000014]">
            <div>
              <ArrowIcon />
            </div>
            <div>
              <input
                type="text"
                className="ms-2 border-0! outline-0"
                placeholder="Search here.."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="ms-auto">
              <button
                className="cursor-pointer"
                onClick={() => setIsSearching(false)}
              >
                <CrossIcon />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1 rounded-[16px] bg-white p-2 shadow-md shadow-[#00000014]">
            <div className="h-[40px]">
              <EvoEventIcon />
            </div>
            <div className="ms-auto flex h-full w-[40px] items-center justify-center rounded-[12px] border-[1px] border-[#EAEAEA] p-1 lg:w-auto">
              <button
                onClick={() => setIsSearching(true)}
                className="flex h-[18px] max-h-[40px] w-[18px] max-w-[40px] cursor-pointer"
              >
                <SearchIcon />
              </button>
              <div className="hidden lg:block">
                <input
                  type="text"
                  className="ms-2 border-0! outline-0"
                  placeholder="Search here.."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={e => handleClick(e, "user")}
              className="flex w-[40px] cursor-pointer items-center justify-center self-stretch rounded-[12px] bg-[#EAEAEA] p-1"
            >
              <div>
                <UserIcon />
              </div>
            </button>
          </div>
        )}
        {hasRecord ? (
          <>
            {eventList?.totalCount > 0 ? (
              <div className="flex h-full flex-col gap-2">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                  <div className="mt-2">
                    <div className="font-sans text-[24px] font-medium text-[#060606]">
                      Events
                    </div>
                    <div className="text-[16px] font-normal text-[#06060680]">
                      View and manage every events of the future.
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between gap-2 lg:mt-0 lg:items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={e => handleClick(e)}
                        className="btn-hover-1 flex rounded-[8px] border-[1px] border-[#EAEAEA] p-2"
                        style={{
                          backgroundColor: isListFiltered ? "white" : "#FFF1EA",
                        }}
                      >
                        <span>
                          <FilterButtonIcon
                            stroke={isListFiltered ? "#FD5900" : "#06060680"}
                          />
                        </span>
                        <span
                          style={{
                            color: isListFiltered ? "#FD5900" : "#06060680",
                          }}
                          className="hidden text-[16px] text-[#06060680] lg:block"
                        >
                          Filter
                        </span>
                      </button>
                      <button
                        onClick={() => setIsCardView(prev => !prev)}
                        className="btn-hover-1 rounded-[8px] border-[1px] border-[#EAEAEA] p-2"
                      >
                        {isCardView ? (
                          <div className="flex gap-2">
                            <CardViewButtonIcon />
                            <span className="hidden text-[16px] text-[#06060680] lg:block">
                              Card view
                            </span>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <ListViewButtonIcon />
                            <span className="hidden text-[16px] text-[#06060680] lg:block">
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
                        className="gradient-bg btn-hover-2 px-6 py-2 font-sans text-[16px] text-white"
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
                    onChangeSorting={handleSortChange}
                    sortingFilters={{
                      eventName: sortEventName,
                      eventDate: sortEventDate,
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-2">
                <div>
                  <LeafIcon />
                </div>
                <div className="text-center">
                  <span className="text-center text-[20px] text-[#06060680]">
                    No Event’s to show yet ! add new event here...
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setUpdatingItem(null);
                      setIsAddModalOpen(true);
                    }}
                    className="gradient-bg btn-hover-2 px-6 py-2 font-sans text-[16px] text-white"
                  >
                    Add New Event
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-2">
            <div>
              <NoRecordIcon />
            </div>
            <div className="flex flex-col text-center text-[20px] text-[#06060680] lg:text-[24px]">
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
      <Popper id="cat-filter-pop" open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div className="primary-shadow ms-1 mt-2 min-w-[280px] rounded-xl border-1 border-[#00000026] bg-white p-2">
            <div>
              <div className="mt-2">
                <div className="text-[14px] text-[#060606]">By categories</div>
              </div>
              <div className="flex flex-col">
                {Object.entries(EventNames).map(([key, value]) => {
                  const isActive = selectedFilters.includes(key);
                  return (
                    <button
                      key={`event-option-${key}`}
                      className="flex cursor-pointer justify-between rounded-sm p-[6px] text-[14px] hover:bg-[#EAEAEA]! hover:text-[#06060680]! lg:text-[16px]"
                      style={{
                        backgroundColor: isActive ? "#FFF1EA" : "white",
                        color: isActive ? "#FD5900" : "#06060680",
                      }}
                      onClick={() => handleClickFilterItem(key)}
                    >
                      <span>{value}</span>
                      {isActive && (
                        <span>
                          <RightIcon />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div>
                <div className="mt-2 text-[14px] text-[#060606]">By Date</div>
              </div>
              <div className="flex flex-col">
                {Object.entries(EventDateFilters).map(([key, value]) => {
                  const isActive = dateFilters.includes(key);
                  return (
                    <button
                      key={`event-option-${key}`}
                      className="flex cursor-pointer justify-between rounded-sm p-[6px] text-[14px] hover:bg-[#EAEAEA]! hover:text-[#06060680]! lg:text-[16px]"
                      style={{
                        backgroundColor: isActive ? "#FFF1EA" : "white",
                        color: isActive ? "#FD5900" : "#06060680",
                      }}
                      onClick={() => handleClickDateFilterItem(key)}
                    >
                      <span>{value}</span>
                      {isActive && (
                        <span>
                          <RightIcon />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 flex h-full items-end justify-between gap-2">
              <button
                onClick={handleResetFilters}
                className="secondary-button flex-1 rounded-[8px] p-2 text-[14px] font-medium lg:text-[16px]"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="gradient-bg btn-hover-2 flex-1 rounded-[8px] p-2 text-[14px] font-medium text-white lg:text-[16px]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
      <Popper
        placement="bottom-end"
        id="user-profile-pop"
        open={userPopper}
        anchorEl={userAnchorEl}
      >
        <ClickAwayListener onClickAway={() => setUserAnchorEl(null)}>
          <div className="primary-shadow mt-2 min-w-[180px] rounded-xl border-1 border-[#00000026] bg-white p-2">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-center">
                <span className="flex rounded-md bg-[#EAEAEA] p-1">
                  <UserIcon />
                </span>
              </div>
              <div className="text-center font-sans text-[20px] text-[#060606]">
                {userData?.data?.username}
              </div>
              <div className="text-center font-sans text-[14px] text-[#06060680]">
                {userData?.data?.email || "jhondoe@mailsample.com"}
              </div>
              <button
                className="mt-2 flex cursor-pointer items-center gap-2 border-t-1 border-[#EAEAEA] pt-2"
                onClick={handleClickLogout}
              >
                <span>
                  <LogOutIcon />
                </span>
                <span className="font-sans text-[14px] text-[#060606]">
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default DashboardView;
