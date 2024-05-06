import { expect } from "chai";
import { ethers } from "hardhat";
import { John } from "../typechain-types";

describe("John", function () {
  // We define a fixture to reuse the same setup in every test.

  let john: John;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const johnFactory = await ethers.getContractFactory("John");
    john = (await johnFactory.deploy(owner.address)) as John;
    await john.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await john.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await john.setGreeting(newGreeting);
      expect(await john.greeting()).to.equal(newGreeting);
    });
  });
});
