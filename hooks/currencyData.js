export const currencies = [
    {name: 'United States Dollar', short: 'USD', symbol: '$', url: '/USDIcon.svg', type: 'default', float: 2},
    {name: 'Euro', short: 'EUR', symbol: '€', url: '/EURIcon.svg', type: 'default', float: 2},
    {name: 'Pound Sterling', short: 'GBP', symbol: '£', url: '/GBP.png', type: 'default', float: 2},
    {name: 'Polish Złoty', short: 'PLN', symbol: 'zł', url: '/PLNIcon.svg', type: 'default', float: 2},
    {name: 'Bitcoin', short: 'BTC', symbol: '₿', url: '/Bitcoin.png', type: 'binance', ticker: 'BTCUSDT', float: 5},
    {name: 'Ethereum', short: 'ETH', symbol: 'Ξ', url: '/eth.png', type: 'binance', float: 4},
    {name: 'BNB', short: 'BNB', symbol: 'BNB', url: '/BNBIcon.png', type: 'binance', float: 3},
    {name: 'BasketCoin', short: 'BSKT', symbol: 'BSKT', url: '/BSKT.png', type: 'pancake', float: 0},
    {name: 'Satoshi', short: 'Sato', symbol: 'sato', url: '/Bitcoin.png', multiplier: 100000000, type: 'binance', ticker: 'BTCUSDT', float: 0},
    {name: 'mBTC', short: 'mBTC', symbol: 'mBTC', url: '/Bitcoin.png', multiplier: 100000, type: 'binance', ticker: 'BTCUSDT', float: 2}
]

export const checkRate = async (o) => {
    if(o?.type === 'binance') {
        const raw = await fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${o?.ticker}`)
        const data = await raw?.json();
        const rate = o?.reverse ? (data?.price / (o?.multiplier ?? 1)) : 1 / (data?.price / (o?.multiplier ?? 1));
        return parseFloat(rate);
    }
}