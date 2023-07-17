export default function Button({ onClick, children, disabled }) {
  return (
    <button disabled={disabled} className="btn" onClick={onClick}>
      {children}
    </button>
  )
}
