import { createSlice } from "@reduxjs/toolkit";


const storedFlashcards = JSON.parse(localStorage.getItem("flashcards"));

const initialState = {
  formData: {
    group_Name: "",
    upload_Image: "",
    group_Des: "",

    term: [
      {
        term_Name: "",
        term_Define: "",
        term_image: "",
      },
    ],
  },
  flashcards: storedFlashcards || [], 
};

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState ,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = action.payload;
    },

    addFlashCard : (state,action)=>{

      state.flashcards.unshift(action.payload);

      localStorage.setItem("flashcards",JSON.stringify(state.flashcards))
    },
  },
});


export const {updateFormData,addFlashCard} = flashcardSlice.actions;
export default flashcardSlice.reducer;
