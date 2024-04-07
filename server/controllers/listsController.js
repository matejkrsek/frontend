const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// path - lists.json file
const listsFilePath = path.join(__dirname, "..", "data", "lists.json");

// Helper funkce for pro čtení a psaní dat listů
async function readLists() {
  try {
    const data = await fs.readFile(listsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Could not read lists data: ${error}`);
  }
}

async function writeLists(lists) {
  try {
    await fs.writeFile(listsFilePath, JSON.stringify(lists, null, 2), "utf-8");
  } catch (error) {
    throw new Error(`Could not write lists data: ${error}`);
  }
}

// upravený listsController pro JSON perzistenci
const listsController = {
  getAllLists: async (req, res) => {
    try {
      const lists = await readLists();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getListById: async (req, res) => {
    try {
      const lists = await readLists();
      const list = lists.find((d) => d.id === req.params.id);
      if (!list) {
        return res.status(404).send("list not found");
      }
      res.json(list);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createList: async (req, res) => {
    try {
      const lists = await readLists();

      const newList = { ...req.body, id: uuidv4() };

      // ke každé vybrané ingredienci přiřadit její existující id
      // uložit amount jako číslo

      lists.push(newList);
      await writeLists(lists);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateList: async (req, res) => {
    try {
      const lists = await readLists();
      const listIndex = lists.findIndex((d) => d.id === req.params.id);
      if (listIndex === -1) {
        return res.status(404).send("list not found");
      }
      let updatedList = { ...lists[listIndex], ...req.body };
      lists[listIndex] = updatedList;
      await writeLists(lists);
      res.status(200).json(updatedList);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteList: async (req, res) => {
    try {
      const lists = await readLists();
      const listIndex = lists.findIndex((d) => d.id === req.params.id);
      if (listIndex === -1) {
        return res.status(404).send("list not found");
      }
      lists.splice(listIndex, 1);
      await writeLists(lists);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = listsController;
