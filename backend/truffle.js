/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
var mnemonic = "baccarat cuticula sodomy copperas furthest armorer clear didymium count eclosion scrunch firedog";
var HDWalletProvider = require("truffle-hdwallet-provider");
var path = require('path');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "../build/contracts"),

  networks: {
      development: {
          host: "127.0.0.1",
          port: 7545,
          network_id: "1" // Match any network id
      },
      rinkeby : {
        provider: function() {
          return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/0f456a90ed1e44068ae25defcec99b03");
        },
        network_id: "2", // Match any networkid
        gas: 4000000,
        gasPrice: 20000000000,
    }
  }
}
