function FormInput(props) {
  const className = props.error === "" ? "" : "error-input";
  const name = props.name;
  const errorSpanId = "error" + name[0].toUpperCase() + name.slice(1);

  return (
    <>
      <label htmlFor={props.name}>
        {props.label}:{props.required && <span className="required">*</span>}
      </label>
      <select
        name={props.name}
        id={props.name}
        className={className}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            label={option.label}
          ></option>
        ))}
      </select>
      <span id={errorSpanId} className="errors-text">
        {props.error}
      </span>
    </>
  );
}

export default FormInput;
