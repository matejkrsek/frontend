import { mdiBackspace, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ListTitle(props) {
  const [editTitleModal, setEditTitleModal] = useState(false);

  const [thisList, setThisList] = useState(props.thisList);
  const [title, setTitle] = useState(thisList.title);
  const { t } = useTranslation();

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
    <div style={{ display: "flex" }}>
      <Icon
        onClick={props.handleGoBack}
        size={2}
        path={mdiBackspace}
        style={{ color: "var(--darkbackground-color" }} // Default color
        onMouseEnter={(e) => (e.target.style.color = "gray")} // Gray color on hover
        onMouseLeave={(e) =>
          (e.target.style.color = "var(--darkbackground-color")
        } // Back to default color when mouse leaves
      />

      <div
        style={{
          fontSize: "5vh",
          fontWeight: "bold",
          marginLeft: "2vh",
          marginBottom: "1vh",
          gap: "1vh",
          display: "flex",
        }}
      >
        <div>{thisList.title}</div>
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
        header={t("confirmation")}
        modal
        onHide={() => setEditTitleModal(false)}
        footer={
          <React.Fragment>
            <Button
              onClick={() => setEditTitleModal(false)}
              style={{ marginRight: "10px", borderRadius: "5px" }}
              severity="secondary"
            >
              {t("close")}
            </Button>
            <Button
              onClick={() => handleEditTitle(title)}
              severity="danger"
              style={{ marginRight: "10px", borderRadius: "5px" }}
            >
              {t("submit")}
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
