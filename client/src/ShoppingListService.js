const url = "http://localhost:3100";

export class ShoppingListService {
  static getAllLists() {
    return fetch(`${url}/lists`);
  }

  static getShoppingList(id) {
    return fetch(`${url}/lists/${id}`);
  }

  static deleteShoppingList(id) {
    return fetch(`${url}/lists/${id}`, { method: "DELETE" });
  }

  static postShoppingList(values) {
    return fetch(`${url}/lists`, {
      method: "POST",
      body: JSON.stringify(values, null, 2),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  static editShoppingList(values) {
    return fetch(`${url}/lists/${values.id}`, {
      method: "PUT",
      body: JSON.stringify(values, null, 2),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
}
