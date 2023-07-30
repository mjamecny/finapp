import styled from "styled-components"

const StyledSelect = styled.select`
  font-size: 1.5rem;
  padding: 0.7rem;
  text-align: center;
  border: 1px solid #000;
  border-radius: 4px;
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
