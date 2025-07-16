import { createSafeActionClient } from "next-safe-action"

export const actionClient = createSafeActionClient({
  // By default all actions will return validation errors in the `flattened` shape.
  defaultValidationErrorsShape: "flattened",
})
