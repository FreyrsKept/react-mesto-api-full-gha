import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "./CurrentUserContext";
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import resolve from "../images/resolve.svg";
import reject from "../images/reject.svg";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);


  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isAddPlacePopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || selectedCard) {
      function handleEscape(evt) {
        if (evt.key === 'Escape') {
          closePopups();
        }
      }

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      }
    }
  }, [isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, selectedCard]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmailName(res.data.email);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.setCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.log(err);
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  function handleUpdateUser(data) {
    api.sendUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closePopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api.sendNewCardInfo(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closePopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleAvatarUpdate(data) {
    api.setUserAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closePopups();
    }).catch((err) => {
      console.log(err);
    })
  }

  function onRegister(email, password) {
    auth.registerUser(email, password).then(() => {
      setPopupImage(resolve);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmailName(email);
      navigate("/");
    }).catch(() => {
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  function handleAvatarEdit() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleProfileEdit() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closePopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route path="/sign-in" element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={onLogin} />
              </>
            } />

            <Route path="/sign-up" element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={onRegister} />
              </>
            } />

            <Route exact path="/" element={
              <>
                <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
                <ProtectedRoute
                  component={Main}
                  isLogged={isLoggedIn}
                  onEditAvatar={handleAvatarEdit}
                  onEditProfile={handleProfileEdit}
                  onAddPlace={handleAddPlace}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            } />

            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
          </Routes>


          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopups}
            onSubmit={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopups}
            onSubmit={handleAvatarUpdate}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closePopups}
            onSubmit={handleAddPlaceSubmit}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closePopups}
          />

          <InfoTooltip
            image={popupImage}
            title={popupTitle}
            isOpen={infoTooltip}
            onClose={closePopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
