import Account from "./Account"

export default function AccountList({ state, dispatch, convertedBtcPrice }) {
  return (
    <div className="account-list">
      {state.length === 0 ? (
        <p className="no-content">No accounts available</p>
      ) : (
        state.map((account) => (
          <Account
            key={account.type}
            dispatch={dispatch}
            account={account}
            convertedBtcPrice={convertedBtcPrice}
          />
        ))
      )}
    </div>
  )
}
