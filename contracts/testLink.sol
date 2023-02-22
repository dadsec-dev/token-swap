// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestnetLink is ERC20 {
    constructor() ERC20("Testnet LINK", "tLINK") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount * 1e18);
    }
}
