import { useSearchParams } from "react-router-dom"
import styled, { css } from "styled-components"

const StyledFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
`

const FilterButton = styled.button`
  background-color: transparent;
  color: #f8f9fa;
  padding: 0.8rem 1.2rem;
  border: 1px solid #f8f9fa;
  border-radius: 7px;
  font-weight: bold;
  cursor: pointer;
  align-self: center;

  ${(props) =>
    props.active &&
    css`
      background-color: #495057;
    `}
`

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentFilter = searchParams.get(filterField) || options.at(0).value

  function handleClick(value) {
    searchParams.set(filterField, value)
    setSearchParams(searchParams)
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={currentFilter === option.value}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  )
}
