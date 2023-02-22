import { ethers } from "hardhat";

async function main() {

    const [owner, acct1, acct2] = await ethers.getSigners()

    const linkContract = "0xE6356d076157cABEd3e86554838c1D42af1bAc02";
    const DaiAddr = "0x799307c7B6A2522b8edd19F9E241006eDd95393d";
    const swapContract = "0x79f4E3F18E29789e7Efe7358605820b38932c477";
    const swapper = "0x35064FAcBD34C7cf71C7726E7c9F23e4650eCA10"
    const amountTomint = await ethers.utils.parseEther("1000000");
   
   

    const testLink = await ethers.getContractAt("tokenInterface", linkContract);
    const testDAI = await ethers.getContractAt("tokenInterface", DaiAddr);
    
    const DAIBlance = await testDAI.balanceOf(swapContract);
    console.log(`DAI balance in the contract is ${DAIBlance}`);

    await testDAI.connect(owner).mint(swapContract, amountTomint);


    const DAIBlanceAfter = await testDAI.balanceOf(swapContract);
    console.log(`DAI balance in the contract is AFter mint is ${DAIBlanceAfter}`);

    //mint Link to the sender
    const linkBalance = await testLink.balanceOf(swapper);
    console.log(`Link balance in the swapper account is ${linkBalance}`);

    await testLink.connect(owner).mint(swapper, amountTomint);

    const linkBalanceAfter = await testLink.balanceOf(swapper);
    console.log(`Link balance in the swapper account After minting is ${linkBalanceAfter}`);



    



    //Dai deployed to 0x799307c7B6A2522b8edd19F9E241006eDd95393d
    //Link deployed to 0xE6356d076157cABEd3e86554838c1D42af1bAc02
    //Token swap contract has been deployed to 0x79f4E3F18E29789e7Efe7358605820b38932c477

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});