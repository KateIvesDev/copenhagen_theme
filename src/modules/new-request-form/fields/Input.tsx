import {
  Field as GardenField,
  Hint,
  Input as GardenInput,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import type { Field } from "../data-types";

interface InputProps {
  field: Field;
  onChange: (value: string) => void;
}

export function Input({ field, onChange }: InputProps): JSX.Element {
  const { label, error, value, name, required, description, type } = field;
  const stepProp: { step?: string } = {};
  const inputType =
    type === "integer" || type === "decimal" ? "number" : "text";

  if (type === "integer") stepProp.step = "1";
  if (type === "decimal") stepProp.step = "any";

  return (
    <GardenField>
      <Label>{label}</Label>
      {description && <Hint>{description}</Hint>}
      <GardenInput
        name={name}
        type={inputType}
        defaultValue={value as string}
        validation={error ? "error" : undefined}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        {...stepProp}
      />
      {error && <Message validation="error">{error}</Message>}
    </GardenField>
  );
}
