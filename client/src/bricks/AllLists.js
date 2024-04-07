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

function AllLists() {
  const loggedUser = { name: "Manila", id: "007" };
  const [filter, setFilter] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [createListForm, setCreateListForm] = useState(false);
  const [allLists, setAllLists] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/lists/`, {
      method: "GET",
    }).then(async (response) => {
      const serverLists = await response.json();
      switch (response.status) {
        case 200: {
          setAllLists(serverLists);

          break;
        }
        default: {
          toast.current.show({
            severity: "danger",
            summary: "Fail",
            detail: `Lists were not uploaded`,
            life: 3000,
          });
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

  return (
    <div>
      <div>
        <Navbar
          style={{
            backgroundColor: "lightyellow",
            gap: "5px",
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
            My shopping lists = domácí úkol č. 3
          </Navbar.Brand>
          <Button
            severity="success"
            onClick={() => setCreateListForm(true)}
            style={{ borderRadius: "5px", marginRight: "30px" }}
          >
            <Icon size={1} path={mdiPlus} />
            New shopping list
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
                All
              </option>
              <option value={""}>all</option>
              <option value={true}>archived</option>
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
              placeholder="Search"
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
      </div>
      <Modal
        show={createListForm}
        onHide={() => setCreateListForm(false)}
        size="lg"
      >
        <NewList loggedUser={loggedUser} />
      </Modal>
    </div>
  );
}

export default AllLists;
