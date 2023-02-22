//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TokenSwap {
    using SafeMath for uint256;

    IERC20 public token1;
    IERC20 public token2;
    AggregatorV3Interface internal priceFeed;

    constructor(IERC20 _token1, IERC20 _token2, address _priceFeedAddress) {
        token1 = _token1;
        token2 = _token2;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function getLatestPrice() public view returns (uint256) {
        (, int price, , ,) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function swap(uint256 amount) public {
        uint256 token2Amount = amount.mul(getLatestPrice()).div(10 ** priceFeed.decimals());

        require(token1.balanceOf(msg.sender) >= amount, "Insufficient balance of token1");
        require(token2.balanceOf(address(this)) >= token2Amount, "Insufficient balance of token2");

        token1.transferFrom(msg.sender, address(this), amount);
        token2.transfer(msg.sender, token2Amount);
    }
}