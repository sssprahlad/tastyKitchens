import {Component} from 'react'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'
import './index.css'

class Counter extends Component {
  state = {activeCount: 1}

  onDecrement = () => {
    const {activeCount} = this.state
    const {decreaseItems} = this.props
    if (activeCount > 1) {
      this.setState(prevState => ({activeCount: prevState.activeCount - 1}))
      decreaseItems()
    }
  }

  onIncrement = () => {
    const {increaseItems} = this.props
    const {activeCount} = this.state
    if (activeCount < 4) {
      this.setState(prevState => ({activeCount: prevState.activeCount + 1}))
      increaseItems()
    }
  }

  render() {
    const {activeCount} = this.state
    return (
      <div className="convert">
        <div className="greater-container">
          <button
            type="button"
            onClick={this.onDecrement}
            className="greater-icon"
            data-testid="pagination-left-button"
          >
            <FaLessThan className="icon" />
          </button>
          <p>
            <span data-testid="active-page-number">{activeCount}</span> of 4
          </p>
          <button
            type="button"
            onClick={this.onIncrement}
            className="greater-icon"
            data-testid="pagination-right-button"
          >
            <FaGreaterThan className="icon" />
          </button>
        </div>
      </div>
    )
  }
}

export default Counter
