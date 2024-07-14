import { Button, notification } from "antd";
import { collection, deleteDoc, getDocs, query } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";
const Context = React.createContext({ name: 'Default' });

function DeleteAllTeams() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message) => {
    api.info({
      message,
      placement: "topRight",
    });
  };
  const handleDeleteAllTeams = async () => {
    try {
      const teamsQuery = query(collection(db, "teams"));
      const snapshot = await getDocs(teamsQuery);

      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      openNotification("Todos los equipos han sido eliminados.");
    } catch (error) {
      console.error("Error deleting teams: ", error);
      openNotification("Hubo un error al eliminar los equipos.");
    }
  };

  return (
    <div>
           {contextHolder}
      <Button danger onClick={handleDeleteAllTeams}>
        Eliminar Todos los Equipos
      </Button>
    </div>
  );
}

export default DeleteAllTeams;
