export function Link({ to, disabled, className, ...extra }) {
  return (
    <a
      is="a-route"
      href={to}
      class={["Link", className]
        .filter(Boolean)
        .join(" ")}
      {...extra}
    />
  );
}
