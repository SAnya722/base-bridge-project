document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById("connectWallet");
    const walletAddressDisplay = document.getElementById("walletAddress");
    const transferForm = document.getElementById("transferForm");
    const transferButton = document.getElementById("transferButton");
    const transactionStatus = document.getElementById("transactionStatus");

    let provider, signer;

    // Подключение кошелька Metamask
    connectWalletButton.addEventListener("click", async () => {
        if (window.ethereum) {
            try {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                signer = provider.getSigner();
                const address = await signer.getAddress();
                walletAddressDisplay.textContent = `Connected: ${address}`;
                transferForm.style.display = "block";
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert('Please install Metamask!');
        }
    });

    // Функция для перевода активов
    transferButton.addEventListener("click", async () => {
        const asset = document.getElementById("asset").value;
        const amount = document.getElementById("amount").value;

        if (!amount || amount <= 0) {
            alert("Enter a valid amount");
            return;
        }

        try {
            // Пример транзакции для перевода ETH в Base L2 через мост
            const tx = await signer.sendTransaction({
                to: "АДРЕС_МОСТА",  // Тут указывается адрес смарт-контракта моста
                value: ethers.utils.parseEther(amount), // Переводим сумму в wei
                gasLimit: 21000,
            });

            transactionStatus.textContent = `Transaction sent: ${tx.hash}`;
            await tx.wait();
            transactionStatus.textContent = "Transaction confirmed!";
        } catch (error) {
            console.error("Error sending transaction:", error);
            transactionStatus.textContent = "Transaction failed!";
        }
    });
});
