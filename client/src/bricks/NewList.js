import { Button } from "primereact/button";
import { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShoppingListService } from "../ShoppingListService";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

function NewList(props) {
  const defaultForm = {
    title: "",
    author: props.loggedUser.name,
    isArchived: "false",
    members: [],
    items: [],
  };
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState(defaultForm);

  const toast = useRef(null);

  const createNewList = () => {
    ShoppingListService.postShoppingList(formData).then(async (response) => {
      const serverList = await response.json();
      switch (response.status) {
        case 200: {
          toast.current.show({
            severity: "success",
            summary: t("toastCreate200Summary"),
            detail: t("success"),
            life: 2000,
          });
          setTimeout(() => {
            navigate("/listDetail?id=" + serverList.id);
          }, 2000);

          break;
        }
        case 404: {
          toast.current.show({
            severity: "error",
            summary: t("toastCreate404Summary"),
            detail: t("error"),
            life: 3000,
          });
          break;
        }
        case 500: {
          toast.current.show({
            severity: "error",
            summary: t("toastCreate500Summary"),
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
      <Toast ref={toast} />
      <Modal.Header closeButton>
        <Modal.Title>{t("newList")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>{t("formTitle")}</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) => setField("title", e.target.value)}
            maxLength={30}
            required
          />
          <Form.Control.Feedback type="invalid">
            {t("formFeedback")}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex flex-row justify-content-between align-items-center w-100">
          <div className="d-flex flex-row gap-2">
            <Button
              severity="secondary"
              onClick={closeNewList}
              style={{ borderRadius: "5px" }}
            >
              {t("close")}
            </Button>
            <Button
              onClick={createNewList}
              severity="success"
              type="submit"
              style={{ borderRadius: "5px" }}
            >
              {t("create")}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </div>
  );
}

export default NewList;
