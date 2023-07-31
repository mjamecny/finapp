import styled from "styled-components"
import { FaGithub } from "react-icons/fa"

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: #f8f9fa;
  font-size: 1.2rem;

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    color: #f8f9fa;
  }
`

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <StyledFooter>
      <a href="https://github.com/mjamecny/finapp">
        <FaGithub />
      </a>
      <p>&copy; {currentYear} finapp</p>
    </StyledFooter>
  )
}
