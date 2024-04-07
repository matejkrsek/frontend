import { mdiBackspace, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

function ListTitle(props) {
  const [editTitleModal, setEditTitleModal] = useState(false);

  const [thisList, setThisList] = useState(props.thisList);
  const [title, setTitle] = useState(thisList.title);

  const handleEditTitle = (newTitle) => {
    const updatedList = {
      ...thisList,
      title: newTitle,
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
        setEditTitleModal(false);
      } else {
        // Handle error
      }
    });
  };

  return (
    <div style={{ display: "flex", padding: "1vh" }}>
      <Icon
        onClick={props.handleGoBack}
        size={2}
        path={mdiBackspace}
        style={{ color: "black" }} // Default color
        onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
        onMouseLeave={(e) => (e.target.style.color = "black")} // Back to default color when mouse leaves
      />

      <div
        style={{
          fontSize: "5vh",
          fontWeight: "bold",
          marginLeft: "3vh",
          gap: "2vh",
          display: "flex",
        }}
      >
        <div>{thisList.title} = domácí úkol č. 2</div>
        {props.isAuthor ? (
          <Icon
            onClick={() => setEditTitleModal(true)}
            path={mdiPencil}
            size={2}
            onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
            onMouseLeave={(e) => (e.target.style.color = "black")}
          />
        ) : null}
      </div>

      <Dialog
        visible={editTitleModal}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmation"
        modal
        onHide={() => setEditTitleModal(false)}
        footer={
          <React.Fragment>
            <Button
              onClick={() => setEditTitleModal(false)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
              severity="secondary"
            >
              Close
            </Button>
            <Button
              onClick={() => handleEditTitle(title)}
              severity="danger"
              style={{ marginRight: "10px", borderRadius: "5px" }}
            >
              Submit
            </Button>
          </React.Fragment>
        }
      >
        <Form.Control
          type="form-text"
          id="addTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-describedby="addTitle" //?
        />
      </Dialog>
    </div>
  );
}

export default ListTitle;
