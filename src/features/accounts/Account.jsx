import { FaBitcoin, FaMoneyBillWaveAlt } from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import { useDeleteAccount } from "./useDeleteAccount"
import styled, { css } from "styled-components"
import SpinnerMini from "../../ui/SpinnerMini"

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 1rem;
  height: 15rem;
  background-color: #fdb600;
  color: #495057;
  border-radius: 2rem;

  & svg {
    width: 3.7rem;
    height: 3.7rem;
  }

  ${(props) =>
    props.type === "Bitcoin" &&
    css`
      background-color: #fdb600;
    `}

  ${(props) =>
    props.type === "Cash" &&
    css`
      background-color: #23c246;
    `}

  ${(props) =>
    props.type === "Bank" &&
    css`
      background-color: #f8fd00;
    `}

    .close-button {
    position: absolute;
    right: 10px;
    top: 7px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 7px;

  & svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
`

const Amount = styled.p`
  font-size: 2.4rem;
`

export default function Account({ account, convertedBtcPrice }) {
  const { isDeleting, deleteAccount } = useDeleteAccount()
  const convertedAmount = account.balance * convertedBtcPrice

  return (
    <StyledAccount type={account.type}>
      <CloseButton>
        {isDeleting ? (
          <SpinnerMini />
        ) : (
          <AiOutlineClose onClick={() => deleteAccount(account.id)} />
        )}
      </CloseButton>

      {account.type === "Bitcoin" && <FaBitcoin />}
      {account.type === "Cash" && <FaMoneyBillWaveAlt />}
      {account.type === "Bank" && <BsBank2 />}
      <Amount>
        {!convertedAmount ? (
          <SpinnerMini />
        ) : account.type === "Bitcoin" ? (
          `${Math.round(account.balance * convertedBtcPrice).toLocaleString(
            "cs-CZ"
          )} CZK`
        ) : (
          `${Math.round(account.balance).toLocaleString("cs-CZ")} CZK`
        )}
      </Amount>
      {account.type === "Bitcoin" && <p>{account.balance}</p>}
    </StyledAccount>
  )
}
