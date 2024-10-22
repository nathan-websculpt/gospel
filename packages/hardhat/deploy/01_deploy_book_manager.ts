import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "BookManager" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployBookManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  //const owner = "0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350"; //PROD WALLET
  const owner = "0xf0ADAE0823444d70Eb5826F3C26b3704611c759A"; //todo: PRODTODO:: change to fe wallet

  await deploy("BookManager", {
    from: deployer,
    args: [0, "cloneable blank", owner],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
    gasPrice: 371463905,
  });

  // Get the deployed contract to interact with it after deploying.
  const bookManager = await hre.ethers.getContract<Contract>("BookManager", deployer);
  console.log("\n 👋👋 deployed BookManager at address:", await bookManager.getAddress());
};

export default deployBookManager;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags BookManager
deployBookManager.tags = ["BookManager"];
