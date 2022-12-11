import './index.css'

const SomethingWentWrong = props => {
  const {retryFunction} = props
  const onClickTryAgain = () => {
    retryFunction()
  }
  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666114660/Instagram%20Clone/Group_7522-something-wrong_j6dyks.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="home-page-button"
        onClick={onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )
}

export default SomethingWentWrong
