import { useTranslation } from "react-i18next"
import { css, styled } from "styled-components"

const StyledLocale = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  ${(props) =>
    props.type === "welcome" &&
    css`
      flex-direction: row;
      font-size: 2rem;
      gap: 1rem;
    `}
`

const LocaleItem = styled.p`
  cursor: pointer;
  font-weight: normal;
  ${(props) =>
    props.active &&
    css`
      font-weight: bold;
    `}
`

const locales = {
  en: { title: "EN" },
  cs: { title: "CZ" },
}

export default function Locale({ type }) {
  const { i18n } = useTranslation()
  return (
    <StyledLocale type={type}>
      {Object.keys(locales).map((locale) => (
        <div key={locale}>
          <LocaleItem
            active={i18n.resolvedLanguage === locale}
            type="submit"
            onClick={() => i18n.changeLanguage(locale)}
          >
            {locales[locale].title}
          </LocaleItem>
        </div>
      ))}
    </StyledLocale>
  )
}
