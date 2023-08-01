import { FaDollarSign } from "react-icons/fa"
import styled, { css } from "styled-components"

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-font-900);

  ${(props) =>
    props.type === "medium" &&
    css`
      justify-content: center;
      font-size: 5.2rem;
    `}

  ${(props) =>
    props.type === "small" &&
    css`
      gap: 0.2rem;

      & svg {
        width: 3.6rem;
        height: 3.6rem;
      }
    `}
`

export default function Logo({ type }) {
  return (
    <StyledLogo type={type}>
      <FaDollarSign />
      <p>finapp</p>
    </StyledLogo>
  )
}
