"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addRow, updateRow } from "@/_redux/slices/tableSlice";
import { useEffect, useState } from "react";

const validationSchema = Yup.object({
  taxYear: Yup.number()
    .required("Tax Year is required")
    .min(1900, "Enter a valid year"),
  company: Yup.string().required("Company is required"),
  state: Yup.string().required("State is required"),
  assessor: Yup.string().required("Assessor is required"),
  accountNumber: Yup.string().required("Account Number is required"),
  deadline: Yup.string().required("Deadline is required"),
  status: Yup.string().required("Status is required"),
  appealedDate: Yup.string().required("Appealed Date is required"),
  appealedBy: Yup.string().required("Appealed By is required"),
});

type AppealedFormProps = {
  isEdit?: boolean;
  formdata?: {
    id?: number;
    taxYear?: number;
    company?: string;
    state?: string;
    assessor?: string;
    accountNumber?: string;
    deadline?: string;
    status?: string;
    appealedDate?: string;
    appealedBy?: string;
  };
  onClose?: () => void;
};

export default function AppealedForm({
  isEdit = false,
  formdata,
  onClose,
}: AppealedFormProps) {
  console.log(formdata, " formdata in AppealedForm");
  const [initialValues, setInitialValues] = useState({
    id: formdata?.id || Date.now(),
    taxYear: formdata?.taxYear || new Date().getFullYear(),
    company: formdata?.company || "",
    state: formdata?.state || "",
    assessor: formdata?.assessor || "",
    accountNumber: formdata?.accountNumber || "",
    deadline: formdata?.deadline || "",
    status: formdata?.status || "",
    appealedDate: formdata?.appealedDate || "",
    appealedBy: formdata?.appealedBy || "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && formdata) {
      setInitialValues({
        id: formdata.id || Date.now(),
        taxYear: formdata.taxYear || new Date().getFullYear(),
        company: formdata.company || "",
        state: formdata.state || "",
        assessor: formdata.assessor || "",
        accountNumber: formdata.accountNumber || "",
        deadline: formdata.deadline || "",
        status: formdata.status || "",
        appealedDate: formdata.appealedDate || "",
        appealedBy: formdata.appealedBy || "",
      });
    }
  }, [isEdit, formdata]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        if (isEdit) {
          dispatch(updateRow(values));
          if (onClose) onClose();
        } else {
          values.id = Date.now();
          dispatch(addRow(values));
        }
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Tax Year",
                name: "taxYear",
                type: "number",
                placeholder: "Enter tax year",
              },
              {
                label: "Company",
                name: "company",
                type: "text",
                placeholder: "Enter company name",
              },
              {
                label: "State",
                name: "state",
                type: "text",
                placeholder: "Enter state",
              },
              {
                label: "Assessor",
                name: "assessor",
                type: "text",
                placeholder: "Enter assessor",
              },
              {
                label: "Account Number",
                name: "accountNumber",
                type: "text",
                placeholder: "Enter account number",
              },
              {
                label: "Appealed By",
                name: "appealedBy",
                type: "text",
                placeholder: "Enter name of person who appealed",
              },
            ].map(({ label, name, type, placeholder }) => (
              <div className="mb-1" key={name}>
                <label
                  htmlFor={name}
                  className="block text-gray-700 font-bold mb-2"
                >
                  {label}
                </label>
                <Field
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            ))}

            {/* Deadline */}
            <div className="mb-4">
              <label
                htmlFor="deadline"
                className="block text-gray-700 font-bold mb-2"
              >
                Deadline
              </label>
              <Field name="deadline">
                {({ field }: import("formik").FieldProps) => (
                  <input
                    {...field}
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                )}
              </Field>
              <ErrorMessage
                name="deadline"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 font-bold mb-2"
              >
                Status
              </label>
              <Field
                as="select"
                name="status"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select status</option>
                <option value="Sent">Sent</option>
                <option value="Not Sent">Not Sent</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Appealed Date */}
            <div className="mb-4">
              <label
                htmlFor="appealedDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Appealed Date
              </label>
              <Field name="appealedDate">
                {({ field }: import("formik").FieldProps) => (
                  <input
                    {...field}
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                )}
              </Field>
              <ErrorMessage
                name="appealedDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
