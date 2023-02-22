// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestnetDAI is ERC20 {
    constructor() ERC20("Testnet DAI", "tDAI") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount * 1e18);
    }
}
