import styled from "styled-components"

const Input = styled.input`
  font-size: 1.6rem;
  padding: 0.8rem;
  text-align: center;
  border: 1px solid var(--color-grey-font-900);
  border-radius: 4px;
  outline-offset: 6px;

  &:disabled {
    background-color: var(--input-background);
    color: #ced4da;
  }
`

export default Input
