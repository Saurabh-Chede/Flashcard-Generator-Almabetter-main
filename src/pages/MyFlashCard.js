import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { ToastContainer } from "react-toastify";
import pokeball from "../media/pokeball.png";
import noFLashcard from "../media/noFLashcard.jpeg";
import { GiCrossMark } from "react-icons/gi";


function MyFlashCard() {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const [flashCardInfo, setFlashCardInfo] = useState(
    localStorage.getItem("flashcards")
      ? JSON.parse(localStorage.getItem("flashcards"))
      : []
  );

  const [delClickedItem, setDelClickedItem] = useState(null);

  // import useNavigate for navigate the page
  const navigate = useNavigate();

  // created a useState for manage  (show more ) button
  const [displayCard, setDisplayCard] = useState(6);
  const handleViewCardsClick = (item) => {
    navigate("/flashCardDetails", { state: item });
  };

  const deleteFlashCard = (delClickedItem) => {
    setDelClickedItem(delClickedItem);
    setDisplayDeleteModal(true);
  };

  return (
    <>
      <div className="myflashcard w-[78%] m-auto mt-3">
        <DeleteModal
          displayDeleteModal={displayDeleteModal}
          setDisplayDeleteModal={setDisplayDeleteModal}
          flashCardInfo={flashCardInfo}
          setFlashCardInfo={setFlashCardInfo}
          delClickedItem={delClickedItem}
        />
        <ToastContainer />
        <div className="absolute pr-10 overflow-visible text-sm  text-gray-500 font-bold text-right totalCards right-24">
          {!flashCardInfo.length
            ? null
            : `Total FlashCards : ${flashCardInfo.length}`}
        </div>
        <div className="flex flex-wrap m-auto overflow-hidden ">
          {flashCardInfo.length > 0 ? (
            flashCardInfo.slice(0, displayCard).map((item, index) => (
              <div
                key={index}
                className="commonBorder childCards flex flex-col m-auto bg-white w-[300px] h-[200px] p-[8px] rounded mt-[50px] relative mb-[10px] "
              >
                <button
                  className="absolute hidden text-3xl text-gray-500 del -right-3 -top-5 hover:text-4xl hover:text-red-600 "
                  onClick={() => deleteFlashCard(item)}
                >
                  <GiCrossMark />
                </button>
                <img
                  className="border-2 bg-slate-400 w-[70px] h-[70px] m-auto rounded-full absolute -top-12 left-[39.3%] mb-10"
                  src={item.upload_Image || pokeball}
                  alt=""
                />
                <h1 className="mt-4 font-bold ">{item.group_Name}</h1>
                <h2 className="h-10 mt-1 text-gray-700">
                  {item.group_Des.length > 60
                    ? item.group_Des.slice(0, 60) + "..."
                    : item.group_Des}
                </h2>
                <h2 className="mt-8 font-bold text-gray-500 text-center ">
                  {item.term.length} Cards
                </h2>
                <button
                  className="w-40 h-8 m-auto font-medium text-red-600 duration-300 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white"
                  onClick={() => handleViewCardsClick(item)}
                >
                  View Cards
                </button>
              </div>
            ))
          ) : (
            <div className=" w-[100%] h-[80vh] rounded noFlashcard overflow-hidden relative font-bold">
              <img
                className="absolute w-[100%] h-[100%]"
                src={noFLashcard}
                alt=""
              />
              <div className="mt-32 text-red-800 text-7xl backdrop-blur-sm">
                "No Flashcard available"
              </div>
              <br />
              <p className="mt-5 text-xl backdrop-blur-sm">
                Please go and{" "}
                <i className="underline text-amber-950 hover:text-teal-700">
                  <Link to="/createflashcard"> Create New FlashCard</Link>
                </i>
              </p>
            </div>
          )}
          {flashCardInfo.length > 6 && (
            <div className="w-[100%]">
              <div className="mt-5 text-right ">
                <button
                  onClick={() =>
                    setDisplayCard(displayCard === 6 ? flashCardInfo.length : 6)
                  }
                  className="w-24 mx-5 mb-24 font-bold text-red-700"
                >
                  {displayCard === 6 ? "See all" : "See less"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyFlashCard;
