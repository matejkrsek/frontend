import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {} from "@mdi/js";
import ItemsInterface from "./ItemsInterface";
import ListTitle from "./ListTitle";
import MembersInterface from "./MembersInterface";
import { Dialog } from "primereact/dialog";
import { ShoppingListService } from "../../ShoppingListService";
import { Toast } from "primereact/toast";
import LoadingSpinner from "../utils/LoadingSpinner";
import { useTranslation } from "react-i18next";

function ListDetail(props) {
  const [deleteListModal, setDeleteListModal] = useState(false);
  const [leaveListModal, setLeaveListModal] = useState(false);
  const loggedUser = { name: "Manila", id: "007" };
  let navigate = useNavigate();
  const { t } = useTranslation();
  let [searchParams] = useSearchParams();
  const listId = searchParams.get("id");
  const toast = useRef(null);
  const [callStatus, setCallStatus] = useState({ state: "pending" });
  const [thisList, setThisList] = useState();
  const [author, setAuthor] = useState();
  const [isArchived, setIsArchived] = useState();

  useEffect(() => {
    ShoppingListService.getShoppingList(listId).then(async (response) => {
      const serverList = await response.json();
      switch (response.status) {
        case 200: {
          setThisList(serverList);
          setAuthor(serverList.author);
          setIsArchived(serverList.isArchived);
          setTimeout(() => {
            setCallStatus({ state: "ok" });
          }, 1000);

          break;
        }

        case 500: {
          alert(response.body.message);
          break;
        }
        case 404: {
          setCallStatus({ state: "unfound" });
          break;
        }
        default: {
          alert(response.body.message);
        }
      }
    });
  }, []);

  // If no matching item found, return null or appropriate message

  const handleGoBack = () => {
    navigate("/shoppingLists");
  };

  const openDeleteListModal = () => {
    setDeleteListModal(true);
  };

  const handleArchive = () => {
    isArchived ? setIsArchived(false) : setIsArchived(true);
  };

  const handleDeleteList = () => {
    ShoppingListService.deleteShoppingList(listId).then(async (response) => {
      await response.json();
      console.log(response.status);
      switch (response.status) {
        case 200: {
          toast.current.show({
            severity: "success",
            summary: t("toastDeleteListSuccessSummary", {
              title: thisList.title,
            }),
            detail: t("success"),
            life: 3000,
          });
          setDeleteListModal(false);
          setTimeout(() => {
            navigate("/shoppingLists");
          }, 3000); // Zpoždění o 3 vteřiny (3000 ms)
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

  const handleLeaveList = () => {
    setLeaveListModal(false);

    const indexToDelete = thisList.members.findIndex(
      (member) => member.id === loggedUser.id
    );

    if (indexToDelete !== -1) {
      const updatedList = {
        ...thisList,
        members: thisList.members.filter((_, index) => index !== indexToDelete),
      };

      ShoppingListService.editShoppingList(updatedList).then(
        async (response) => {
          await response.json();
          console.log(response.status);

          switch (response.status) {
            case 200: {
              toast.current.show({
                severity: "success",
                summary: t("toastLeaveList200Summary", {
                  title: thisList.title,
                }),
                detail: t("sucess"),
                life: 3000,
              });
              setTimeout(() => {
                navigate("/shoppingLists");
              }, 3000); // Zpoždění o 3 vteřiny (3000 ms)
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

  const openLeaveModal = () => {
    setLeaveListModal(true);
  };

  const isAuthor = author === loggedUser.name;

  const deleteListModalFooter = (
    <React.Fragment>
      <Button
        onClick={() => setDeleteListModal(false)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
        variant="secondary"
      >
        {t("no")}
      </Button>
      <Button
        variant="danger"
        onClick={handleDeleteList}
        style={{ marginRight: "10px", borderRadius: "5px" }}
      >
        {t("yes")}
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
        {t("no")}
      </Button>
      <Button
        variant="danger"
        onClick={() => handleLeaveList(thisList.id)}
        style={{ marginRight: "10px", borderRadius: "5px" }}
      >
        {t("yes")}
      </Button>
    </React.Fragment>
  );

  switch (callStatus.state) {
    case "ok":
      return (
        <div
          style={{
            backgroundColor: "var(--yellow-color)",
            minHeight: "100vh",
          }}
        >
          <Toast ref={toast} />
          <div style={{ backgroundColor: "var(--yellow-color)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "2vh",
              }}
              className="flex-md-row flex-column"
            >
              <ListTitle
                handleGoBack={handleGoBack}
                thisList={thisList}
                isAuthor={isAuthor}
              />

              <div>
                {isAuthor ? (
                  <div style={{ display: "flex", gap: "10px" }}>
                    {isArchived ? (
                      <Button
                        variant="secondary"
                        onClick={() => handleArchive()}
                        size="lg"
                      >
                        {t("unarchiveList")}
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => handleArchive()}
                        size="lg"
                      >
                        {t("archiveList")}
                      </Button>
                    )}

                    <Button
                      variant="danger"
                      onClick={openDeleteListModal}
                      size="lg"
                    >
                      {t("deleteList")}
                    </Button>
                  </div>
                ) : (
                  <Button variant="danger" onClick={openLeaveModal} size="lg">
                    {t("leaveList")}
                  </Button>
                )}
              </div>
            </div>

            <div></div>
            <div style={{ marginLeft: "4vh", fontSize: "large" }}>
              <div style={{ fontStyle: "italic", marginBottom: "3vh" }}>
                {t("author")} {thisList.author}
                {""}
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-evenly" }}
                className="flex-sm-row flex-column"
              >
                <ItemsInterface thisList={thisList} />
                <MembersInterface thisList={thisList} isAuthor={isAuthor} />
              </div>
            </div>
          </div>
          <Dialog
            visible={deleteListModal}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header={t("confirmation")}
            modal
            footer={deleteListModalFooter}
            onHide={() => setDeleteListModal(false)}
          >
            <div className="confirmation-content">
              <span>{t("wantToDeleteList", { title: thisList.title })}</span>
            </div>
          </Dialog>
          <Dialog
            visible={leaveListModal}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header={t("Confirmation")}
            modal
            footer={leaveListModalFooter}
            onHide={() => setLeaveListModal(false)}
          >
            <div className="confirmation-content">
              <span>{t("wantToLeaveList", { title: thisList.title })}</span>
            </div>
          </Dialog>
        </div>
      );

    case "unfound": {
      return <div> {t("listDoesntExist")}</div>;
    }
    default:
      return <LoadingSpinner />;
  }
}

export default ListDetail;
