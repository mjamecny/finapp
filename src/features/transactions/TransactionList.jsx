import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FaArrowRight, FaPlus } from "react-icons/fa6"

import Transaction from "./Transaction"
import Empty from "../../ui/Empty"
import Heading from "../../ui/Heading"

const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1;

  ${(props) =>
    props.type === "page" &&
    css`
      height: 45rem;
      overflow-y: scroll;
    `}
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`
const ActionButton = styled(Link)`
  color: var(--color-grey-font-900);
`

export default function TransactionList({ transactions, type }) {
  const { t } = useTranslation()

  if (!transactions?.length)
    return (
      <Empty
        type={type}
        message={t("empty.transactions")}
        buttonLabel={t("empty.add_transaction")}
        path="/transaction/add"
      />
    )

  return (
    <StyledTransactions type={type}>
      {type !== "page" && (
        <Header>
          <Heading as="h2">{t("transaction_list.header_transactions")}</Heading>
          <ActionButtonsContainer>
            <ActionButton to="/transaction/add">
              <FaPlus />
            </ActionButton>
            <ActionButton to="/transactions">
              <FaArrowRight />
            </ActionButton>
          </ActionButtonsContainer>
        </Header>
      )}
      {transactions?.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </StyledTransactions>
  )
}
