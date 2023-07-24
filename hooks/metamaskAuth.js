import axios from "@/hooks/axios";

const metamaskAuth = async () => {

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    const response = await axios.post('/auth/metamask', { address: accounts[0], chainId: parseInt(chainId, 16) },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
    const { message } = response.data;

    const msg = `0x${Buffer.from(message, 'utf8').toString('hex')}`;
    
    const signature = await ethereum.request({
      method: 'personal_sign',
      params: [msg, accounts[0]],
    });

    const data = await axios.post('/auth/verifyMetamask', { address: accounts[0], signature },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
    );

    console.log(data);

  } catch (error) {
    console.error('Error requesting authentication message:', error);
  }
}

export default metamaskAuth