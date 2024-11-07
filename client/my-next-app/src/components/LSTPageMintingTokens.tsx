import React, { useState } from "react";
import { ethers } from "ethers";
import TokenMintRightContext from "./Walkthrough/TokenMintRightContext";

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
          value: ethtoSend,
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
    <div className="">
      <div className="flex bg-gray-100">
        {/* Left Side Panel */}
        <div className="w-1/2 bg-slate-400 flex flex-col items-center justify-center max-h-[1010px]">
          <div className="bg-white shadow-md rounded-lg p-8 mb-6 w-[500px]">
            <div>
              <label className="input input-bordered flex items-center gap-2 font-black text-xl my-4">
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
          </div>

          <br />
          <br />

          {/* Steps list below the input box but outside the white box */}
          <div className="flex justify-center text-center text-white font-medium mx-5 bg-slate-700 py-6 rounded-xl w-[400px] h-[130px]">
            <ul className="steps text-xl">
              <li className="step step-success">
                <a className="text-white hover:text-green-400" href="./lstpage">
                  Mint Tokens
                </a>
              </li>
              <li className="step step-secondary">
                <a
                  className="text-white hover:text-pink-400"
                  href="./lstpagetokenburn"
                >
                  Get Yield Back
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-slate-600 max-h-[1010px]">
          <div className="rounded-lg p-8 mb-6 w-[500px]">
            <TokenMintRightContext />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LSTpage;
