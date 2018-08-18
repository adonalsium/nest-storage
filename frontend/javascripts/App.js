import React from 'react';
import ReactDOM from 'react-dom';
import { default as Web3} from 'web3';
import { default as TruffleContract} from 'truffle-contract';
import { default as TruffleHDWallet} from 'truffle-hdwallet-provider';
import '../stylesheets/index.css';

import ProtectedEthContainerArtifact from "../../build/contracts/ProtectedEthContainer.json";
import NestStorageArtifact from "../../build/contracts/NestStorage.json";

const ProtectedEthContainer = TruffleContract(ProtectedEthContainerArtifact);
const NestStorage = TruffleContract(NestStorageArtifact);
// Nest Storage: 0x4d3a5902807dd8c6d776833e3711f16ae14099ed

const mnemonic = "baccarat cuticula sodomy copperas furthest armorer clear didymium count eclosion scrunch firedog";

const WEI_TO_ETHER = 1/1000000000000000000;

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
      console.log(str);
    }
    return str;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nestStorageInstance : null,
    }
    this.provider = new TruffleHDWallet(mnemonic, "https://rinkeby.infura.io/v3/0f456a90ed1e44068ae25defcec99b03");
    this.web3 = new Web3(this.provider);

  }

  componentWillMount(){
    NestStorage.setProvider(this.web3.currentProvider);
    NestStorage.deployed().then((nestStorageInstance) => {
      this.setState({
        nestStorageInstance: nestStorageInstance,
      });
    });
  }


  //Come back to this
  render() {
    if(this.state.nestStorageInstance){
      return (
        <Account
          web3={this.web3}
          nestStorageInstance={this.state.nestStorageInstance}
        />
      );
    } else {
      return (
        <div className="Loading"> 
          <h1>Loading muthaFucka(camal case muthaFucka)</h1>
        </div>
      );
    } 
  }
  
}

class Account extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      containers : []
    }
  }

  componentWillMount(){
    let addresses;
    this.getEthContainerAddresses()
      .then((ethContainerAddresses) => {
        addresses = ethContainerAddresses;
        return this.getBalances(ethContainerAddresses);
      })
      .then((balances) => {

        let containers = [];
        for(let i = 0; i < addresses.length; i++){
          containers.push({
            address: addresses[i],
            balance: balances[i],
          });
        }
        this.setState({
          containers: containers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getEthContainerAddresses(){
    const ethContainerAddresses = await this.props.nestStorageInstance.getContainersForUser(this.props.web3.eth.accounts._provider.addresses[0]);
    console.log(ethContainerAddresses);
    return ethContainerAddresses;
  }

  async getBalances(ethContainerAddresses){
    let balances = [];
    for(let i = 0; i < ethContainerAddresses.length; i++){
      let balance = await this.props.web3.eth.getBalance(ethContainerAddresses[i]);
      balances.push(balance);
    }
    return balances;
  }

  render(){
    return (
      <div className="Account">
        <h1 className="header"> My name is: {this.props.web3.eth.accounts._provider.addresses[0]}</h1>
        <BalanceTable
          containers = {this.state.containers}
        />
      </div>
    );
  }

}

function BalanceTable(props){
  let table = []
    let headers = []
    headers.push(<th key = 'address'>Address</th>);
    headers.push(<th key = 'balance'>Balanace</th>);
    table.push(<tr key = 'headers'>{headers}</tr>);
    for (let j = 0; j < props.containers.length; j++){
      let row = []

      let address = props.containers[j].address;
      let balance = props.containers[j].balance * WEI_TO_ETHER;
      row.push(<td key={address.toString()}>{`${address}`}</td>);
      row.push(<td key={address.toString() + balance.toString()}>{`${balance}`} ether</td>)

      table.push(<tr key = {address.toString()}>{row}</tr>);
    }

    return (
      <div className="account-table">
      <table>
        <tbody>
          {table}
        </tbody>
      </table>
      <button>button</button>
      </div>
    );
}
  
  
  // ========================================
  
ReactDOM.render(
  <App />,
  document.getElementById('root')
);