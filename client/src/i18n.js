import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",

    resources: {
      en: {
        translation: {
          myLists: "My shopping lists",
          newList: "New shopping list",
          readMore: "Read more",
          formTitle: "Title",
          shoppingLists: "Shopping Lists",
          formFeedback: "Write from 1 to 25 characters",
          wantToDeleteList:
            "Do you really want to delete the shopping list {{title}} ",
          wantToDeleteItem: "Opravdu chcete odstranit položku {{item}}?",
          wantToLeaveList: "Do you really want to leave the {{title}}?",
          welcomeText:
            " Welcome to the n.1 shopping lists application on the planet. If you would like to get more information about any shopping list, feel free to follow here:",
          appTitle: "The world n. 1 shopping lists application",
          addMember: "Add member",
          membersTitle: "Members of this shopping list:",
          listDoesntExist: "", // This list doesnt exist in my database: {listId}
          leaveList: "Leave",
          deleteList: "Delete",
          archiveList: "Archive",
          unarchiveList: "Unarchive",
          showUnsolved: "Show only unsolved",
          items: "Items of this shopping list:",

          close: "Close",
          create: "Create",
          yes: "Yes",
          no: "No",
          all: "All",
          archived: "Archived",
          search: "Search",
          sucess: "Success",
          home: "Home",
          error: "Error",
          confirmation: "Confirmation",
          author: "Author: ",
          submit: "Submit",
          addItem: "Add item",

          toastCreate200Summary: "", // "The shopping list " + formData.title + " was created"
          toastCreate404Summary: "List with this ID was not found",
          toastServerErrorSummary: "Server error",
          toastDeleteListSuccessSummary: "",
          toastDeleteList404Summary: "List with this ID was not found",
          toastEditList200Summary: "",
          toastMemberDelete200Summary: "The member {{member}} was deleted",
          toastAddMember200Summary: "", // "You succesfuly added " + newMember.name,
          toastLeaveList200Summary: "You succesfuly left {{title}}",
          toastDeleteItem200Summary: "Položka byla smazána",
          // here we will place our translations...
        },
      },
      cz: {
        translation: {
          appTitle: "Světová aplikace nákupních seznamů č. 1",
          shoppingListsMenu: "Nákupní seznamy",
          shoppingLists: "Nákupní seznamy",
          welcomeText:
            "Vítejte ve světové aplikaci nákupních seznamů č. 1, pro více informací o nákupních seznamech pokračujte zde:",
          myLists: "Mé nákupní seznamy",
          newList: "Nový nákupní seznam",
          readMore: "Více",
          formTitle: "Název",
          formFeedback: "Napište 1 až 25 znaků",
          wantToDeleteList: "Opravdu chcete odstranit nákupní seznam ",
          wantToDeleteMember: "Opravdu chcete odtranit člena {{member}}?",
          wantToDeleteItem: "Opravdu chcete odstranit položku {{item}}?",
          wantToLeaveList: "Opravdu chcete opustit nkupní seznam {{title}}?",
          addMember: "Přidat člena",
          membersTitle: "Členové tohoto nákupního seznamu:",
          listDoesntExist: "",
          leaveList: "Opustit",
          deleteList: "Smazat",
          archiveList: "Archivuj",
          unarchiveList: "Zruš archivaci",
          showUnsolved: "Zobrazit pouze nevyřešené",
          items: "Položky nákupního seznamu:",
          addItem: "Přidej položku",

          close: "Zavřít",
          create: "Vytvořit",
          success: "Úspěch",
          yes: "Ano",
          no: "Ne",
          all: "Všechny",
          archived: "Archivované",
          search: "Hledej",
          home: "Domů",
          error: "Error",
          confirmation: "Potvrzení",
          author: "Autor: ",
          submit: "Odeslat",

          toastCreate200Summary: "",
          toastCreate404Summary: "Sezanm s tímto ID nebyl nalezen",
          toastServerErrorSummary: "Server error",
          toastDeleteListSuccessSummary: "The list {{title}} was deleted",
          toastDeleteList404Summary: "List with this ID was not found",
          toastEditList200Summary: "", // "The shopping list" + updatedList.title + " was updated"
          toastMemberDelete200Summary: "", // "The member " + memberToDelete.name + " was deleted.",
          toastAddMember200Summary: "", // "You succesfuly added " + newMember.name,
          toastLeaveList200Summary: "Opustil jste nákupní seznam {{title}}",
          toastDeleteItem200Summary: "You successfully deleted the item",
        },
      },
    },
  });

export default i18n;
