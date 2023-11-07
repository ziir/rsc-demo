export function Loader({ className = "" }) {
  return (
    <>
      <img src="/logo.svg" alt="" className={`Loader-img ${className}`} />
      <br />
      <span>Loading...</span>
    </>
  );
}
