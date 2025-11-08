const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 1. Deploy $GEM Token (100,000 supply)
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy(100000);
  await rewardToken.waitForDeployment();
  console.log("RewardToken ($GEM):", await rewardToken.getAddress());

  // 2. Deploy Tweets contract
  const Tweets = await hre.ethers.getContractFactory("Tweets");
  const tweets = await Tweets.deploy(await rewardToken.getAddress());
  await tweets.waitForDeployment();
  console.log("Tweets Contract:", await tweets.getAddress());

  // 3. Transfer 50,000 GEM to Tweets contract for rewards
  await rewardToken.transfer(await tweets.getAddress(), ethers.parseEther("50000"));
  console.log("Transferred 50,000 GEM to Tweets contract");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});