export function StatusAlert({ children, className: classNameProp }) {
  return (
    <p className={["StatusAlert", classNameProp].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}
