import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { Button, Toast } from "react-bootstrap";
import {} from "@mdi/js";

import ItemsInterface from "./ItemsInterface";

import ListTitle from "./ListTitle";

import MembersInterface from "./MembersInterface";
import { Dialog } from "primereact/dialog";

function ListDetail(props) {
  const [lists, setLists] = useState([]);
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [leaveListModal, setLeaveListModal] = useState(false);
  const loggedUser = { name: "Manila", id: "007" };
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const listId = searchParams.get("id");

  useEffect(() => {
    console.log("useEffect triggered");
    fetch(`http://localhost:3001/api/lists/`, {
      method: "GET",
    }).then(async (response) => {
      const serverLists = await response.json();
      switch (response.status) {
        case 200: {
          setLists(serverLists);

          break;
        }
        default: {
          Toast.current.show({
            severity: "danger",
            summary: "Fail",
            detail: `Items were not uploaded`,
            life: 3000,
          });
        }
      }
    });
  }, []);

  const thisList = lists.find((item) => item.id === listId);
  // If no matching item found, return null or appropriate message
  if (!thisList) {
    return <div>No item found with id {listId}</div>;
  }

  const handleGoBack = () => {
    navigate("/shoppingLists");
  };

  const openDeleteListModal = () => {
    setDeleteListModal(true);
  };

  const handleArchive = () => {};

  const handleDeleteList = () => {
    setDeleteListModal(false);
    fetch(`http://localhost:3001/api/lists/${thisList.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/shoppingLists");
  };

  const handleLeaveList = () => {
    setLeaveListModal(false);

    const indexToDelete = thisList.members.findIndex(
      (member) => member.id === loggedUser.id
    );

    if (indexToDelete !== -1) {
      console.log("Index to delete:", indexToDelete);

      const updatedList = {
        ...thisList,
        members: thisList.members.filter((_, index) => index !== indexToDelete),
      };

      fetch(`http://localhost:3001/api/lists/${thisList.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedList),
      }).then((response) => {
        if (response.ok) {
        } else {
          // Handle error
        }
      });
      navigate("/shoppingLists");
    }
  };

  const openLeaveModal = () => {
    setLeaveListModal(true);
  };

  const handleEditTitle = () => {
    // Add delete logic here
  };

  //authorization...
  const isAuthor = thisList.author === loggedUser.name;

  const deleteListModalFooter = (
    <React.Fragment>
      <Button
        onClick={() => setDeleteListModal(false)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
        variant="secondary"
      >
        No
      </Button>
      <Button
        variant="danger"
        onClick={handleDeleteList}
        style={{ marginRight: "10px", borderRadius: "5px" }}
      >
        Yes
      </Button>
    </React.Fragment>
  );

  const leaveListModalFooter = (
    <React.Fragment>
      <Button
        onClick={() => setLeaveListModal(false)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
        variant="secondary"
      >
        No
      </Button>
      <Button
        variant="danger"
        onClick={() => handleLeaveList(thisList.id)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
      >
        Yes
      </Button>
    </React.Fragment>
  );

  return (
    <div style={{ backgroundColor: "lightyellow", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "lightyellow" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1vh",
          }}
        >
          <ListTitle
            handleGoBack={handleGoBack}
            thisList={thisList}
            isAuthor={isAuthor}
            handleEditTitle={handleEditTitle}
          />

          <div style={{}}>
            {isAuthor ? (
              <div style={{ display: "flex", gap: "10px" }}>
                <Button variant="secondary" onClick={handleArchive} size="lg">
                  Archive this list
                </Button>
                <Button
                  variant="danger"
                  onClick={openDeleteListModal}
                  size="lg"
                >
                  Delete this list
                </Button>
              </div>
            ) : (
              <Button variant="danger" onClick={openLeaveModal} size="lg">
                Leave this list
              </Button>
            )}
          </div>
        </div>

        <div></div>
        <div style={{ marginLeft: "4vh", fontSize: "large" }}>
          <div style={{ fontStyle: "italic", marginBottom: "3vh" }}>
            Author: {thisList.author}
            {""}
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <ItemsInterface thisList={thisList} />
            <MembersInterface thisList={thisList} isAuthor={isAuthor} />
          </div>
        </div>
      </div>
      <Dialog
        visible={deleteListModal}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmation"
        modal
        footer={deleteListModalFooter}
        onHide={() => setDeleteListModal(false)}
      >
        <div className="confirmation-content">
          <span>
            Do you really want to delete the shopping list{" "}
            <b>{thisList.title}</b>?
          </span>
        </div>
      </Dialog>
      <Dialog
        visible={leaveListModal}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmation"
        modal
        footer={leaveListModalFooter}
        onHide={() => setLeaveListModal(false)}
      >
        <div className="confirmation-content">
          <span>
            Do you really want to leave the shopping list{" "}
            <b>{thisList.title}</b>?
          </span>
        </div>
      </Dialog>
    </div>
  );
}

export default ListDetail;
