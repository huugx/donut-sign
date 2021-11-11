import { Contract } from "@ethersproject/contracts";
import chains from "./contracts/chains.json";
import abis from "./contracts/abis";

export const useDonuts = async ( active, provider, address, network ) => {
  let donutBalance = 0;
  if (!active) return { donutBalance };

  let contract = new Contract(chains[network.chainId].donut, abis.IERC20, provider);
  donutBalance = (await contract.balanceOf(address));
  
  return { donutBalance }
}

// import React, { useState, useEffect, useContext, createContext } from "react";
// import { Contract } from "@ethersproject/contracts";
// import { Zero } from "@ethersproject/constants";
// import chains from "./contracts/chains.json";
// import abis from "./contracts/abis";

// const donutContext = createContext();

// export function UseDonutsProvider({ web3React, children }){
//   const donuts = useProvideDonuts(web3React);
//   return <donutContext.Provider value={donuts}>{children}</donutContext.Provider>;
// }

// export const useDonuts = () => {
//   return useContext(donutContext);
// };

// function useProvideDonuts({account, active, library, chainId}){
//   const [signer, setSigner] = useState(null);
//   const [feeBalance, setFeeBalance] = useState(Zero);
//   const [donutBalance, setDonutBalance] = useState(Zero);
//   const [token, setToken] = useState(null);
//   const [tipping, setTipping] = useState(null);

//   useEffect(() => {
//     if(!active) { setSigner(null); setFeeBalance(Zero); setDonutBalance(Zero); setToken(null); setTipping(null); return; }
//     setSigner(library.getSigner())
//     const token = new Contract(chains[chainId.toString()].donut, abis.IERC20, library);
//     setToken(token);
//     setTipping(tipping);
//     async function getBalance(account){
//       setFeeBalance(await library.getBalance(account));
//       setDonutBalance(await token.balanceOf(account));
//     }
//     account && getBalance(account);
//   }, [active, chainId])

//   return {
//     signer,
//     feeBalance,
//     donutBalance,
//     token
//   };
// }