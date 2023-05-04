import Loader from 'react-loader-spinner'

import './index.css'

const Loading = props => {
  const {testValue} = props
  return (
    <div data-testid={testValue} className="home-new-loader">
      <Loader type="TailSpin" height="30px" width="30px" color="#F7931E" />
      <p className="loading-text">Loading...</p>
    </div>
  )
}

export default Loading
