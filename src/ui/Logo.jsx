import { FaDollarSign } from "react-icons/fa"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

const StyledLogo = styled.div`
  /* display: flex;
  align-items: center;
  color: var(--color-grey-font-900); */

  ${(props) =>
    props.type === "medium" &&
    css`
      font-size: 2.8rem;
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

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--color-grey-font-900);
  text-decoration: none;
`

export default function Logo({ type }) {
  return (
    <StyledLogo type={type}>
      <StyledLink to="/dashboard">
        <FaDollarSign />
        <p>finapp</p>
      </StyledLink>
    </StyledLogo>
  )
}
