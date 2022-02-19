import React, { useContext, useState } from "react";

import { AuthContext } from "../Context/AuthContext";

import { userUpdate, userDelete } from "../../api/users";

const MyProfil = ({ dataUser, getUserProfil }) => {
  const { token, userId } = useContext(AuthContext);
  const [resMessage, setResMessage] = useState("");
  const [startUpdate, setStartUpdate] = useState(false);
  const [majProfil, setMajProfil] = useState({
    first_name: "",
    last_name: "",
    profil_picture: "",
    email: "",
  });
  const updateProfil = () => {
    setStartUpdate(true);
    setMajProfil({ first_name: dataUser.first_name, last_name: dataUser.last_name, email: dataUser.email, profil_picture: "" });
  };
  const handleUpdate = (e) => {
    if (e.target.name !== "profil_picture") {
      setMajProfil({ ...majProfil, [e.target.name]: e.target.value });
    } else {
      setMajProfil({
        ...majProfil,
        profil_picture: e.target.files[0],
      });
    }
  };

  const sendUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", majProfil.first_name);
    formData.append("last_name", majProfil.last_name);
    formData.append("email", majProfil.email);
    if (majProfil.profil_picture) {
      formData.append("profil_picture", majProfil.profil_picture, majProfil.profil_picture.name);
    }

    userUpdate(userId, formData, token || localStorage.getItem("token"))
      .then(() => {
        setResMessage("Profil mis à jour");
        setMajProfil({ first_name: "", last_name: "", profil_picture: "", email: "" });
        document.getElementById("myProfil__profilpic").value = "";
        getUserProfil();
        setStartUpdate(false);
      })
      .catch((err) => setResMessage("Problème lors de la mise à jour"));
  };

  function readURL(input) {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("myProfil__picture").setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  }

  const sendPicture = (e) => {
    handleUpdate(e);
    readURL(e);
  };

  const deleteAccount = () => {
    userDelete(token || localStorage.getItem("token"))
      .then((res) => {
        getUserProfil();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {dataUser && (
        <div className="myProfil">
          <div className="myProfil__updated">{resMessage}</div>
          <h1>Mon profil</h1>
          {dataUser.inactive && <div className="myProfil__inactive">Votre compte sera supprimé dans 30 jours</div>}
          <label htmlFor="myProfil__prenom">Prenom</label>
          <input type="text" name="first_name" id="myProfil__prenom" className="myProfil__prenom" value={startUpdate ? majProfil.first_name : dataUser.first_name} disabled={startUpdate ? false : true} onChange={(e) => handleUpdate(e)} />
          <label htmlFor="myProfil__nom">Nom</label>
          <input type="text" name="last_name" id="myProfil__nom" className="myProfil__nom" value={startUpdate ? majProfil.last_name : dataUser.last_name} disabled={startUpdate ? false : true} onChange={(e) => handleUpdate(e)} />
          <label htmlFor="myProfil__email">Email</label>
          <input type="text" name="email" id="myProfil__email" className="myProfil__email" value={startUpdate ? majProfil.email : dataUser.email} disabled={startUpdate ? false : true} onChange={(e) => handleUpdate(e)} />

          <img src={dataUser.profil_picture} id="myProfil__picture" alt={"profil de " + dataUser.first_name + " " + dataUser.last_name} />
          <label htmlFor="myProfil__profilpic"></label>
          <input type="file" name="profil_picture" id="myProfil__profilpic" onChange={(e) => sendPicture(e)} disabled={startUpdate ? false : true} />
          <button onClick={startUpdate ? sendUpdate : updateProfil}>Mettre à jour</button>
          <button onClick={deleteAccount}>Supprimer mon compte</button>
        </div>
      )}
    </>
  );
};

export default MyProfil;
