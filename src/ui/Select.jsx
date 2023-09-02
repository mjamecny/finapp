import React from "react"
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

// export default function Select({ options, value, onChange, ...props }) {
//   return (
//     <StyledSelect value={value} onChange={onChange} {...props}>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </StyledSelect>
//   )
// }

export const Select = React.forwardRef(
  ({ options, onChange, onBlur, name }, ref) => (
    <StyledSelect name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
)
