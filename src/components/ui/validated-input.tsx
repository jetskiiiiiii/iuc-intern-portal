import { useState, useCallback } from "react";
import iuc_styles from "@/components/ui/iuc-intern-portal.module.css"

export default function ValidatedInput ({
  type,
  name,
  wasSubmitted,
  fieldSchema,
  errors,
  defaultValue,
  placeholder,
  pattern,
}: {
  type?: string,
  name?: string,
  wasSubmitted?: boolean,
  fieldSchema?: any,
  errors?: string[] | undefined,
  defaultValue?: string,
  placeholder?: string,
  pattern?: string,
}) {
  const [ value, setValue ] = useState<string>("")
  const [ touched, setTouched ] = useState<boolean>(false)

  const getErrors = useCallback(()=> {
    const validationResult = fieldSchema.safeParse(value)
    return validationResult.success
      ? [] 
      : validationResult.error.flatten().formErrors
  }, [fieldSchema, value])

  const fieldErrors = errors || getErrors()
  const shouldRenderErrors = wasSubmitted || touched || errors 

  const handleBlur = () => setTouched(true)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  return (
  <div className={iuc_styles["iuc-form-input-parent"]}>
    <input
      id={name}
      type={type}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={placeholder}
      className={`${iuc_styles["iuc-form-input"]}`}
      defaultValue={defaultValue}
      pattern={pattern}/>
    {shouldRenderErrors && (
      <span className={iuc_styles["iuc-form-input-error"]}>{fieldErrors[0]}</span>
    )}
  </div>
  )
}
