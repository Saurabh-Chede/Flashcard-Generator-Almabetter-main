import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import "@fortawesome/fontawesome-free/css/all.css";
import { MdUploadFile } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { addFlashCard } from "../redux/flashcardSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateImage from "../validation/validateImage";
import validationSchema from "../validation/validationSchema";
import { GiCrossMark } from "react-icons/gi";

function CreateFlashCard() {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.flashcard.formData);
  const addMoreTermS = (values, moreTerm) => {
    moreTerm.insert(values.term.length + 1, {
      term_Name: "",
      term_Define: "",
      term_image: "",
    });
    toast.info("Term Card Added !", {
      position: "top-right",
      pauseOnFocusLoss: false,
    });
  };

  const submitForm = (values) => {
    dispatch(addFlashCard(values));
    toast.success("FlashCard Created Successfully", {
      theme: "colored",
      position: "top-right",
      pauseOnFocusLoss: false,
    });
  };

  return (
    <div
      className="w-[78%] m-auto mt-2 flex flex-col md:mt-10 "
      name="generateFlashcard"
    >
      <ToastContainer />
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm({ values: "" });
        }}
      >
        {({ values, handleBlur, handleChange, setFieldValue }) => (
          <Form>
            <div
              className="bg-white w-[100%] h-[30%] p-[15px] flex flex-col text-left mt-0 pl-[25px] rounded-md commonBorder"
              name="createGroupDiv"
            >
              <div className="flex flex-col md:flex-row sm:flex-col">
                <div className="flex flex-col">
                  <label
                    htmlFor="group_Name"
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Create Group
                  </label>
                  <Field
                    name="group_Name"
                    id="group_Name"
                    type="text"
                    placeholder="Group Name"
                    className=" rounded p-2 text-sm text-gray-900 border border-gray-300 w-full md:w-72 inField bg-gray-50"
                  ></Field>
                  <ErrorMessage name="group_Name">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                </div>

                <div>
                  {values.upload_Image ? (
                    <div className="flex ">
                      <img
                        className="text-center rounded-full h-28 w-28 mx-7 "
                        src={values.upload_Image}
                        alt=""
                      />

                      {/* its an image upload button */}
                      <GiCrossMark
                        name="groupImgDelIcon"
                        className="mt-[10px] -ml-[20px] text-gray-400 hover:text-red-600 hover:text-xl hover:cursor-pointer "
                        onClick={() => setFieldValue("upload_Image", null)} //selecting same image
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="upload_Image"
                      className="w-40 h-[3px] cursor-pointer px-2  ml-5 my-3 mt-[24px] p-4  border border-gray-300 flex  items-center justify-center rounded text-sm  "
                    >
                      <MdUploadFile className=" text-[2em] text-blue-700" />
                      <span className="font-bold text-blue-700 ">
                        Upload Image
                      </span>
                    </label>
                  )}

                  {/*              */}
                  <input
                    className="hidden"
                    name="upload_Image"
                    id="upload_Image"
                    type="file"
                    onClick={(e) => (e.target.value = null)} //selecting same image
                    onChange={(e) => {
                      e.preventDefault();
                      // image validation
                      if (
                        e.target.files[0] &&
                        !validateImage.includes(e.target.files[0].type)
                      ) {
                        toast.warning("Please Upload in Image Format !", {
                          pauseOnFocusLoss: false,
                        });
                      } else if (e.target.files[0].size > 304800) {
                        toast.warning(
                          "Image size is very Large ! Please Select Image size less than 300kb",
                          {
                            pauseOnFocusLoss: false,
                          }
                        );
                      } else {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("upload_Image", reader.result);
                        };
                      }
                    }}
                  />
                </div>
              </div>

              {/* Description field started  */}

              <div className="flex flex-col ">
                <label htmlFor="group_Des" className=" mt-2 text-sm text-gray-900 font-medium mb-2">
                 Add Description
                </label>
                <Field
                  as="textarea"
                  name="group_Des"
                  id="group_Des"
                  placeholder="Group Description... "
                  className="w-full md:w-[70%]  h-28 resize-none  border-gray-300 text-sm scrollbar-hide"
                ></Field>
                <ErrorMessage name="group_Des">
                  {(emsg) => <div className="error ">{emsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            {/* term Division started from here */}

            <div
              className="w-[100%] mt-3 pt-1 bg-white  flex flex-col text-left pl-[25px] rounded-md commonBorder"
              name="TermCardfield"
            >
              <FieldArray
                name="term"
                render={(moreTerm) => (
                  <div className="flex-col overflow-hidden bg-white rounded-md">
                    {values.term &&
                      values.term.map((term, index) => (
                        <div
                          name="termsDiv"
                          className="relative flex-row flex-wrap w-full mt-2 border-gray-300 md:flex md:space-x-4 md:items-center"
                          key={index}
                        >
                          <div className="w-8 h-8 px-2 ml-4 text-xl text-center text-white bg-red-500 rounded-full">
                            {index + 1}
                          </div>

                          {/* enter term Field */}
                          <div className="flex flex-col">
                            <label htmlFor={`term.${index}.term_Name`} className="text-sm font-medium text-gray-900">
                              Enter Term*
                            </label>
                            <Field
                              name={`term.${index}.term_Name`}
                              id={`term.${index}.term_Name`}
                              value={term.term_Name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Name"
                              className=" rounded p-2 mt-1 text-sm text-gray-900 border border-gray-300 w-60 md:w-72 inField bg-gray-50"
                            ></Field>
                            <ErrorMessage name={`term.${index}.term_Name`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor={`term.${index}.term_Define`} className="text-sm font-medium text-gray-900">
                              Enter Definition
                            </label>
                            <Field
                              name={`term.${index}.term_Define`}
                              id={`term.${index}.term_Define`}
                              value={term.term_Define}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Please Enter The Definition"
                              className="w-60 text-sm text-gray-900 md:w-72 inField bg-gray-50 mt-1 sm:mt-1 p-2 border border-gray-300 rounded-md"
                            ></Field>
                            <ErrorMessage name={`term.${index}.term_Define`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>

                          <div className=" flex mt-3">
                            {term.term_image ? (
                              <div className="flex ">
                                <img
                                  className="w-20 h-20 p-1 rounded-lg"
                                  src={term.term_image}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor={`term.${index}.term_image`}
                                className=" p-2 mr-5 mt-1 cursor-pointer"
                              >
                                <span className="flex w-32 p-2 mx-auto font-bold text-blue-700 transition-all ease-in-out border border-blue-700 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white ">
                                  Select Image
                                </span>
                              </label>
                            )}

                            <input
                              onClick={(e) => (e.target.value = null)} //selecting same image
                              onChange={(e) => {
                                e.preventDefault();
                                // Validation on image

                                if (
                                  e.target.files[0] &&
                                  !validateImage.includes(
                                    e.target.files[0].type
                                  )
                                ) {
                                  toast.warning(
                                    "Please Upload in Image Format !",
                                    {
                                      pauseOnFocusLoss: false,
                                    }
                                  );
                                } else if (e.target.files[0].size > 304800) {
                                  toast.warning(
                                    "Image size is very Large ! Please Select Image size less than 300kb",
                                    {
                                      pauseOnFocusLoss: false,
                                    }
                                  );
                                } else {
                                  const file = e.target.files[0];
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onload = () => {
                                    setFieldValue(
                                      `term.${index}.term_image`,
                                      reader.result
                                    );
                                  };
                                }
                              }}
                              className="hidden"
                              id={`term.${index}.term_image`}
                              name={`term.${index}.term_image`}
                              type="file"
                            />
                            <div>
                              {/*Visible Delete btn in term if more than one */}
                              {values.term.length <= 1 ? null : (
                                <RiDeleteBin6Line
                                  className="text-[1.8em]  text-gray-500 m-2 cursor-pointer hover:text-red-600"
                                  onClick={() => {
                                    moreTerm.remove(index);
                                    toast.warn("Term Card Deleted !", {
                                      position: "top-right",
                                      pauseOnFocusLoss: false,
                                    });
                                  }}
                                />
                              )}
                              {/* its an Edit button for edit a term  */}
                              {values.term.length <= 1 ? null : (
                                <label htmlFor={`term.${index}.term_Name`}>
                                  <BiEdit className="text-[1.8em] text-gray-500 m-2 cursor-pointer hover:text-yellow-600" />
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                    {/*                  */}
                    <div
                      className="inline-block mt-4 mb-6 font-bold text-blue-700 cursor-pointer mx-7"
                      onClick={() => addMoreTermS(values, moreTerm)}
                    >
                      + Add More
                    </div>
                  </div>
                )}
              ></FieldArray>
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateFlashCard;
