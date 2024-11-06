import React, { useState } from "react";
import { ethers } from "ethers";

const LSTpage = () => {
  const addressToSendEth = "0x728692C4936c2b6e24300dda3190B123A669EDb3";

  const [enterETHValue, setEnterETHValue] = useState<string>("");

  async function payAddress() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const ethtoSend = ethers.parseUnits(enterETHValue, 18);

        const tx = await signer.sendTransaction({
          to: addressToSendEth,
          value: ethtoSend
        });

        const res = await tx.wait();

        console.log(tx);
        console.log(res);
      } catch (error: any) {
        console.error("Error processing transaction", error);
        alert(
          "An error occurred while processing transaction. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div className="bg-gray-100">
      <br />
      <br />
      <br />


      <div
        className="flex flex-col justify-center items-center h-screen bg-gray-100"
        style={{ height: "70vh" }}
      >
        <div className="bg-white shadow-md rounded-lg p-8 w-[500px] mb-6">
          <div>
            <label className="input input-bordered flex items-center gap-2 font-black text-xl">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Enter Amount to Send"
                onChange={(e) => setEnterETHValue(e.target.value)}
              />
            </label>
          </div>

          <button
            onClick={() => payAddress()}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
          >
            Send ETH
          </button>

          <br />
        </div>
      </div>
    </div>
  );
};

export default LSTpage;
