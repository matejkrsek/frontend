import { mdiDeleteOutline, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

function MembersInterface(props) {
  const { v4: uuidv4 } = require("uuid");
  const [memberToDelete, setMemberToDelete] = useState({ name: "", id: "" });
  const [deleteMemberDialog, setDeleteMemberDialog] = useState(false);
  const [thisList, setThisList] = useState(props.thisList);
  const [memberName, setMemberName] = useState("");

  const addMember = (memberName) => {
    if (memberName !== "") {
      const newMember = { name: memberName, id: uuidv4() }; // Assuming you have a uniqueIdGenerator function

      const updatedList = {
        ...thisList,
        members: [...thisList.members, newMember],
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
          setMemberName("");
        } else {
          // Handle error
        }
      });
    }
  };

  const openDeleteItemModal = (member) => {
    setMemberToDelete(member);
    setDeleteMemberDialog(true);
  };

  const handleDeleteMember = () => {
    const indexToDelete = thisList.members.findIndex(
      (member) => member.id === memberToDelete.id
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
          setThisList(updatedList);
          setDeleteMemberDialog(false);
        } else {
          // Handle error
        }
      });
    } else {
      // Objekt nebyl nalezen
      console.log("Mmeber with this ID not found.");
    }
  };

  return (
    <div className="MEMBERS" style={{ minWidth: "30%" }}>
      <div style={{ fontWeight: "bold" }}>Members of this shopping list: </div>
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
          <Form.Label htmlFor="addMember">Add Member</Form.Label>
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
        header="Confirmation"
        modal
        onHide={() => setDeleteMemberDialog(false)}
        footer={
          <React.Fragment>
            <Button
              onClick={() => setDeleteMemberDialog(false)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
              severity="secondary"
            >
              No
            </Button>
            <Button
              severity="danger"
              onClick={() => handleDeleteMember(memberToDelete)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
            >
              Yes
            </Button>
          </React.Fragment>
        }
      >
        <div className="confirmation-content">
          <span>
            Do you really want to delete the item <b>{memberToDelete.name}</b>?
          </span>
        </div>
      </Dialog>
    </div>
  );
}
export default MembersInterface;
