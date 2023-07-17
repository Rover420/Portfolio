import api from "@/hooks/axios"

const metamaskAuth = async () => {

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    const response = await api.post('/metamask', { address: accounts[0], chainId: parseInt(chainId, 16) },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    const { message } = response.data;

    console.log(message)

    const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
    
    const signature = await ethereum.request({
      method: 'personal_sign',
      params: [msg, accounts[0]],
    });
    

    console.log(signature)

  } catch (error) {
    console.error('Error requesting authentication message:', error);
  }
}

export default metamaskAuth