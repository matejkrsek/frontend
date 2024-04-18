import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card"; // import komponenty Card
import "primeicons/primeicons.css";
import Icon from "@mdi/react"; // komponenta, kterou budeme používat pro zobrazení ikony
import {
  mdiArchiveCheck,
  mdiArchiveCheckOutline,
  mdiClipboardListOutline,
  mdiDelete,
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
import { ShoppingListService } from "../ShoppingListService";
import { useTranslation } from "react-i18next";

function List(props) {
  const loggedUser = { name: "Manila", id: "007" };
  const [thisList, setThisList] = useState(props.list);
  const updatedList = { ...thisList };
  const isAuthor = updatedList.author === loggedUser.name;
  const [deleteListDialog, setDeleteListDialog] = useState(false);
  const toast = useRef(null);
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [isArchived, setIsArchived] = useState(updatedList.isArchived);

  function handleDelete(listID) {
    ShoppingListService.deleteShoppingList(listID).then(async (response) => {
      await response.json();
      console.log(response.status);
      switch (response.status) {
        case 200: {
          toast.current.show({
            severity: "success",
            summary: t("toastDeleteListSuccessSummary"),
            detail: t("success"),
            life: 2000,
          });
          setDeleteListDialog(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);

          break;
        }
        case 404: {
          toast.current.show({
            severity: "error",
            summary: t("toastDeleteList404Summary"),
            detail: t("error"),
            life: 3000,
          });
          break;
        }
        case 500: {
          toast.current.show({
            severity: "error",
            summary: t("toastServerErrorSummary"),
            detail: t("error"),
            life: 3000,
          });
          break;
        }
        default: {
          alert(response.body.message);
        }
      }
    });
  }

  const deleteListDialogFooter = (
    <React.Fragment>
      <Button
        onClick={() => setDeleteListDialog(false)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
        severity="secondary"
      >
        {t("No")}
      </Button>
      <Button
        severity="danger"
        onClick={() => handleDelete(updatedList.id)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
      >
        {t("Yes")}
      </Button>
    </React.Fragment>
  );

  const handleArchive = () => {
    ShoppingListService.editShoppingList(updatedList).then(async (response) => {
      await response.json();
      console.log(response);
      switch (response.status) {
        case 200: {
          toast.current.show({
            severity: "success",
            summary: t("toastEditList200Summary"),
            detail: t("success"),
            life: 3000,
          });

          if (updatedList.isArchived) {
            updatedList.isArchived = false;
            setIsArchived(false);
          } else {
            updatedList.isArchived = true;
            setIsArchived(true);
          }

          break;
        }
        case 404: {
          alert(response.body.message);
          break;
        }
        case 500: {
          toast.current.show({
            severity: "error",
            summary: t("toastServerErrorSummary"),
            detail: t("error"),
            life: 3000,
          });
          break;
        }
        default: {
          alert(response.body.message);
        }
      }
    });
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
            maxWidth: "360px",
            height: "160px",
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 10,
          }}
        >
          <CardHeader
            style={{
              height: "100px",
              display: "grid",
              // justifyContent: "space-between", // Align items to the end
              //  alignItems: "stretch", // Align items vertically
              backgroundColor: "var(--yellow-color)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                    backgroundColor: "var(--yellow-color)",
                    border: "var(--yellow-color)",
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
            </div>
            <div>
              {" "}
              <i>
                {t("author")} {updatedList.author}
              </i>
            </div>
          </CardHeader>

          <CardFooter
            style={{
              backgroundColor: "var(--yellow-color)",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleNavigate}
              style={{
                borderRadius: "5px",
                backgroundColor: "var(--blue-color)",
                borderColor: "var(--blue-color)",
              }}
            >
              {t("readMore")}
            </Button>
          </CardFooter>
        </Card>

        <Dialog
          visible={deleteListDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header={t("confirmation")}
          modal
          footer={deleteListDialogFooter}
          onHide={() => setDeleteListDialog(false)}
        >
          <div className="confirmation-content">
            <span>
              {t("wantToDeleteList")}
              <b>{updatedList.title}</b>?
            </span>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default List;
