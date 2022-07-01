import * as fs from 'fs';
import { ethers, network } from 'hardhat';
import { developmentChains, proposalsFile, VOTING_PERIOD } from '../hardhat-helper-config';
import { moveBlocks } from '../utils/move-blocks';

const index = 0

async function main(proposalIndex: number) {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  // You could swap this out for the ID you want to use too
  const proposalId = proposals[network.config.chainId!][proposalIndex]
  // 0 = Against, 1 = For, 2 = Abstain for this example
  const voteWay = 1
  const reason = "I lika do da cha cha"
  await vote(proposalId, voteWay, reason)
}

// 0 = Against, 1 = For, 2 = Abstain for this example
export async function vote(proposalId: string, voteWay: number, reason: string) {
  console.log("Voting...")
  const governor = await ethers.getContract("GovernorContract")
  const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason)
  const voteTxReceipt = await voteTx.wait(1)
  console.log(voteTxReceipt.events[0].args.reason)
  const proposalState = await governor.state(proposalId)
  console.log(`Current Proposal State: ${proposalState}`)
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1)
  }
}
main(index).then(() => process.exit(0)).catch((err) => {
  console.error(err)
  process.exit(1)
})