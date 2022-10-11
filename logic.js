//Step 0. Metamask
const connect = document.querySelector(".connect");
connect.addEventListener("click",async() => {
getAccount();
const account = await provider.send("eth_requestAccounts", []);
connect.innerHTML = account;
console.log("STEP 0")
console.log('Wallet Connected:',account[0])
});

//Step 1 Add Link
const add = document.querySelector(".add");
add.addEventListener("click", async()=> {
      ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0x07c725d58437504ca5f814ae406e70e21c5e8e9e',
            symbol: 'LINK',
            decimals: 18,
            image: 'https://dynamic-assets.coinbase.com/37ef8491789cea02a81cf80394ed3a4b5d9c408a969fd6bea76b403e04e7fd9cef623384d16a60f3c39e052006bc79522d902108764ce584466674a4da6cb316/asset_icons/c551d7b5ffe48f1d72e726ab8932ad98758ab414062e5e07479096089c547220.png',
          },
        },
      })
        .then((success) => {
          if (success) {
            console.log("STEP 1")
            console.log('LINK-AAVE successfully added to wallet!')
          } else {
            throw new Error('Something went wrong.')
          }
        })
        .catch(console.error)
});
//Step 2. Get LINK-AAVE from website
const site = document.querySelector('.site');
site.addEventListener('click', ()=>{
  console.log('STEP 2');
  console.log('Getting LINK-AAVE from website');
})
let accounts = [];
//Step 3. Transaction Link to Contract
const send = document.querySelector('.send');
const fund = document.querySelector('.fund')
send.addEventListener("click", async ()=> {
// Connect to the contract
var contractAddress = "0x07c725d58437504ca5f814ae406e70e21c5e8e9e";
var contractAbiFragment = [
   {
      "name" : "transfer",
      "type" : "function",
      "inputs" : [
         {
            "name" : "_to",
            "type" : "address"
         },
         {
            "type" : "uint256",
            "name" : "_tokens"
         }
      ],
      "constant" : false,
      "outputs" : [],
      "payable" : false
   }
];
var contract = new ethers.Contract(contractAddress, contractAbiFragment, signer);

// How many tokens?
var numberOfDecimals = 18;
var numberOfTokens = ethers.utils.parseUnits('1.0', numberOfDecimals);

// Send tokens
contract.transfer("0xDc9500688C6e29218d0688886e3bB4429963F7ca", 1000000000000000000n).then(function(tx) {
    console.log(tx);
    fund.innerHTML=JSON.stringify(tx);
    fund.style.display = "inline";
});
 console.log("STEP 3")
 console.log("Send LINK-AAVE to FlashLoan contract")
});


async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}

