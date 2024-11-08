import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const ABI = ["function mint(address, uint256)", "function burn(uint256)"];
const providers = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY || "", providers);
const contract = new ethers.Contract(CONTRACT_ADDRESS || "", ABI, wallet);

const VAULT = "0x728692C4936c2b6e24300dda3190B123A669EDb3";

const processedTransactions = new Set<string>();

app.post("/alchemy", async (req, res) => {
  const eventData = req.body.event;
  if (!eventData || !eventData.activity) {
    res.status(400).json({ error: "Invalid data format" });
    return;
  }

  const incomingTxs = eventData.activity.find(
    (x: any) => x.toAddress.toLowerCase() === VAULT.toLowerCase()
  );

  if (!incomingTxs) {
    res.json({ message: "No transactions for the specified vault address" });
    return;
  }

  const txHash = incomingTxs.hash;
  if (processedTransactions.has(txHash)) {
    res.json({ message: "Transaction already processed" });
    return;
  }

  processedTransactions.add(txHash);

  const fromAddress = incomingTxs.fromAddress;
  const valueToMint = ethers.parseUnits(incomingTxs.value.toString(), 18);
  const valueToBurn = ethers.parseUnits(incomingTxs.value.toString(), 18);

  if (incomingTxs.asset === "ETH") {
    async function mintTokens() {
      try {
        const tx = await contract.mint(fromAddress, valueToMint);
        await tx.wait();
        console.log("Tokens minted:", tx.hash);
        res.json({ message: "Mint successful", txHash: tx.hash });
      } catch (error) {
        console.error("Minting failed:", error);
        res.status(500).json({ error: "Minting failed" });
      }
    }
    await mintTokens();
  } else {
    async function burnTokens() {
      try {
        const tx = await contract.burn(valueToBurn);
        await tx.wait();
        console.log("Tokens burned:", tx.hash);

        // Send Ether back to the sender
        const tx2 = await wallet.sendTransaction({
          to: fromAddress,
          value: ethers.parseEther(incomingTxs.value.toString()),
        });
        await tx2.wait();

        res.json({
          message: "Token burn successful and Ether sent",
          burnTxHash: tx.hash,
          sendTxHash: tx2.hash,
        });
      } catch (error) {
        console.error("Token Burn or Ether Send Failed", error);
        res.status(500).json({ error: "Token Burn or Ether Send Failed" });
      }
    }
    await burnTokens();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
