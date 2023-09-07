import styled, { css } from "styled-components"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { convertToDDMonthTime, getCurrency } from "../utils/helpers"
import { useUser } from "../features/authentication/useUser"
import { useDeleteTransaction } from "../features/transactions/useDeleteTransaction"
import { useTransaction } from "../features/transactions/useTransaction"
import useCategories from "../hooks/useCategories"

import Heading from "../ui/Heading"
import SpinnerMini from "../ui/SpinnerMini"
import ButtonBack from "../ui/ButtonBack"
import Spinner from "../ui/Spinner"
import AccountIcon from "../ui/AccountIcon"
import ActionButton from "../ui/ActionButton"
import CategoryIcon from "../ui/CategoryIcon"

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
  border-radius: 7px;
  padding: 1.2rem 1.6rem;
`

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  margin-top: 2.4rem;
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const DetailLabel = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
`

const DetailInfo = styled.p`
  font-size: 1.4rem;
`

const Amount = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
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

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 1.6rem;
`

export default function TransactionDetail() {
  const { t } = useTranslation()
  const categories = useCategories()
  const { user } = useUser()
  const userCurrency = user?.user_metadata?.currency
  const { isDeleting, deleteTransaction } = useDeleteTransaction()
  const { transaction, isLoading } = useTransaction()
  const navigate = useNavigate()

  const currencyLabel = getCurrency(userCurrency)

  if (isLoading) return <Spinner />

  const {
    amount,
    type,
    decrypted_description,
    created_at,
    category: categoryName,
    id,
    decrypted_to,
  } = transaction

  return (
    <StyledTransactionDetail>
      <Heading as="h2">{t("transaction_details.header")}</Heading>
      <DetailsBox>
        <AccountIcon type={type} size="big" colored={true} />
        {amount < 0 ? (
          <Amount type="withdraw">
            {type === "Bitcoin"
              ? Math.abs(amount)
              : `${Math.abs(amount)} ${currencyLabel}`}
          </Amount>
        ) : (
          <Amount type="deposit">
            {type === "Bitcoin" ? amount : `${amount} ${currencyLabel}`}
          </Amount>
        )}

        <Description>{decrypted_description}</Description>

        <DetailsContainer>
          <DetailContainer>
            <DetailLabel>{t("transaction_details.created_label")}</DetailLabel>
            <DetailInfo>{convertToDDMonthTime(created_at)}</DetailInfo>
          </DetailContainer>
          <DetailContainer>
            <DetailLabel>{t("transaction_details.category_label")}</DetailLabel>
            <DetailInfo>
              <p style={{ display: "flex", gap: "0.4rem" }}>
                <CategoryIcon category={categoryName} />
                <span>
                  {categories.map((category, i) => {
                    if (category.value === categoryName) {
                      return category.label
                    }
                  })}
                </span>
              </p>
            </DetailInfo>
          </DetailContainer>
          <DetailContainer>
            <DetailLabel>{t("transaction_details.to_label")}</DetailLabel>
            <DetailInfo>{decrypted_to}</DetailInfo>
          </DetailContainer>
        </DetailsContainer>
        <ActionContainer>
          <ActionButton
            type="edit"
            size="medium"
            onClick={() => navigate(`/transaction/${id}/edit`)}
          />
          {isDeleting ? (
            <SpinnerMini />
          ) : (
            <ActionButton
              type="delete"
              size="medium"
              onClick={() => {
                deleteTransaction(id)
                navigate(-1)
              }}
            />
          )}
        </ActionContainer>
      </DetailsBox>
      <ButtonBack />
    </StyledTransactionDetail>
  )
}
