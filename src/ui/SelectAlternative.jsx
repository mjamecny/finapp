import styled from "styled-components"

const StyledSelect = styled.select`
  font-size: 1.6rem;
  padding: 0.8rem;
  text-align: center;
  border: 1px solid var(--color-grey-font-900);
  border-radius: 4px;

  & option {
    text-align: center;
  }
`

export default function Select({ accounts, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {accounts.map((account) => (
        <option key={account.id} value={account.id}>
          {account.type}
        </option>
      ))}
    </StyledSelect>
  )
}
