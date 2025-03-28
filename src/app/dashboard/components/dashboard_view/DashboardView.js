"use client";
import { useEffect, useState } from "react";
import APICall from "@/utils/ApiCall";
import { redirect } from "next/navigation";
import { useDebounce } from "use-debounce";
import { eventEmitter } from "@/utils/EventEmitter";
import { EventNames, EventDateFilters } from "@/constants/constants";
import { Popper } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AppLoader from "@/components/app_loader/AppLoader";
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
  const userDataString = localStorage.getItem("userdata");
  const userData = JSON.parse(userDataString);
  const open = Boolean(anchorEl);
  const userPopper = Boolean(userAnchorEl);
  // const id = open ? "simple-popper" : undefined;

  useEffect(() => {
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
  }, [currentPage, sortEventDate, sortEventName]);

  const getEvents = (query) => {
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

  const handleClickDateFilterItem = (val) => {
    const isExists = dateFilters.includes(val);
    if (isExists) {
      setDateFilters((prev) => prev.filter((item) => item !== val));
    } else {
      setDateFilters((prev) => [...prev, val]);
    }
  };

  const handleClick = (event, type) => {
    if (type === "user") {
      setUserAnchorEl(userAnchorEl ? null : event.currentTarget);
      return;
    }
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleSortChange = (field) => {
    console.log("field", field);
    if (field === "name") {
      setSortEventName((prev) => {
        return prev === "asc" ? "desc" : "asc";
      });
      setSortEventDate("");
    }

    if (field === "date") {
      setSortEventDate((prev) => {
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
      <div className="  h-[100%] p-3 lg:px-20 flex flex-col gap-2 w-[100vw]">
        {isSearching ? (
          <div className="bg-white p-2 px-4 flex gap-1 rounded-[16px] items-center shadow-md shadow-[#00000014]">
            <div>
              <ArrowIcon />
            </div>
            <div>
              <input
                type="text"
                className="outline-0 ms-2 border-0!"
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
            <div className="ms-auto w-[40px] lg:w-auto flex items-center justify-center rounded-[12px] border-[1px] p-1 h-full border-[#EAEAEA]">
              <button
                onClick={() => setIsSearching(true)}
                className="flex h-[18px] w-[18px] max-h-[40px] max-w-[40px] cursor-pointer"
              >
                <SearchIcon />
              </button>
              <div className="hidden lg:block">
                <input
                  type="text"
                  className="outline-0 ms-2 border-0!"
                  placeholder="Search here.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={(e) => handleClick(e, "user")}
              className="flex w-[40px]  items-center justify-center rounded-[12px] cursor-pointer p-1 bg-[#EAEAEA] self-stretch"
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
                          onClick={(e) => handleClick(e)}
                          className="rounded-[8px] border-[1px] border-[#EAEAEA] p-2 flex btn-hover-1"
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
                          className="rounded-[8px] border-[1px] border-[#EAEAEA] p-2 btn-hover-1"
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
                      onChangeSorting={handleSortChange}
                      sortingFilters={{
                        eventName: sortEventName,
                        eventDate: sortEventDate,
                      }}
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
      <Popper id="cat-filter-pop" open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div className="p-2 mt-2 border-1 rounded-xl bg-white border-[#00000026] primary-shadow min-w-[280px] ms-1">
            <div>
              <div className="mt-2">
                <div className="text-[#060606] text-[14px]">By categories</div>
              </div>
              <div className="flex flex-col">
                {Object.entries(EventNames).map(([key, value]) => {
                  const isActive = selectedFilters.includes(key);
                  return (
                    <div
                      key={`event-option-${key}`}
                      className="text-[14px] lg:text-[16px] flex justify-between p-[6px] cursor-pointer rounded-sm hover:bg-[#EAEAEA]! hover:text-[#06060680]!"
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
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div>
                <div className="text-[#060606] text-[14px] mt-2">By Date</div>
              </div>
              <div className="flex flex-col">
                {Object.entries(EventDateFilters).map(([key, value]) => {
                  const isActive = dateFilters.includes(key);
                  return (
                    <div
                      key={`event-option-${key}`}
                      className="text-[14px] lg:text-[16px] flex justify-between p-[6px] cursor-pointer rounded-sm hover:bg-[#EAEAEA]! hover:text-[#06060680]!"
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
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="h-full flex justify-between items-end gap-2 mt-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 p-2 rounded-[8px] text-[14px] lg:text-[16px] font-medium secondary-button"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 p-2 gradient-bg text-white text-[14px] lg:text-[16px] font-medium rounded-[8px] btn-hover-2"
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
          <div className="p-2 mt-2 border-1 rounded-xl bg-white border-[#00000026] primary-shadow min-w-[180px]">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-center   ">
                <span className="flex p-1 bg-[#EAEAEA] rounded-md">
                  <UserIcon />
                </span>
              </div>
              <div className="text-[20px] font-sans text-[#060606] text-center">
                {userData?.data?.username}
              </div>
              <div className="text-[14px] font-sans text-[#06060680] text-center">
                {userData?.data?.email || "jhondoe@mailsample.com"}
              </div>
              <button
                className="flex gap-2 border-t-1 pt-2 items-center border-[#EAEAEA] mt-2 cursor-pointer"
                onClick={handleClickLogout}
              >
                <span>
                  <LogOutIcon />
                </span>
                <span className="text-[14px] font-sans text-[#060606]">
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </ClickAwayListener>
      </Popper>

      <AppLoader />
    </>
  );
};

export default DashboardView;
