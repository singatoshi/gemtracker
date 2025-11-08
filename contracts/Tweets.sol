// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Tweets {
    struct Tweet {
        address author;
        string text;
        uint256 timestamp;
        uint256 id;
    }

    Tweet[] public tweets;
    mapping(uint256 => uint256) public likes; // tweetId => likes count

    event NewTweet(
        uint256 indexed id,
        address indexed author,
        string text,
        uint256 timestamp
    );
    event Liked(uint256 indexed id, address indexed liker, uint256 totalLikes);

    function postTweet(string calldata text) external {
        require(bytes(content).length <= 280, "Tweet too long");
        require(bytes(content).length > 0, "Empty tweet");

        uint256 tweetId = totalTweets++;
        tweets[tweetId] = Tweet({
            author: msg.sender,
            content: content,
            timestamp: block.timestamp,
            likes: 0
        });

        // Reward author for posting
        require(rewardToken.transfer(msg.sender, POST_REWARD), "Reward failed");

        emit TweetPosted(tweetId, msg.sender, content, block.timestamp);
    }

    function likeTweet(
        uint256 id,
        address rewardToken,
        uint256 rewardAmount
    ) external {
        require(id < tweets.length, "Invalid tweet id");
        likes[id] += 1;
        // send reward if rewardAmount >= 0
        if (rewardAmount > 0 && rewardToken != address(0)) {
            IERC20(rewardToken).transferFrom(
                msg.sender,
                tweets[id].author,
                rewardAmount
            );
        }
        emit Liked(id, msg.sender, likes[id]);
    }

    function getTweetCount() external view returns (uint256) {
        return tweets.length;
    }

    function getTweet() external view returns (address post) {
        return tweets;
    }

    function getTweet(
        uint256 id
    )
        external
        view
        returns (
            address author,
            string memory text,
            uint256 timestamp,
            uint256 likeCount
        )
    {
        require(id < tweets.length, "Invalid tweet id");
        Tweet storage t = tweets[id];
        return (t.author, t.text, t.timestamp, likes[id]);
    }
}
