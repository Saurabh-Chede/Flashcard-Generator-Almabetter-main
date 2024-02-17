import * as Yup from "yup";

const validationSchema = Yup.object({
  group_Name: Yup.string()

    .min(3, "Group name must have minimum 3 characters")
    .max(25, "Group name must have maximum 25 characters")
    .required("Required!"),

  group_Des: Yup.string()
    .min(30, "Group Description must have minimum 30 characters")
    .max(450, "Group Description have maximum 450 characters")
    .required("Required!"),

  term: Yup.array(
    Yup.object({
      term_Name: Yup.string()
        .min(3, "Term name must have minimum 3 characters")
        .max(25, "Term name must have maximum 25 characters")
        .required("Required!"),

      term_Define: Yup.string()

        .min(30, "Term Description must have minimum 30 characters")
        .max(450, "Term Description allow maximum 450 characters")
        .required("Required!"),
    })
  ),
});

export default validationSchema;
