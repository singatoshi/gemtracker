// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("SocialFi Token", "SFT") {
        _mint(msg.sender, initialSupply);
    }

    function faucet(address to, uint256 amount) external nonReentrant {
        require(to != address(0), "Invalid address");
        require(amount <= MAX_FAUCET_AMOUNT, "Exceeds max faucet amount");
        require(
            block.timestamp >= lastFaucetTime[to] + COOLDOWN,
            "Cooldown active"
        );
    }
}
