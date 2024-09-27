import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "BookDeployer" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployBookDeployer: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  //const owner = "0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350"; //PROD WALLET
  const owner = "0xf0ADAE0823444d70Eb5826F3C26b3704611c759A"; //todo change to fe wallet

  await deploy("BookDeployer", {
    from: deployer,
    // Contract constructor arguments
    args: [owner],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
    // gasPrice: 15010,
  });

  // Get the deployed contract to interact with it after deploying.
  const bookDeployer = await hre.ethers.getContract<Contract>("BookDeployer", deployer);
  console.log("👋 deployed BookDeployer at address:", await bookDeployer.getAddress());

  // Deploy Books
  let matt = await bookDeployer.deployBook(40, "Matthew");
  await bookDeployer.deployBook(41, "Mark");
  await bookDeployer.deployBook(42, "Luke");
  await bookDeployer.deployBook(43, "John");
  await bookDeployer.deployBook(44, "Acts");
};

export default deployBookDeployer;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags BookDeployer
deployBookDeployer.tags = ["BookDeployer"];
