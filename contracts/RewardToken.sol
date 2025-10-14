// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("SocialFi Token", "SFT") {
        _mint(msg.sender, initialSupply);
    }

    function faucet(address to, uint256 amount) external {
        // simple faucet for testnets; only owner can mint in this simple implementation
        _mint(to, amount);
    }
}
