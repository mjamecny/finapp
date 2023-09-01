import styled, { css } from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  FaBitcoin,
  FaMoneyBillWaveAlt,
  FaPen,
  FaRedo,
  FaTheaterMasks,
  FaHome,
  FaFish,
  FaMedkit,
  FaMoneyBill,
  FaGift,
  FaCat,
  FaCar,
  FaBus,
  FaBook,
  FaQuestion,
  FaHotjar,
} from "react-icons/fa"
import { BsBank2 } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"

import { convertToDDMonthTime } from "../utils/helpers"
import { useUser } from "../features/authentication/useUser"
import { useTransactions } from "../features/transactions/useTransactions"
import { useDeleteTransaction } from "../features/transactions/useDeleteTransaction"

import Heading from "../ui/Heading"
import SpinnerMini from "../ui/SpinnerMini"
import ButtonBack from "../ui/ButtonBack"

const StyledTransactionDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
`

const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--color-grey-font-900);
  height: 300px;
  border-radius: 7px;
  padding: 1.2rem 1.6rem;
`

const DetailsItems = styled.div`
  width: 24rem;
  margin-top: 2.4rem;
  font-size: 1.4rem;
`

const AccountIcon = styled.div`
  & svg {
    width: 5rem;
    height: 5rem;
  }
  ${(props) =>
    props.type === "Bitcoin" &&
    css`
      color: #fdb600;
    `}

  ${(props) =>
    props.type === "Cash" &&
    css`
      color: #23c246;
    `}

  ${(props) =>
    props.type === "Bank" &&
    css`
      color: #f8fd00;
    `}
`

const Amount = styled.p`
  font-size: 2.4rem;
  margin-top: 0.8rem;
  ${(props) =>
    props.type === "withdraw" &&
    css`
      color: red;
    `}
  ${(props) =>
    props.type === "deposit" &&
    css`
      color: green;
    `}
`

const Description = styled.p`
  font-size: 2rem;
`

const ButtonIcon = styled.span`
  & svg {
    width: 2rem;
    height: 2rem;
  }
`

export default function TransactionDetail() {
  const { t } = useTranslation()
  const categories = [
    { value: "home", label: t("category.home"), icon: <FaHome /> },
    {
      value: "food",
      label: t("category.food"),
      icon: <FaFish />,
    },
    {
      value: "entertainment",
      label: t("category.entertainment"),
      icon: <FaTheaterMasks />,
    },
    { value: "health", label: t("category.health"), icon: <FaMedkit /> },
    { value: "salary", label: t("category.salary"), icon: <FaMoneyBill /> },
    { value: "gift", label: t("category.gift"), icon: <FaGift /> },
    { value: "pets", label: t("category.pets"), icon: <FaCat /> },
    { value: "car", label: t("category.car"), icon: <FaCar /> },
    { value: "transport", label: t("category.transport"), icon: <FaBus /> },
    { value: "study", label: t("category.study"), icon: <FaBook /> },
    {
      value: "subscription",
      label: t("category.subscription"),
      icon: <FaRedo />,
    },
    { value: "utilities", label: t("category.utilities"), icon: <FaHotjar /> },
    { value: "other", label: t("category.other"), icon: <FaQuestion /> },
  ]
  const { transactionId } = useParams()
  const id = Number(transactionId)

  const { user } = useUser()
  const userCurrency = user?.user_metadata?.currency

  const { transactions } = useTransactions()
  const { isDeleting, deleteTransaction } = useDeleteTransaction()

  const filteredTransaction = transactions?.find(
    (transaction) => transaction.id === id
  )

  const navigate = useNavigate()

  return (
    <StyledTransactionDetail>
      <Heading as="h2">{t("transaction_details.header")}</Heading>
      {filteredTransaction && (
        <DetailsBox>
          {filteredTransaction.type === "Bitcoin" && (
            <AccountIcon type="Bitcoin">
              <FaBitcoin />
            </AccountIcon>
          )}
          {filteredTransaction.type === "Cash" && (
            <AccountIcon type="Cash">
              <FaMoneyBillWaveAlt />
            </AccountIcon>
          )}
          {filteredTransaction.type === "Bank" && (
            <AccountIcon type="Bank">
              <BsBank2 />
            </AccountIcon>
          )}
          {filteredTransaction.amount < 0 ? (
            <Amount type="withdraw">
              {filteredTransaction.type === "Bitcoin"
                ? Math.abs(filteredTransaction.amount)
                : `${Math.abs(filteredTransaction.amount)} ${
                    (userCurrency === "usd" && "USD") ||
                    (userCurrency === "czech-republic-koruna" && "CZK") ||
                    (userCurrency === "eur" && "EUR")
                  }`}
            </Amount>
          ) : (
            <Amount type="deposit">
              {filteredTransaction.type === "Bitcoin"
                ? filteredTransaction.amount
                : `${filteredTransaction.amount} ${
                    (userCurrency === "usd" && "USD") ||
                    (userCurrency === "czech-republic-koruna" && "CZK") ||
                    (userCurrency === "eur" && "EUR")
                  }`}
            </Amount>
          )}

          <Description>{filteredTransaction.decrypted_description}</Description>

          <DetailsItems>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--color-grey-font-900)",
                padding: "0.6rem 0.4rem",
              }}
            >
              <p>{t("transaction_details.created_label")}</p>
              <p>{convertToDDMonthTime(filteredTransaction.created_at)}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--color-grey-font-900)",
                padding: "0.6rem 0.4rem",
              }}
            >
              <p>{t("transaction_details.category_label")}</p>
              <p style={{ display: "flex", gap: "0.4rem" }}>
                {categories.map((category, i) => {
                  if (category.value === filteredTransaction.category) {
                    return category.icon
                  }
                })}
                <span>
                  {categories.map((category, i) => {
                    if (category.value === filteredTransaction.category) {
                      return category.label
                    }
                  })}
                </span>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--color-grey-font-900)",
                padding: "0.6rem 0.4rem",
              }}
            >
              <p>{t("transaction_details.to_label")}</p>
              <p>{filteredTransaction.decrypted_to}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.8rem",
                padding: "1.2rem 1.6rem",
              }}
            >
              <ButtonIcon
                onClick={() =>
                  navigate(`/transaction/${filteredTransaction.id}/edit`)
                }
              >
                <FaPen />
              </ButtonIcon>
              {isDeleting ? (
                <SpinnerMini />
              ) : (
                <ButtonIcon
                  onClick={() => {
                    deleteTransaction(filteredTransaction.id)
                    navigate(-1)
                  }}
                >
                  <AiOutlineClose />
                </ButtonIcon>
              )}
            </div>
          </DetailsItems>
        </DetailsBox>
      )}

      <ButtonBack />
    </StyledTransactionDetail>
  )
}
