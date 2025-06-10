import { useState, useCallback } from "react";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"
import { ZodEffects, ZodString } from "zod";

export default function ValidatedInput ({
  type,
  name,
  wasSubmitted,
  fieldSchema,
  errors,
  defaultValue,
  placeholder,
}: {
  type: string,
  name: string,
  wasSubmitted: boolean,
  fieldSchema: ZodString | ZodEffects<ZodString, string, string>,
  errors: string[] | undefined,
  defaultValue: string,
  placeholder: string,
}) {
  const [ value, setValue ] = useState<string>(defaultValue)

  const getErrors = useCallback(() => {
    const validationResult = fieldSchema.safeParse(value)
    let errors : string[]
    if (validationResult.success) {
      errors = []
    } else {
      errors = validationResult?.error.flatten().formErrors
    }
    return errors
  }, [fieldSchema, value])

  let fieldErrors, shouldRenderErrors
  if (wasSubmitted) {
    fieldErrors = errors || getErrors()
    shouldRenderErrors = wasSubmitted || errors 
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
  <div className={iuc_styles["iuc-form-input-parent"]}>
    <input
      id={name}
      type={type}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      defaultValue={value}
      className={`${iuc_styles["iuc-form-input"]}`}
      />
    {shouldRenderErrors && (
      <span className={iuc_styles["iuc-form-input-error"]}>{(fieldErrors && fieldErrors[0])}</span>
    )}
  </div>
  )
}
