import styled, { css } from "styled-components"

const StyledFormRow = styled.div`
  display: flex;
  gap: 0.8rem;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: flex-start;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}
`

const Label = styled.label`
  color: #f8f9fa;
  text-transform: uppercase;
  font-weight: 500;
`
StyledFormRow.defaultProps = { type: "vertical" }

export default function FormRow({ type, label, children }) {
  return (
    <StyledFormRow type={type}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
    </StyledFormRow>
  )
}
