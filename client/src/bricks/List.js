import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card"; // import komponenty Card
import "primeicons/primeicons.css";
import Icon from "@mdi/react"; // komponenta, kterou budeme používat pro zobrazení ikony
import {
  mdiArchive,
  mdiArchiveCheck,
  mdiArchiveCheckOutline,
  mdiClipboardListOutline,
  mdiDelete,
  mdiGlassCocktail,
  mdiPencilOutline,
} from "@mdi/js"; // ikony, které chceme využít
import CardFooter from "react-bootstrap/esm/CardFooter";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../App.css";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css"; // Replace with your chosen theme
import "primereact/resources/primereact.min.css";
import { Toast } from "primereact/toast";

function List(props) {
  const loggedUser = { name: "Manila", id: "007" };
  const [thisList, setThisList] = useState(props.list);
  const updatedList = { ...thisList };
  const isAuthor = updatedList.author === loggedUser.name;
  const [deleteListDialog, setDeleteListDialog] = useState(false);
  const toast = useRef(null);
  let navigate = useNavigate();
  const [isArchived, setIsArchived] = useState(updatedList.isArchived);

  function handleDelete(listID) {
    setDeleteListDialog(false);
    return fetch(`http://localhost:3001/api/drinks/${listID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      switch (response.status) {
        case 204: {
          toast.current.show({
            severity: "success",
            summary: "OK",
            detail: `Recipe succesfully deleted`,
            life: 3000,
          });

          break;
        }
        case 404: {
          toast.current.show({
            severity: "danger",
            summary: "Fail",
            detail: `Recipe not found`,
            life: 3000,
          });
          break;
        }
        default: {
          toast.current.show({
            severity: "danger",
            summary: "Error",
            detail: `Error`,
            life: 3000,
          });
        }
      }
      window.location.reload();
    });
  }

  const deleteListDialogFooter = (
    <React.Fragment>
      <Button
        onClick={() => setDeleteListDialog(false)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
        severity="secondary"
      >
        No
      </Button>
      <Button
        severity="danger"
        onClick={() => handleDelete(updatedList.id)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
      >
        Yes
      </Button>
    </React.Fragment>
  );

  const handleArchive = () => {
    if (updatedList.isArchived) {
      updatedList.isArchived = false;
      setIsArchived(false);
      alert(updatedList.title + " was unarchived");
    } else {
      updatedList.isArchived = true;
      setIsArchived(true);
      alert(updatedList.title + " was archived");
    }
    fetch(`http://localhost:3001/api/lists/${updatedList.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedList),
    }).then(console.log(updatedList.isArchived));
  };

  const handleNavigate = () => {
    navigate("/listDetail?id=" + updatedList.id);
  };

  return (
    <div>
      <Toast ref={toast} />
      <div>
        <Card
          style={{
            margin: "10px",
            minWidth: "250px",
            maxWidth: "350px",
            height: "200px",
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 10,
          }}
          className="bg-light"
        >
          <CardHeader
            style={{
              height: "70px",
              display: "flex",
              justifyContent: "space-between", // Align items to the end
              alignItems: "stretch", // Align items vertically
              backgroundColor: "lightyellow",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "large",
              }}
            >
              <Icon path={mdiClipboardListOutline} size={1} color="green" />{" "}
              {updatedList.title}
            </div>

            <div style={{ display: "flex", gap: "5px" }}>
              <Button
                visible={isAuthor}
                onClick={() => handleArchive()}
                style={{
                  backgroundColor: "lightyellow",
                  border: "lightyellow",
                  padding: "5px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {" "}
                {isArchived ? (
                  <Icon path={mdiArchiveCheck} size={0.8} color="black" />
                ) : (
                  <Icon
                    path={mdiArchiveCheckOutline}
                    size={0.8}
                    color="black"
                  />
                )}
              </Button>
              <Button
                visible={isAuthor}
                onClick={() => setDeleteListDialog(true)}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  border: "2px solid red",
                  borderRadius: "50%",
                  padding: "5px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon path={mdiDelete} size={0.8} color="red" />
              </Button>
            </div>
          </CardHeader>

          <Card.Body
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  fontSize: "small",
                }}
              >
                {"Author: "} {updatedList.author}
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  fontSize: "small",
                }}
              ></div>
            </div>
          </Card.Body>
          <CardFooter
            style={{
              backgroundColor: "lightyellow",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleNavigate}
              style={{
                borderRadius: "5px",
              }}
            >
              Read more
            </Button>
          </CardFooter>
        </Card>

        <Dialog
          visible={deleteListDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirmation"
          modal
          footer={deleteListDialogFooter}
          onHide={() => setDeleteListDialog(false)}
        >
          <div className="confirmation-content">
            <span>
              Do you really want to delete the shopping list{" "}
              <b>{updatedList.title}</b>?
            </span>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default List;
