import React, { useState } from "react";
import { ethers } from "ethers";
import { useDonuts } from "./useDonuts";
import { formatEther } from "@ethersproject/units";
import { shortNum } from "./utils";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import './WalletInfo.css';

const ConnectYourWalletButton = ({ connect }) => {
  return (
    <div className="nav"> 
      <div className="wallet"> 
        <span className="connect-btn" onClick={ connect }>Connect Wallet</span>
      </div>
    </div>
  )
}

const ConnetToWeb3 = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (typeof window.ethereum !== 'undefined') {       
        let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        let signer = await provider.getSigner();
        let network = await provider.getNetwork();
        let address = await signer.getAddress();

      return {
        provider,
        signer,
        network,
        address
      }
    }
    } catch (error) {
      if (error.code === 4001) {
      }
    }
  }
};

const WalletDetails = ({ address, donuts }) => {
  const shorthand = address.substring(0,6) + '...' + address.substring(address.length - 4);

  return (
    <div className="nav">
      <div className="wallet">
        <div className="donut-bal">{ shortNum(donuts) }  🍩</div>
        <div className="address-container">
          <div className="short-address">{ shorthand }</div>
          <div className="jazz-icon"><Jazzicon diameter={18} seed={jsNumberForAddress(address)} /></div>
        </div>
      </div>
  </div>
  )
};

export default function WalletInfo(props) {
  const [ address, setAddress ] = useState({});
  const [ provider, setProvider ] = useState({});
  const [ network, setNetwork ] = useState({});
  const [ active, setActive ] = useState(false);
  const [ donutBalance, setDonutBalance ] = useState();
  
  const handleConnect = async () => {
    const active = await ConnetToWeb3();

    if (active) {
      setProvider(active.provider);
      setAddress(active.address);
      setNetwork(active.network);
      setActive(true);
      props.onConnect(true);
    } else {
      setActive(false);
    }
  }

  useDonuts(active, provider, address, network).then((result)=>{ setDonutBalance(formatEther(result.donutBalance.toString())) });  
  
  return (
    <div>
      { !active ? <ConnectYourWalletButton connect={handleConnect} /> : <WalletDetails address={ address } donuts={ donutBalance } /> }
    </div>
  )

};
