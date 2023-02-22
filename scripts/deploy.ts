import { ethers } from "hardhat";

async function main() {
    const  [owner, acct1, acct2, acct3] = await ethers.getSigners();

    const testDAI = await ethers.getContractFactory("TestnetDAI");

    const testDaiDeploy = await testDAI.deploy();
    await testDaiDeploy.deployed();


    const daiContract = testDaiDeploy.address;
    console.log(`Dai deployed to ${daiContract}`);



    const testLINK = await ethers.getContractFactory("TestnetLink");

    const testLinkDeploy = await testLINK.deploy();
    await testLinkDeploy.deployed();


    const linkContract = testLinkDeploy.address;
    console.log(`Link deployed to ${linkContract}`);

    const linkPriceFeed = "0x48731cF7e84dc94C5f84577882c14Be11a5B7456";

    const tokenSwap = await ethers.getContractFactory("TokenSwap");
    const tokenSwapDeploy = await tokenSwap.deploy(linkContract, daiContract, linkPriceFeed);

    await tokenSwapDeploy.deployed();
    const swapContract = tokenSwapDeploy.address;

    console.log(`Token swap contract has been deployed to ${swapContract}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
