import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

//PRODTODO: Remove

/**
 * Deploys a contract named "BookManager" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployBooks: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // const { deployer } = await hre.getNamedAccounts();
  // const bookDeployer = await hre.ethers.getContract<Contract>("BookDeployer", deployer);
  // console.log("\n\n 📚📚📚  deploying Books from factory address:", await bookDeployer.getAddress());
  // console.log("\n");

  // // Deploy Books
  // await bookDeployer.deployBook(40, "Matthew");
  // await bookDeployer.deployBook(41, "Mark");
  // await bookDeployer.deployBook(42, "Luke");
  // await bookDeployer.deployBook(43, "John");
  // await bookDeployer.deployBook(44, "Acts");
};

export default deployBooks;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags BookManager
deployBooks.tags = ["deployBooks"];
