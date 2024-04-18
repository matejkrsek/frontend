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
import React, { useRef, useState } from "react";

import { Dialog } from "primereact/dialog";
import { ShoppingListService } from "../../ShoppingListService";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

function ItemsInterface(props) {
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemToDelete, setItemToDelete] = useState({ name: "", id: "" });
  const [thisList, setThisList] = useState(props.thisList);
  const { v4: uuidv4 } = require("uuid");
  const toast = useRef(null);
  const { t } = useTranslation();

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

    ShoppingListService.editShoppingList(updatedList).then(async (response) => {
      await response.json();
      console.log(response.status);
      switch (response.status) {
        case 200: {
          setThisList(updatedList);
          break;
        }
        case 404: {
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
  };

  const handleDeleteItem = () => {
    const indexToDelete = thisList.items.findIndex(
      (item) => item.id === itemToDelete.id
    );

    if (indexToDelete !== -1) {
      const updatedList = {
        ...thisList,
        items: thisList.items.filter((_, index) => index !== indexToDelete),
      };
      ShoppingListService.editShoppingList(updatedList).then(
        async (response) => {
          await response.json();
          console.log(response.status);
          switch (response.status) {
            case 200: {
              toast.current.show({
                severity: "success",
                summary: t("toastDeleteItem200Summary"),
                detail: t("success"),
                life: 3000,
              });
              setThisList(updatedList);
              setDeleteItemDialog(false);
              break;
            }
            case 404: {
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
        }
      );
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

      ShoppingListService.editShoppingList(updatedList).then(
        async (response) => {
          await response.json();
          console.log(response.status);
          switch (response.status) {
            case 200: {
              setThisList(updatedList);
              setItemName("");
              break;
            }
            case 404: {
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
        }
      );
    }
  };

  return (
    <div style={{ paddingBottom: "5vh", minWidth: "30%", padding: "10px" }}>
      <Toast ref={toast} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "bold" }}>{t("items")}</div>
        <div style={{ fontStyle: "italic" }}>
          {t("showUnsolved")}
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
        header={t("confirmation")}
        modal
        onHide={() => setDeleteItemDialog(false)}
        footer={
          <React.Fragment>
            <Button
              onClick={() => setDeleteItemDialog(false)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
              variant="secondary"
            >
              {t("no")}
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteItem(itemToDelete)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
            >
              {t("yes")}
            </Button>
          </React.Fragment>
        }
      >
        <div className="confirmation-content">
          <span>{t("wantToDeleteItem", { item: itemToDelete.name })}</span>
        </div>
      </Dialog>

      <>
        <Form.Label htmlFor="addItem">{t("addItem")}</Form.Label>
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
