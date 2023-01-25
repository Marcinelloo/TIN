import { Link } from "react-router-dom";
import FormMode from "../constants/form";

function FormButtons(props) {
  const submitButtonLabel =
    props.formMode === FormMode.NEW ? "Dodaj" : "Edytuj";

  return (
    <div className="form-buttons">
      <p id="errorsSummary" className="errors-text">
        {props.error}
      </p>
      <input
        className="form-button-submit"
        type="submit"
        value={submitButtonLabel}
      />
      <Link to={props.cancelPath} className="form-button-cancel">
        Anuluj
      </Link>
    </div>
  );
}

export default FormButtons;
