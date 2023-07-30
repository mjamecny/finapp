import styled, { css } from "styled-components"

const StyledEmpty = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #f8f9fa;
  flex: 1;
`

export default function Empty({ resourceName }) {
  return <StyledEmpty>No {resourceName} could be found.</StyledEmpty>
}
