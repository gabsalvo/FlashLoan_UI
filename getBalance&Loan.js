
const contract_ABI= [
    'function getBalance(address _tokenAddress) external view returns (uint256)',
    `function requestFlashLoan(address _token, uint256 _amount)`
]
const get = document.querySelector('.get');
const request = document.querySelector('.request');
const scan = document.querySelector('.scan');

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const flash_contract = new ethers.Contract( "0xDc9500688C6e29218d0688886e3bB4429963F7ca" , contract_ABI , signer );
//STEP 4
get.addEventListener("click", async()=> {
    const balance = await flash_contract.getBalance("0x07c725d58437504ca5f814ae406e70e21c5e8e9e");
    const format_balance = ethers.utils.formatEther( balance )
    get.innerHTML = `${format_balance} LINK`;
    console.log('STEP 4')
    console.log('Get balance of contracts of FlashLoan')
});
//STEP 5
request.addEventListener("click", async()=> {
    const flash = await flash_contract.requestFlashLoan("0x07c725d58437504ca5f814ae406e70e21c5e8e9e", 100000000000000);
    console.log('Transaction hash for calling FlashLoans:',flash.hash);
    scan.href=`https://goerli.etherscan.io/tx/${flash.hash}`
    scan.style.display = "inline";
    console.log('STEP 5')
    console.log('Requesting FlashLoan')
})