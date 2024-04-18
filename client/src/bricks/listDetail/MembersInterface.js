import { mdiDeleteOutline, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { ShoppingListService } from "../../ShoppingListService";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

function MembersInterface(props) {
  const { v4: uuidv4 } = require("uuid");
  const [memberToDelete, setMemberToDelete] = useState({ name: "", id: "" });
  const [deleteMemberDialog, setDeleteMemberDialog] = useState(false);
  const [thisList, setThisList] = useState(props.thisList);
  const [memberName, setMemberName] = useState("");
  const toast = useRef(null);
  const { t } = useTranslation();
  const addMember = (memberName) => {
    if (memberName !== "") {
      const newMember = { name: memberName, id: uuidv4() }; // Assuming you have a uniqueIdGenerator function

      const updatedList = {
        ...thisList,
        members: [...thisList.members, newMember],
      };

      ShoppingListService.editShoppingList(updatedList).then(
        async (response) => {
          await response.json();
          console.log(response.status);
          switch (response.status) {
            case 200: {
              toast.current.show({
                severity: "success",
                summary: t("toastAddMember200Summary"),
                detail: t("success"),
                life: 3000,
              });
              setThisList(updatedList);
              setMemberName("");
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
        }
      );
    }
  };

  const openDeleteItemModal = (member) => {
    setMemberToDelete({ name: member.name, id: member.id });
    setDeleteMemberDialog(true);
  };

  const handleDeleteMember = () => {
    const indexToDelete = thisList.members.findIndex(
      (member) => member.id === memberToDelete.id
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
                summary: t("toastMemberDelete200Summary", {
                  member: memberToDelete.name,
                }),
                detail: t("success"),
                life: 3000,
              });
              setThisList(updatedList);
              setDeleteMemberDialog(false);
              break;
            }
            case 404: {
              alert(response.body.message);
              break;
            }
            case 500: {
              toast.current.show({
                severity: "error",
                summary: t("toastServererrorSummary"),
                detail: t("error"),
                life: 3000,
              });
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
      console.log("Mmeber with this ID not found.");
    }
  };

  return (
    <div
      className="MEMBERS"
      style={{ minWidth: "30%", marginBottom: "20px", marginRight: "10px" }}
    >
      <Toast ref={toast} />
      <div style={{ fontWeight: "bold" }}>{t("membersTitle")}</div>
      <div
        style={{
          borderTop: "1px solid grey",
          borderBottom: "1px solid grey",
          margin: "1vh",
        }}
      >
        {" "}
        {thisList.members.map((member) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1vh",
            }}
          >
            <div key={member.id}>{member.name}</div>
            {props.isAuthor ? (
              <Icon
                onClick={() => openDeleteItemModal(member)}
                onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
                onMouseLeave={(e) => (e.target.style.color = "black")}
                path={mdiDeleteOutline}
                size={1}
              />
            ) : null}
          </div>
        ))}
      </div>

      {props.isAuthor ? (
        <div>
          <Form.Label htmlFor="addMember">{t("addMember")}</Form.Label>
          <div style={{ display: "flex", gap: "1vh" }}>
            <Form.Control
              type="form-text"
              id="addMember"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              aria-describedby="addMemberName" //?
            />
            <Button
              onClick={() => addMember(memberName)}
              variant="success"
              type="submit"
            >
              <Icon path={mdiPlus} size={1} />
            </Button>
          </div>
        </div>
      ) : null}

      <Dialog
        visible={deleteMemberDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={t("Confirmation")}
        modal
        onHide={() => setDeleteMemberDialog(false)}
        footer={
          <React.Fragment>
            <Button
              onClick={() => setDeleteMemberDialog(false)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
              severity="secondary"
            >
              {t("No")}
            </Button>
            <Button
              severity="danger"
              onClick={() => handleDeleteMember(memberToDelete)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
            >
              {t("Yes")}
            </Button>
          </React.Fragment>
        }
      >
        <div className="confirmation-content">
          <span>{t("wantToDeleteMember")}</span>
        </div>
      </Dialog>
    </div>
  );
}
export default MembersInterface;
