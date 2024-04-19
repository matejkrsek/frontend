// users data
const LISTS = [
  {
    author: "Steve",
    title: "Sobota test",
    isArchived: false,
    id: "8fdq9f3fassa5e2b432et",
    members: [
      {
        name: "Markus",
        id: "456qwd54sd",
      },
      {
        name: "Honza",
        id: "456qasdd54sd",
      },
      {
        name: "Jan",
        id: "45bred54sd",
      },
    ],
    items: [
      {
        name: "lemon juice",
        isSolved: false,
        id: "4564efssd",
      },
      {
        name: "koblihy",
        isSolved: false,
        id: "06a8f628-beef-4636-8862-4b1bf64b5cfd",
      },
      {
        name: "mrkve",
        isSolved: false,
        id: "88e75f71-076b-4dbd-9c9e-ff99bd930bd5",
      },
      {
        name: "voda",
        isSolved: false,
        id: "cc9490c5-4a24-4888-b9a5-a0d5774af23d",
      },
    ],
  },
  {
    author: "Manila",
    title: "Trénink atletika",
    isArchived: true,
    id: "8fdq9f3f5e2b4rsde32et",
    members: [
      {
        name: "Hekrot",
        id: "456qwd54asdsd",
      },
      {
        name: "Jaromír",
        id: "45bredasfqd54sd",
      },
      {
        name: "Jákob",
        id: "e30029bf-5391-4bcd-9247-92f19c1da52e",
      },
      {
        name: "Rozárka",
        id: "93e05209-3e2f-4e7e-b2ff-45ce06e3b65a",
      },
    ],
    items: [
      {
        name: "kapesník XL",
        isSolved: false,
        id: "451assdasdvrd",
      },
      {
        name: "jahodový juice 2x",
        isSolved: false,
        id: "4564essfvsfssd",
      },
      {
        name: "bluebull 8 plechovek",
        isSolved: true,
        id: "45576aasdsdbzjnd",
      },
      {
        name: "klepýtka",
        isSolved: false,
        id: "7bf7a5c4-e574-479c-a121-a42f00d21dbc",
      },
    ],
  },
  {
    author: "Manila",
    title: "Neděle party 2",
    isArchived: false,
    id: "8fdq9f3f5e2b4asdre32et",
    members: [
      {
        name: "Jaromír",
        id: "45bredasfqd54sd",
      },
      {
        name: "Manila",
        id: "007",
      },
      {
        name: "Jákob",
        id: "e30029bf-5391-4bcd-9247-92f19c1da52e",
      },
      {
        name: "Rozárka",
        id: "93e05209-3e2f-4e7e-b2ff-45ce06e3b65a",
      },
    ],
    items: [
      {
        name: "bluebull 6 plechovek",
        isSolved: false,
        id: "45576abtsdcsdbzjnd",
      },
      {
        name: " 8 plechovek plzně",
        isSolved: true,
        id: "455sfresaasdsdbzjnd",
      },
      {
        name: "blueberries",
        isSolved: false,
        id: "45576aasdsasdbzjnd",
      },
      {
        name: "bluebull 8 plechovek",
        isSolved: false,
        id: "45576aasdsdbzjnd",
      },
      {
        name: "Rozmarýn",
        isSolved: false,
        id: "ff9fcc73-b4fd-4c72-9e7e-75a38913cd48",
      },
      {
        name: "Klobáska",
        isSolved: false,
        id: "3d04a8b4-8312-4119-b74d-f240b510fc7e",
      },
      {
        name: "peklovv",
        isSolved: true,
        id: "fd306dbb-1aae-45ee-a9f7-99a109e6d6c0",
      },
      {
        name: "rory",
        isSolved: true,
        id: "8ab07f6f-e29b-4794-89d7-9b4f1af1345b",
      },
    ],
  },
  {
    author: "Parler",
    title: "Neděle kolo s R",
    isArchived: false,
    id: "8fdq9f3f5e2b4re32et",
    showOnlyUnsolved: "false",
    members: [
      {
        name: "Hekrot",
        id: "456qwd54asdsd",
      },
      {
        name: "Jaromír",
        id: "45bredasfqd54sd",
      },
      {
        name: "Jákob",
        id: "e30029bf-5391-4bcd-9247-92f19c1da52e",
      },
      {
        name: "Rozárka",
        id: "93e05209-3e2f-4e7e-b2ff-45ce06e3b65a",
      },
    ],
    items: [
      {
        name: "bluebull 8 plechovek",
        isSolved: true,
        id: "45576aasdsdbzjnd",
      },
    ],
  },
  {
    author: "Joe",
    title: "Ne kole s R",
    isArchived: false,
    id: "8fdasdfaq9f3f5e2b4re32et",
    members: [
      {
        name: "Hekrot",
        id: "456qwd54asdsd",
      },
      {
        name: "Jaromír",
        id: "45bredasfqd54sd",
      },
      {
        name: "Jákob",
        id: "e30029bf-5391-4bcd-9247-92f19c1da52e",
      },
      {
        name: "Rozárka",
        id: "93e05209-3e2f-4e7e-b2ff-45ce06e3b65a",
      },
    ],
    items: [
      {
        name: "kapesník XL",
        isSolved: false,
        id: "451assdasdvrd",
      },

      {
        name: "bluebull 8 plechovek",
        isSolved: true,
        id: "45576aasdsdbzjnd",
      },
    ],
  },
  {
    author: "Jonathan",
    title: "Beer and chips",
    isArchived: true,
    id: "aswed6v54wsad",
    members: [
      {
        name: "Manila",
        id: "007",
      },
      {
        name: "Charlie",
        id: "008984wefsada",
      },
    ],
    items: [
      {
        name: "Beer 3x",
        isSolved: true,
        id: "456asd4efssd",
      },
      {
        name: "Chips",
        isSolved: true,
        id: "asds654we",
      },
      {
        name: "Cola",
        isSolved: true,
        id: "aqswdqw654d",
      },
      {
        name: "Cola light",
        isSolved: true,
        id: "aqswasddqw654d",
      },
    ],
  },
  {
    author: "Joana",
    title: "Big shopping!",
    isArchived: true,
    id: "d654adg5r4",
    members: [
      {
        name: "Manila",
        id: "007",
      },
      {
        name: "Chloe",
        id: "656465ergdfy3gre",
      },
    ],
    items: [
      {
        name: "Papers",
        isSolved: false,
        id: "4564efssasdssd",
      },
      {
        name: "Cola",
        isSolved: true,
        id: "aqswdqwtre54d",
      },
      {
        name: "Cola Cola",
        isSolved: true,
        id: "aqswdqwasds654d",
      },
      {
        name: "Scissors",
        isSolved: false,
        id: "qdffergdg456",
      },
      {
        name: "Bloody Mary 3x",
        isSolved: true,
        id: "ergfdrgdf64",
      },
      {
        name: "Games",
        isSolved: false,
        id: "ba2a0ae8-6ba8-4cd7-9e41-c028a76c7ed3",
      },
    ],
  },
  {
    author: "Juan",
    title: "Tomorrow",
    isArchived: false,
    id: "asdqref564346",
    members: [
      {
        name: "Manila",
        id: "007",
      },
      {
        name: "Pepek",
        id: "465fdg564ev",
      },
    ],
    items: [
      {
        name: "Noodles",
        isSolved: false,
        id: "4564efssssad",
      },
      {
        name: "Ketchup",
        isSolved: false,
        id: "qergdsfgqwef64654",
      },
      {
        name: "Black color",
        isSolved: true,
        id: "fdgbregdfg465654defgv",
      },
      {
        name: "Mug",
        isSolved: false,
        id: "22a8f65b-3862-460f-a28b-1428e1ee7c6a",
      },
    ],
  },
  {
    title: "Wednesday work meeting",
    author: "Manila",
    isArchived: true,
    id: "asdfwef654",
    members: [
      {
        name: "Herold",
        id: "etrdvwef654",
      },
      {
        name: "Pepe",
        id: "654stredf65g4",
      },
    ],
    items: [
      {
        name: "Ballons",
        isSolved: false,
        id: "4564efsasdsd",
      },
      {
        name: "Bin",
        isSolved: false,
        id: "wevwrsthdf654",
      },
      {
        name: "Colors",
        isSolved: true,
        id: "654s3a21wesd54",
      },
    ],
  },
  {
    title: "Marek potřebuje",
    author: "Manila",
    isArchived: false,
    members: [
      {
        name: "Markus",
        id: "4577acc1-f8e0-4fd1-bde8-835c75ac2b6b",
      },
      {
        name: "Demeter",
        id: "78b05b0e-cb4f-4c37-9b70-9bfcdee155b0",
      },
      {
        name: "Frank",
        id: "32f0bdfb-7b21-4c01-b127-396bde6d741b",
      },
    ],
    items: [
      {
        name: "Kedlubna",
        isSolved: true,
        id: "70552d6a-744b-4af1-9361-de727415fcad",
      },
      {
        name: "Perník",
        isSolved: false,
        id: "b403124a-3c3d-432d-ade0-1164dc354b83",
      },
      {
        name: "Vejce",
        isSolved: false,
        id: "2c0e099d-9798-4eee-9965-4581f73db3b4",
      },
    ],
    id: "64188d2d-d6d8-4805-b7d6-0e1338adc7d0",
  },
  {
    title: "Christmas Celebration",
    author: "Manila",
    isArchived: false,
    members: [
      {
        name: "Mother",
        id: "a17f2000-b832-4c27-95c8-4eb022b85e53",
      },
      {
        name: "Father John",
        id: "5bf023ff-b602-4485-a18c-0a305a866c71",
      },
    ],
    items: [
      {
        name: "Tree",
        isSolved: false,
        id: "b3d1ee4c-66a2-4884-8988-498ed202ddbb",
      },
      {
        name: "Candles",
        isSolved: false,
        id: "95ff9b61-e3f4-43d7-9157-944feecdd716",
      },
      {
        name: "Cape",
        isSolved: false,
        id: "a1ef50d0-4545-4673-91c9-c3323de85fa4",
      },
    ],
    id: "6a0d9c86-7464-44f4-a78d-4b8cc33a81d3",
  },
];

module.exports = [
  {
    id: "get-lists", // route id
    url: "/lists", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "ok", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: LISTS, // body to send
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
      {
        id: "not-found", // variant id
        type: "json", // variant handler id
        options: {
          status: 404, // status to send
          // body to send
          body: {
            message: "List with this is was not found",
          },
        },
      },
      {
        id: "server-error", // variant id
        type: "json", // variant handler id
        options: {
          status: 500, // status to send
          // body to send
          body: {
            message: "Server error",
          },
        },
      },
    ],
  },
  {
    id: "get-list", // route id
    url: "/lists/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "ok", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: LISTS[0],
        },
      },
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const listId = req.params.id;
            const list = LISTS.find((listData) => listData.id === listId);
            if (list) {
              res.status(200);
              res.send(list);
            } else {
              res.status(404);
              res.send({
                message: "User not found",
              });
            }
          },
        },
      },
    ],
  },
  {
    id: "post-list", // route id
    url: "/lists", // url in express format
    method: "POST", // HTTP method
    variants: [
      {
        id: "ok", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: {
            title: "MOCK Celebration",
            author: "Manila",
            isArchived: false,
            members: [
              {
                name: "Mother",
                id: "a17f2000-b832-4c27-95c8-4eb022b85e53",
              },
              {
                name: "Father John",
                id: "5bf023ff-b602-4485-a18c-0a305a866c71",
              },
            ],
            items: [
              {
                name: "Tree",
                isSolved: false,
                id: "b3d1ee4c-66a2-4884-8988-498ed202ddbb",
              },
              {
                name: "Candles",
                isSolved: false,
                id: "95ff9b61-e3f4-43d7-9157-944feecdd716",
              },
              {
                name: "Cape",
                isSolved: false,
                id: "a1ef50d0-4545-4673-91c9-c3323de85fa4",
              },
            ],
            id: "6b1d9c86-7464-44f4-a78d-4b8cc33a81d3",
          },
        },
      },

      {
        id: "server-error", // variant id
        type: "json", // variant handler id
        options: {
          status: 500, // status to send
          // body to send
          body: {
            message: "Server error",
          },
        },
      },
    ],
  },
  {
    id: "put-list", // route id
    url: "/lists/:id", // url in express format
    method: "PUT", // HTTP method
    variants: [
      {
        id: "ok", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: LISTS[4],
        },
      },
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const listId = req.params.id;
            const list = LISTS.find((listData) => listData.id === listId);
            if (list) {
              res.status(200);
              res.send({ ...req.body });
            } else {
              res.status(404);
              res.send({
                message: "User not found",
              });
            }
          },
        },
      },
      {
        id: "not-found", // variant id
        type: "json", // variant handler id
        options: {
          status: 404, // status to send
          body: [],
        },
      },
      {
        id: "server-error", // variant id
        type: "json", // variant handler id
        options: {
          status: 500, // status to send
          body: [],
        },
      },
    ],
  },
  {
    id: "delete-list", // route id
    url: "/lists/:id", // url in express format
    method: "DELETE", // HTTP method
    variants: [
      {
        id: "ok", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: {},
        },
      },
      {
        id: "not-found", // variant id
        type: "json", // variant handler id
        options: {
          status: 404, // status to send
          body: {},
        },
      },
      {
        id: "server-error", // variant id
        type: "json", // variant handler id
        options: {
          status: 500, // status to send
          body: {},
        },
      },
    ],
  },
];
