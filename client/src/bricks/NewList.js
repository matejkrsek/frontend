import { mdiPlus } from "@mdi/js";
import { Button } from "primereact/button";
import { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NewList(props) {
  const defaultForm = {
    title: "",
    author: props.loggedUser.name,
    isArchived: "false",
    members: [],
    items: [],
  };
  let navigate = useNavigate();
  const [formData, setFormData] = useState(defaultForm);

  const createNewList = () => {
    fetch(`http://localhost:3001/api/lists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async (response) => {
      const serverList = await response.json();
      console.log(serverList);
      navigate("/listDetail?id=" + serverList.id);
    });
  };

  const closeNewList = () => {
    props.closeFunction();
    setFormData(defaultForm);
  };

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };

      newData[name] = val;

      return newData;
    });
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Create new shopping list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) => setField("title", e.target.value)}
            maxLength={30}
            required
          />
          <Form.Control.Feedback type="invalid">
            Write from 1 to 25 characters
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex flex-row justify-content-between align-items-center w-100">
          <div className="d-flex flex-row gap-2">
            <Button
              severity="secondary"
              onClick={() => closeNewList()}
              style={{ borderRadius: "5px" }}
            >
              Close
            </Button>
            <Button
              onClick={createNewList}
              severity="success"
              type="submit"
              style={{ borderRadius: "5px" }}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </div>
  );
}

export default NewList;
