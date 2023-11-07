export function Button({
  className: classNameProp,
  as: asProp,
  disabled,
  ...extra
}) {
  const Component = asProp || "button";
  return (
    <Component
      className={["Button", disabled && "Button-disabled", classNameProp]
        .filter(Boolean)
        .join(" ")}
      {...extra}
    />
  );
}
