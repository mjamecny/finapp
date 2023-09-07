import { BsBank2 } from "react-icons/bs"
import { FaBitcoin, FaMoneyBillWaveAlt } from "react-icons/fa"
import { css, styled } from "styled-components"

const StyledAccountIcon = styled.div`
  color: currentColor;

  & svg {
    ${(props) =>
      props.size === "small" &&
      css`
        width: 2rem;
        height: 2rem;
      `}
    ${(props) =>
      props.size === "medium" &&
      css`
        width: 3.7rem;
        height: 3.7rem;
      `}

    ${(props) =>
      props.size === "big" &&
      css`
        width: 5rem;
        height: 5rem;
      `}
  }

  ${(props) =>
    props.colored &&
    props.type === "Bitcoin" &&
    css`
      color: #fdb600;
    `}

  ${(props) =>
    props.colored &&
    props.type === "Cash" &&
    css`
      color: #23c246;
    `}

  ${(props) =>
    props.colored &&
    props.type === "Bank" &&
    css`
      color: #f8fd00;
    `}
`

export default function AccountIcon({ type, colored, size }) {
  if (type === "Bitcoin") {
    return (
      <StyledAccountIcon type={type} colored={colored} size={size}>
        <FaBitcoin />
      </StyledAccountIcon>
    )
  }
  if (type === "Cash") {
    return (
      <StyledAccountIcon type={type} colored={colored} size={size}>
        <FaMoneyBillWaveAlt />
      </StyledAccountIcon>
    )
  }
  if (type === "Bank") {
    return (
      <StyledAccountIcon type={type} colored={colored} size={size}>
        <BsBank2 />
      </StyledAccountIcon>
    )
  }
}
