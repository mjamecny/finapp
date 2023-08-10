import styled from "styled-components"
import Button from "./Button"
import { useNavigate } from "react-router-dom"

const StyledEmpty = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  font-size: 2rem;
  color: #f8f9fa;
  flex: 1;
`

export default function Empty({ type, resourceName, buttonLabel, path }) {
  const navigate = useNavigate()
  return (
    <StyledEmpty>
      No {resourceName} could be found.
      {type !== "page" && (
        <Button onClick={() => navigate(path)}>{buttonLabel}</Button>
      )}
    </StyledEmpty>
  )
}
