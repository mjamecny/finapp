import styled, { css } from "styled-components"
import { useNavigate } from "react-router-dom"

import Transaction from "./Transaction"
import Empty from "../../ui/Empty"
import Button from "../../ui/Button"
import Heading from "../../ui/Heading"
import ButtonArrow from "../../ui/ButtonArrow"
import { useTranslation } from "react-i18next"

const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 1.6rem;
  flex: 1;

  ${(props) =>
    props.type === "page" &&
    css`
      height: 45rem;
      overflow-y: scroll;
    `}
`

export default function TransactionList({ transactions, type, userCurrency }) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (!transactions?.length)
    return (
      <Empty
        type={type}
        resourceName={t("empty.resource_label")}
        buttonLabel={t("empty.button_label")}
        path="/transaction/add"
      />
    )

  return (
    <StyledTransactions type={type}>
      {type !== "page" && (
        <Heading as="h2">{t("transaction_list.header_transactions")}</Heading>
      )}
      {transactions?.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          userCurrency={userCurrency}
        />
      ))}
      <Button onClick={() => navigate("/transaction/add")}>
        {t("transaction_list.add_button")}
      </Button>
      {type !== "page" && (
        <ButtonArrow to="/transactions">
          {t("transaction_list.all_transactions_button")}
        </ButtonArrow>
      )}
    </StyledTransactions>
  )
}
