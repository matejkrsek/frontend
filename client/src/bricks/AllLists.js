import React, { useEffect, useRef } from "react";
import List from "./List";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { useState, useMemo } from "react";
import { mdiFilterMenuOutline, mdiMagnify, mdiPlus } from "@mdi/js";
import { Modal } from "react-bootstrap";
import NewList from "./NewList";
import { ShoppingListService } from "../ShoppingListService";
import LoadingSpinner from "./utils/LoadingSpinner";
import { useTranslation } from "react-i18next";

import LineChart from "./utils/BarChart";
import BarChart from "./utils/BarChart";

function AllLists() {
  const loggedUser = { name: "Manila", id: "007" };
  const [filter, setFilter] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [createListForm, setCreateListForm] = useState(false);
  const [allLists, setAllLists] = useState([]);
  const [callStatus, setCallStatus] = useState({ state: "pending" });
  const { t } = useTranslation();

  useEffect(() => {
    ShoppingListService.getAllLists().then(async (response) => {
      const serverLists = await response.json();
      switch (response.status) {
        case 200: {
          setAllLists(serverLists);
          setTimeout(() => {
            setCallStatus({ state: "ok" });
          }, 1000);
          // setCallStatus({ state: "ok" });
          break;
        }
        case 400: {
          alert(response.body.message);
          break;
        }
        case 500: {
          alert(response.body.message);
          break;
        }
        default: {
          alert(response.body.message);
        }
      }
    });
  }, []);

  const filteredLists = useMemo(() => {
    return allLists.filter((list) => {
      // Existing conditions
      const searchBarCondition = list.title
        .toLowerCase()
        .includes(searchBy.toLowerCase());

      let filterCondition;
      if (filter !== "" && list.isArchived === false) {
        filterCondition = false;
      } else {
        filterCondition = true;
      }

      // New condition: Check if there exists at least one member whose name is loggedUser
      const memberCondition = list.members.some(
        (member) => member.name === loggedUser.name
      );

      // Return the result of combined conditions
      return (
        searchBarCondition &&
        filterCondition &&
        (list.author === loggedUser.name || memberCondition)
      );
    });
  }, [searchBy, allLists, filter]);

  //vyhledávání (search bar)
  function handleSearch(searchData) {
    searchData.preventDefault();

    setSearchBy(searchData.target["searchInput"].value);
  }
  //vyhledávání (search bar) 2
  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  function getAllLists(AllLists) {
    return (
      <div class="row">
        {AllLists.map((list) => {
          return (
            <div
              class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
              style={{ padding: "8px" }}
            >
              <List key={list.id} list={list} />
            </div>
          );
        })}
      </div>
    );
  }

  switch (callStatus.state) {
    case "ok":
      return (
        <div
          style={{
            backgroundColor: "var(--background-color)",
          }}
        >
          <div>
            <Navbar
              style={{
                backgroundColor: "var(--background-color)",
                gap: "5px",
                borderBottom: "2px solid grey",
              }}
              className="flex-md-row flex-column"
            >
              <Navbar.Brand
                style={{
                  paddingLeft: "10px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginRight: "auto",
                }}
              >
                {t("myLists")}
              </Navbar.Brand>
              <Button
                severity="success"
                onClick={() => setCreateListForm(true)}
                style={{ borderRadius: "5px", marginRight: "30px" }}
              >
                <Icon size={1} path={mdiPlus} />
                {t("newList")}
              </Button>
              <Form
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                  marginRight: "30px",
                }}
              >
                <Form.Select
                  style={{ height: "42px" }}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    {t("all")}
                  </option>
                  <option value={""}>{t("all")}</option>
                  <option value={true}>{t("archived")}</option>
                </Form.Select>
                <Icon path={mdiFilterMenuOutline} size={3} />
              </Form>
              <Form
                style={{ display: "flex", gap: "5px", marginRight: "30px" }}
                onSubmit={handleSearch}
              >
                <Form.Control
                  id={"searchInput"}
                  style={{ maxWidth: "150px" }}
                  type="search"
                  placeholder={t("search")}
                  aria-label="Search"
                  onChange={handleSearchDelete}
                />
                <Button
                  style={{ borderRadius: "5px" }}
                  severity="success"
                  type="submit"
                >
                  <Icon size={1} path={mdiMagnify} />
                </Button>
              </Form>
            </Navbar>
            {getAllLists(filteredLists)}
            <BarChart lists={allLists} />
          </div>
          <Modal
            show={createListForm}
            onHide={() => setCreateListForm(false)}
            size="lg"
          >
            <NewList
              setCreateListForm={setCreateListForm}
              loggedUser={loggedUser}
            />
          </Modal>
        </div>
      );
    case "error":
      return <div>{t("error")}</div>;
    default:
      return <LoadingSpinner />;
  }
}

export default AllLists;
