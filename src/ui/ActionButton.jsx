import { AiOutlineClose } from "react-icons/ai"
import { FaPen } from "react-icons/fa"
import { css, styled } from "styled-components"

const StyledActionButton = styled.span`
  ${(props) =>
    props.size === "small" &&
    css`
      padding: 0.4rem;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      padding: 0.8rem;

      & svg {
        width: 1.8rem;
        height: 1.8rem;
      }
    `}
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-font-900);
  color: var(--color-grey-back-900);
  cursor: pointer;
`

export default function ActionButton({ type, onClick, size }) {
  if (type === "delete") {
    return (
      <StyledActionButton size={size}>
        <AiOutlineClose onClick={onClick} />
      </StyledActionButton>
    )
  }

  if (type === "edit") {
    return (
      <StyledActionButton size={size}>
        <FaPen onClick={onClick} />
      </StyledActionButton>
    )
  }
}
