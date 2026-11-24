import { Fragment, type ReactNode } from "react";

/* The name is typed Lïef and is never shown in all caps (brand engine, spelling
   rule). Inside a line styled in capitals, this keeps the name in its own case
   while the rest of the line stays in capitals. */
export function keepCase(text: string): ReactNode {
  return text
    .split(/(Lïef)/)
    .filter(Boolean)
    .map((part, i) =>
      part === "Lïef" ? (
        <span key={i} style={{ textTransform: "none" }}>Lïef</span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}
