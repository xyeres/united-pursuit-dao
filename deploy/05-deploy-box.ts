import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat";

const deployBox: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("deploying box")
  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
  })

  const timeLock = await ethers.getContract("TimeLock")
  const boxContract = await ethers.getContractAt("Box", box.address)
  const transferOwnerTx = await boxContract.transferOwnership(
    timeLock.address
  )
  await transferOwnerTx.wait(1)

}

export default deployBox;
