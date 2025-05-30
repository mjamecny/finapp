import React from "react"
import styled from "styled-components"

const StyledSelect = styled.select`
  font-size: 1.6rem;
  padding: 0.8rem;
  text-align: center;
  border: 1px solid var(--color-grey-font-900);
  border-radius: 4px;
  outline-offset: 6px;

  & option {
    text-align: center;
  }
`

export const SelectAlternative = React.forwardRef(
  ({ accounts, onChange, onBlur, name }, ref) => (
    <StyledSelect name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      {accounts.map((account) => (
        <option key={account.id} value={account.id}>
          {account.type}
        </option>
      ))}
    </StyledSelect>
  )
)
