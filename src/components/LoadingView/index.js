import Loader from 'react-loader-spinner'
import './index.css'

const LoadingView = () => (
  <div className="loader-container">
    <Loader type="TailSpin" color="#4094EF" height={40} width={30} />
  </div>
)
export default LoadingView
