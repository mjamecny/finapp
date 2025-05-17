import styled from "styled-components"

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);
  outline-offset: 6px;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: 5px;
    border: 1px solid var(--color-grey-font-900);
    color: var(--color-grey-font-900);
    background-color: var(--color-grey-back-900);
    cursor: pointer;
  }
`

export default FileInput
