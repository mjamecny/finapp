import styled from "styled-components"

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  cursor: pointer;
  transition: all 0.2s;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-font-900);
  }
`

export default ButtonIcon
