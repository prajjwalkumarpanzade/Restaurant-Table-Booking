import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import "../container/BookAdminTable.css";

interface Slot {
  slot_id: number;
  start_time: string;
  end_time: string;
  table_id: number[];
}

const BookTableForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    contactno: "",
    number: 1,
    date: new Date().toISOString().split("T")[0],
    slot: "",
    table: 0,
  });

  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get<Slot[]>("http://localhost:8080/getslots", {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      });
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.dark("An error occurred while fetching slots. Please try again.");
    }
  };

  return (
    <div>
      <div className="book-table-form">
        <h1>Book Table</h1>
        <Formik
          initialValues={formData}
          validationSchema={Yup.object({
            Name: Yup.string().required("Name is required"),
            contactno: Yup.string().required("Contact Number is required"),
            number: Yup.number().min(1, "Number of Persons must be at least 1").required("Number of Persons is required"),
            date: Yup.date().min(new Date().toISOString().split("T")[0], "Date must be today or later").required("Date is required"),
            slot: Yup.string().required("Slot is required"),
            table: Yup.number().min(1, "Table is required").required("Table is required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const selectedSlot = slots.find((slot) => slot.slot_id === parseInt(values.slot));

              if (!selectedSlot || !selectedSlot.table_id.includes(values.table)) {
                toast.dark("The selected table is not available for this slot.");
                return;
              }

              await axios.post("http://localhost:8080/bookings", {
                customer_name: values.Name,
                contact_no: values.contactno,
                date: values.date,
                slot_id: parseInt(values.slot),
                table_id: values.table,
              }, {
                headers: {
                  "Authorization": localStorage.getItem("token"),
                },
              });

              toast.dark("Table booked successfully!");
              resetForm();
            } catch (error) {
              console.error("Error booking table:", error);
              toast.dark("An error occurred while booking the table. Please try again.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field type="text" name="Name" placeholder="Name" />
                <ErrorMessage name="Name" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field type="tel" name="contactno" placeholder="Contact Number" />
                <ErrorMessage name="contactno" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field type="number" name="number" placeholder="Number of Persons" />
                <ErrorMessage name="number" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Choose Date:</label>
                <br />
                <br />
                <Field type="date" name="date" />
                <ErrorMessage name="date" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field as="select" name="slot">
                  <option value="">Select a slot</option>
                  {slots.map((slot) => (
                    <option key={slot.slot_id} value={slot.slot_id}>
                      {slot.start_time} - {slot.end_time}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="slot" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field as="select" name="table">
                  <option value={0}>Select a table</option>
                  <Field name="slot">
                    {({ field, form }: FieldProps<any>) => (
                      <>
                        {field.value && slots.find((slot) => slot.slot_id === parseInt(field.value))?.table_id.map((table) => (
                          <option key={table} value={table}>
                            Table {table}
                          </option>
                        ))}
                      </>
                    )}
                  </Field>
                  <ErrorMessage name="table" component="div" className="error" />
                </Field>
              </div>
              <button type="submit" disabled={isSubmitting}>Book</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookTableForm;
