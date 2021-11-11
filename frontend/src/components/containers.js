import "./containers.css";
import donut from "../images/donut.png"

export const ErrorMessage = ({ message }) => {
    if (!message) return null;
  
    return (
      <div className="alert-error">
        <span>🚫 {message}</span>
      </div>
    );
  }

export const Modal = (props) => {
  if (!props.show) return null;

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <p className="modal-title">{props.title}</p>
        </div>
        <div className="modal-body" >{props.children}</div>
        {props.button !== "" ? 
          <div className="modal-footer">
            <button className="button" onClick={props.onClose}>{props.button}</button>
          </div>
          : null }
      </div>
    </div>
  )
}

export const Connect = () => {
  return (
    <div className="centered">
      <h3>Please Connect Your Wallet</h3>
      <img className="loader" src={donut } alt="loading..." />
    </div>
  )
}

export const Greeting = (props) => {
  return(
    <div className="centered">
      {/* {props.user !== "" ? <h2>Welcome, u/{props.user}. <br />Pick your favorite Donut flavor!</h2> : <h2>Select your preferred Donut flavor.</h2> } */}
      {props.user !== "" ? <h2>Welcome, u/{props.user}. <br />Pick your favorite Donut flavor!</h2> : <h2>Select your preferred Donut flavor.</h2> }
    </div>
  )
}

export const Disclaimer = () => {
  return(
    <div className="centered">
      <div className="light-background">
          <div className="disclaimer-title">Distribution Chain Info</div>
          <div className="disclaimer-body">Change of the distribution chain will take effect for the next distribution period. 
              Please be aware that if you choose to receive your rewards on the Ethereum mainnet, you will be required to pay gas fees for claiming, which
              can be quite high right now!</div>
      </div>
    </div>
  )
}
  