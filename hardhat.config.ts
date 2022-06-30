import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import { HardhatUserConfig } from "hardhat/config";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//     solidity: "0.8.9",
//   };

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: { // network when `yarn hardhat node` runs
      chainId: 31337
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
}

export default config