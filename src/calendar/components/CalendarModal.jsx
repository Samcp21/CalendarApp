import { addHours } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  useEffect(() => {
    if (activeEvent !== null) setFormValues({ ...activeEvent });
  }, [activeEvent]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.trim().length < 2 ? "is-invalid" : "";
  }, [formValues.title, formSubmitted]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async (event) => {
    console.log("onSubmit");
    console.log("formValues", formValues);
    event.preventDefault();
    setFormSubmitted(true);
    const difference = formValues.end - formValues.start;
    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la fecha inicio",
        "error"
      );
      return;
    }
    if (formValues.title.trim().length < 2 || formValues.title.length <= 0) {
      Swal.fire("Error", "El titulo es obligatorio", "error");
      return;
    }
    await startSavingEvent(formValues);
    onCloseModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            className="form-control"
            dateFormat="Pp"
            selected={formValues.start}
            onChange={(event) => {
              onDateChanged(event, "start");
            }}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>
        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            className="form-control"
            dateFormat="Pp"
            selected={formValues.end}
            onChange={(event) => {
              onDateChanged(event, "end");
            }}
            placeholder="Fecha inicio"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
