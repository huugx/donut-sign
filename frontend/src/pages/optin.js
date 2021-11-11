import React from "react";
import { ethers } from "ethers";
import { ErrorMessage, Modal, Greeting, Disclaimer } from "../components/containers";
import axios from "axios";
import { SignMessage, VerifyMessage } from "../components/wallet/signature";
import { ToggleSwitch } from "../components/toggleswitch";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
console.log(axios.defaults.baseURL);

class Optin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMetamaskConnected: false,
            isAddressNew: true,
            isSigning: false,
            successSign: false,
            
            active: false,
            provider: "",
            signer: "",
            message: "",
            currentAddress: "",
            prevAddress: "",
            network: 0,
            signature: "",
            error: "",
            value: "ethereum",
            user: [],
            username: "",
            optChain: null,
            toggle: false,
        };
    }

    async componentDidMount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (typeof window.ethereum !== 'undefined') {       
          let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
          let signer = await provider.getSigner();
          let network = await provider.getNetwork();
          let currentAddress = await signer.getAddress();
  
          this.setState({
              provider: provider,
              signer: signer,
              network: network.chainId,
              currentAddress: currentAddress
          });

          this.eventListeners();
          this.getUserData();
        }
    }

    getUserData = async () => {
        const config = { params: { address: this.state.currentAddress } };
        console.log()

        await axios.get('/api/user', config)
        .then((response) => {
            if(!response.data.length) {
                // console.log('no user found');
                this.setState({
                    isAddressNew: true
                })
            } else {
                const data = response.data;
                // console.log(data)
                this.setState({ 
                    user: data,
                    username: data[0].username,
                    optChain: data[0].chain,
                    isAddressNew: false
                });
            }
        }) .catch((err) => {
            console.log('Internal server error: ', err); 
        });
        this.getInitialState();
    }

    getInitialState = () => {
        if (this.state.optChain === 'xdai') {
            this.setState({ toggle: true });
        } else { 
            this.setState({ toggle: false });
        }
    }

    changeHandler = async (event) => {
        event.preventDefault();
        const isSigned = await this.handleSign(event);
        if (isSigned) {
            const isValid = await this.handleVerify(event);
            if (isValid) {
                this.setState({ isSigning: false });
                this.setState({ toggle: !this.state.toggle }, () => {
                    if (this.state.toggle === true) { 
                        this.setState({ value:'xdai' }, () => { this.postData() });
                    } else { 
                        this.setState({ value: 'ethereum' }, () => { this.postData() });
                    }
                });
        }}        
    }

    // Event Listeners
    eventListeners = async () => {
        window.ethereum.on('accountsChanged', (accounts) => {
            this.setState({ 
                currentAddress: accounts[0] 
            });
        });
      
        window.ethereum.on('chainChanged', (network) => {
            this.setState({
                network: parseInt(network)
            });
        });
    }


    // Sign and Verify
    handleSign = async (event) => {
        event.preventDefault();
        this.setState({ isSigning: true })
        this.setState({ error: null });

        const sig = await SignMessage({
            message: `Opting in to receive $DONUT 🍩 distributions on ${this.state.value}, please ensure this address matches the one used to register on /r/Ethtrader! ${"\n\n"} ${this.state.currentAddress}`
        });

        if (!sig.error) {
            console.log('Signature: ', sig);
            this.setState({
                message: sig.message,
                signature: sig.signature,
                error: null
            })
            return true;
        } else {
            if (4001) {
                this.setState({
                    error: "User denied message signature.",
                    isSigning: false
                });
            } else {
                this.setState({
                    error: sig.error,
                    isSigning: false
                });
            }
            return false;
        }
    }

    handleVerify = async () => {
        const isValid = await VerifyMessage({
            message: this.state.message,
            address: this.state.currentAddress,
            signature: this.state.signature
        })
        
        if (!isValid) return false;
        
        return true;
    }

    postData = async () => {
        const payload = {
            address: this.state.currentAddress,
            chain: this.state.value
        };

        axios({
            url: '/api/save',
            method: 'POST',
            data: payload
        })
        .then(() => {
            console.log(`Data sent to server! Opted-in to ${payload.chain}`);
            this.setState({ 
                successSign: true,
                isSigning: false,
            });
            this.getUserData();
        })
        .catch(() => {
            console.log('Internal server error!')
        });
    }

    render() {

        return (
            <div className="content">
                <div>
                    <Modal title="Setting Distribution Chain" button="" onClose={() => this.setState({ isSigning: false })} show={this.state.isSigning}>
                        <p>Prove ownership of address by accepting the signature request in your wallet.</p>
                    </Modal>
                    <Modal title="Success" button="OK" onClose={() => this.setState({ successSign: false })} show={this.state.successSign}>
                        <p>The distribution chain has been changed to {this.state.value} </p>
                    </Modal>
                </div>

                <Greeting user={this.state.username} />

                <ToggleSwitch checked={this.state.toggle} onChange={this.changeHandler} />
                
                <ErrorMessage message={this.state.error} />

                <Disclaimer />
            </div>
        );
    }
}

export default Optin;