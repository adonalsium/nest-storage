import React from 'react';
import ReactDOM from 'react-dom';
import { default as Web3} from 'web3';
import { default as TruffleContract} from 'truffle-contract';
import { default as TruffleHDWallet} from 'truffle-hdwallet-provider';
import ProtectedEthContainerArtifacts from "../../build/contracts/ProtectedEthContainer.json";
import '../stylesheets/index.css';

const mnemonic = "baccarat cuticula sodomy copperas furthest armorer clear didymium count eclosion scrunch firedog";

function convertStringToArrayBufferView(str) {
    var bytes = new Uint8Array(str.length);
    for (var iii = 0; iii < str.length; iii++){
        bytes[iii] = str.charCodeAt(iii);
    }
    return bytes;
}

function convertArrayBufferViewtoString(buffer){
    var str = "";
    for (var iii = 0; iii < buffer.byteLength; iii++){
        str += String.fromCharCode(buffer[iii]);
    }
    return str;
}

class Account extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      balance : 0,
      provider: new TruffleHDWallet(mnemonic, "https://rinkeby.infura.io/v3/0f456a90ed1e44068ae25defcec99b03"),
      cryptoKey : null
    }

    this.web3 = new Web3(this.state.provider);
    //this.ethContainer = TruffleContract(ProtectedEthContainerArtifacts);
    //this.ethContainer.setProvider(web3.currentProvider);
  }
  
  componentWillMount(){
    const password = 'humayun23king';
    const pwUtf8 = convertStringToArrayBufferView(password);
    console.log(password);
    window.crypto.subtle.digest({name: 'SHA-256'}, pwUtf8).then((pwHash) => {
      console.log(pwHash);
      return window.crypto.subtle.importKey("raw", pwHash, {name: 'AES-CBC'}, false, ['encrypt', 'decrypt'])
    }).then((key) => {
      console.log(key);
      this.cyptoKey = key;
    }).catch((err) => {
      console.log(err);
    });
  }


  render() {
    return (
      <div className="game-info">
        {this.web3.eth.accounts._provider.addresses[0]}
        {this.state.cryptoKey}
      </div>
    );
  }

}
  
  // ========================================
  
  ReactDOM.render(
    <Account />,
    document.getElementById('root')
  );