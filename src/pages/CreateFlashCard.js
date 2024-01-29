import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, FieldArray } from "formik";
import "@fortawesome/fontawesome-free/css/all.css";
import { MdUploadFile } from "react-icons/md";

function CreateFlashCard() {
  return (
    <div
      className="w-[78%] m-auto mt-2 flex flex-col md:mt-10 "
      name="generateFlashcard"
    >
      {/* New Div */}

      <Formik
        initialValues={{
          group_Name: "",
          group_Des: "",
          upload_Image: null,

          term: [
            {
              term_Def: "",
              term_Name: "",
            },
          ],
        }}
      >
        {({}) => (
          <Form>
            <div
              className="bg-white w-[100%] h-[30%] p-[15px] flex flex-col text-left pl-[25px] commonBorder"
              name="createGroupDiv"
            >
              <div className="flex flex-col ml-2 md:flex-row">
                <div className="flex flex-col">
                  <label htmlFor="group_Name"> Create Group </label>
                  <Field
                    name="group_Name"
                    id="group_Name"
                    type="text"
                    placeholder="Group Name"
                    className=" rounded p-2 text-sm text-gray-900 border border-gray-300 w-full md:w-96 inField bg-gray-50"
                  ></Field>
                </div>

                <div>
                  <label
                    htmlFor="upload_Image"
                    class="w-40 h-[3px] cursor-pointer px-2  ml-5 my-3 mt-[24px] p-4  border border-gray-300 flex  items-center justify-center rounded text-sm  "
                  >
                    {" "}
                    <MdUploadFile className=" text-[2em] text-blue-700" />
                    <span class="font-bold text-blue-700 ">Upload Image</span>
                  {/* </label> */}
                  <input className="hidden"
                         name="upload_Image"
                         id="upload_Image"
                         type="file"
                  ></input>
                  </label>
                </div>
              </div>

              {/* New Div */}

              <div className="flex-col w-[70%] sm:w-[80%] sm:items-center w-100% relative mt-1 ">
                <label htmlFor="group_Des" className="ml-2.5">
                  Description
                </label>
                <textarea
                  name="group_Des"
                  id="group_Des"
                  placeholder="Group Description... "
                  class=" rounded relative ml-2.5 text-sm pl-2 py-1 mt-1 border border-gray-300 inField bg-gray-50 w-full w-100 h-28 resize-none inField"
                ></textarea>
              </div>
            </div>

            {/* New Div */}

            <div
              className="w-[100%] mt-3 pt-1 bg-white  flex flex-col text-left pl-[25px] commonBorder"
              name="TermCardfield"
            >
             
              <div class="flex-col overflow-hidden bg-white rounded-md">
                <div
                  name="termsDiv"
                  class="relative flex-row flex-wrap w-full mt-2 border-gray-300 md:flex md:space-x-4 md:items-center"
                >
                  <div className="w-8 h-8 px-2 ml-4 text-xl text-center text-white bg-red-500 rounded-full ">
                    1
                  </div>
                  {/* enter term Field */}
                  <div class="flex flex-col">
                    <label htmlFor="term_Name" className="">
                      Enter Term*
                    </label>
                    <input
                      name="term_Name"
                      id="term_Name"
                      type="text"
                      placeholder="Term Name"
                      class=" rounded p-2 mt-1 text-sm text-gray-900 border border-gray-300 w-60 md:w-72 inField bg-gray-50"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="term_Define">Enter Definition</label>
                    <Field
                      name="term_Define"
                      id="term_Define"
                      type="text"
                      placeholder="Please Enter The Definition"
                      className=" w-60 text-sm text-gray-900 md:w-72 inField bg-gray-50 mt-1 p-2 border border-gray-300 rounded-md"
                    ></Field>
                  </div>
                  <div className=" flex mt-3">
                    <label
                      htmlFor="Select image"
                      className=" p-2 mr-5 mt-1 cursor-pointer"
                    >
                      {" "}
                      <span className="flex w-32 p-2 mx-auto font-bold text-blue-700 transition-all ease-in-out border border-blue-700 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white ">
                        Select Image
                      </span>
                      <input className="hidden"
                         name="Select image"
                         id="Select image"
                         type="file"
                  ></input>
                    </label>
                  </div>
                </div>
              </div>
              <div className="inline-block mt-4 mb-6 font-bold text-blue-700 cursor-pointer mx-7">
                + Add More
              </div>
             

              {/* it's a create button to create a flashcard */}

              <div className="h-28 flex  items-center justify-center">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 font-bold py-2 px-14 rounded text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 text-center "
                >
                  Create
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateFlashCard;
