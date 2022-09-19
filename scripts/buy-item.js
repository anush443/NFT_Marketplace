const { ethers, network } = require("hardhat")
const { moveBlock } = require("../utils/move-blocks")

const TOKEN_ID = 0

async function buyItem() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")
    const listing = await nftMarketplace.getListings(basicNft.address, TOKEN_ID)
    const price = listing.price.toString()
    const tx = await nftMarketplace.buyItem(basicNft.address, TOKEN_ID, { value: price })
    await tx.wait(1)
    console.log(`Buying nft with ${TOKEN_ID} tokenId.....`)
    if (network.config.chainId == 31337) {
        moveBlock(2, (sleepAmount = 1000))
    }
}

buyItem()
    .then(() => proccess.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
