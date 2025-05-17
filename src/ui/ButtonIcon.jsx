import styled from "styled-components"

const ButtonIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  outline-offset: 6px;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-font-900);
  }
`

export default ButtonIcon
