import { Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap style
import Icon from "@mdi/react";
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiDeleteOutline,
  mdiPlus,
} from "@mdi/js";
import { Button } from "react-bootstrap";
import React, { useState } from "react";

import { Dialog } from "primereact/dialog";

function ItemsInterface(props) {
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemToDelete, setItemToDelete] = useState({ name: "", id: "" });
  const [thisList, setThisList] = useState(props.thisList);
  const { v4: uuidv4 } = require("uuid");

  const handleShowOnlyUnsolvedChange = () => {
    showOnlyUnsolved ? setShowOnlyUnsolved(false) : setShowOnlyUnsolved(true);
  };

  const openDeleteItemModal = (item) => {
    setItemToDelete(item);
    setDeleteItemDialog(true);
  };

  const handleSolvedChange = (item) => {
    const updatedList = {
      ...thisList,
    };
    updatedList.items.map((everyitem) => {
      everyitem.id === item.id &&
        (everyitem.isSolved = everyitem.isSolved ? false : true);
    });

    fetch(`http://localhost:3001/api/lists/${thisList.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedList),
    }).then((response) => {
      if (response.ok) {
        setThisList(updatedList);
      } else {
        // Handle error
      }
    });
  };

  const handleDeleteItem = () => {
    const indexToDelete = thisList.items.findIndex(
      (item) => item.id === itemToDelete.id
    );

    if (indexToDelete !== -1) {
      console.log("Index to delete:", indexToDelete);

      const updatedList = {
        ...thisList,
        items: thisList.items.filter((_, index) => index !== indexToDelete),
      };
      fetch(`http://localhost:3001/api/lists/${thisList.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedList),
      }).then((response) => {
        if (response.ok) {
          setThisList(updatedList);
          setDeleteItemDialog(false);
        } else {
          // Handle error
        }
      });
    } else {
      // Objekt nebyl nalezen
      console.log("Item with this ID not found.");
    }
  };

  const addItem = (itemName) => {
    if (itemName !== "") {
      const newItem = { name: itemName, isSolved: false, id: uuidv4() }; // Assuming you have a uniqueIdGenerator function
      const updatedList = {
        ...thisList,
        items: [...thisList.items, newItem],
      };

      fetch(`http://localhost:3001/api/lists/${thisList.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedList),
      }).then((response) => {
        if (response.ok) {
          setThisList(updatedList);
          setItemName("");
        } else {
          // Handle error
        }
      });
    }
  };

  return (
    <div style={{ marginBottom: "5vh", minWidth: "30%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "bold" }}>Items of this shopping list:</div>
        <div style={{ fontStyle: "italic" }}>
          Show only unsolved items{" "}
          {showOnlyUnsolved ? (
            <Icon
              onClick={() => handleShowOnlyUnsolvedChange()}
              path={mdiCheckboxMarkedOutline}
              size={1}
              onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
              onMouseLeave={(e) => (e.target.style.color = "black")}
            />
          ) : (
            <Icon
              onClick={handleShowOnlyUnsolvedChange}
              path={mdiCheckboxBlankOutline}
              size={1}
              onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
              onMouseLeave={(e) => (e.target.style.color = "black")}
            />
          )}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid grey",
          borderBottom: "1px solid grey",
          margin: "1vh",
        }}
      >
        {" "}
        {thisList.items.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1vh",
            }}
          >
            {showOnlyUnsolved && item.isSolved === false && (
              <>
                <div key={item.id}>{item.name}</div>
                <div style={{ display: "flex", gap: "1vh" }}>
                  <Icon
                    onClick={() => handleSolvedChange(item)}
                    path={mdiCheckboxBlankOutline}
                    size={1}
                    onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
                    onMouseLeave={(e) => (e.target.style.color = "black")}
                  />
                  <Icon
                    onClick={() => openDeleteItemModal(item)}
                    path={mdiDeleteOutline}
                    size={1}
                    onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
                    onMouseLeave={(e) => (e.target.style.color = "black")}
                  />
                </div>
              </>
            )}

            {!showOnlyUnsolved && (
              <>
                <div key={item.id}>{item.name}</div>
                <div style={{ display: "flex", gap: "1vh" }}>
                  {item.isSolved ? (
                    <Icon
                      onClick={() => handleSolvedChange(item)}
                      path={mdiCheckboxMarkedOutline}
                      size={1}
                      onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
                      onMouseLeave={(e) => (e.target.style.color = "black")}
                    />
                  ) : (
                    <Icon
                      onClick={() => handleSolvedChange(item)}
                      path={mdiCheckboxBlankOutline}
                      size={1}
                      onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
                      onMouseLeave={(e) => (e.target.style.color = "black")}
                    />
                  )}
                  <Icon
                    onClick={() => openDeleteItemModal(item)}
                    path={mdiDeleteOutline}
                    size={1}
                    onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
                    onMouseLeave={(e) => (e.target.style.color = "black")}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Dialog
        visible={deleteItemDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmation"
        modal
        onHide={() => setDeleteItemDialog(false)}
        footer={
          <React.Fragment>
            <Button
              onClick={() => setDeleteItemDialog(false)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
              variant="secondary"
            >
              No
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteItem(itemToDelete)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
            >
              Yes
            </Button>
          </React.Fragment>
        }
      >
        <div className="confirmation-content">
          <span>
            Do you really want to delete the item <b>{itemToDelete.name}</b>?
          </span>
        </div>
      </Dialog>

      <>
        <Form.Label htmlFor="addItem">Add Item</Form.Label>
        <div style={{ display: "flex", gap: "1vh" }}>
          <Form.Control
            type="form-text"
            id="addItem"
            value={itemName}
            aria-describedby="addItemName" //?
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <Button
            onClick={() => addItem(itemName)}
            variant="success"
            type="submit"
          >
            <Icon path={mdiPlus} size={1} />
          </Button>
        </div>
      </>
    </div>
  );
}

export default ItemsInterface;
