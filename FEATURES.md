# IntercomSwap — Features

> Trac Address: `trac1p7yqla5zmzlj2ssjvpfa4xpcx7xrwt3qzl4c8n4qhqwv3k2zu6ls5z9d6h`

---

## ⇄ Swap

Token swapping powered by the Trac Protocol.

- **Multi-pair support** — BTC/TRAC, ETH/TRAC, USDT/TRAC, BTC/ETH
- **Real-time rate display** — live price + rate calculation on input
- **Price impact indicator** — color-coded to warn on high-slippage swaps
- **Minimum received** — slippage-protected output floor (0.3% fee)
- **Route display** — shows the execution path (direct or multi-hop)
- **One-click flip** — instantly reverse token pair
- **Network fee estimate** — displayed before confirmation
- **Pool liquidity bars** — visual depth of each trading pair
- **Recent swaps feed** — live ticker of the last 4 swaps on-chain
- **Market stats panel** — BTC, TRAC, ETH prices + 24h volume

---

## ✉ Messages

Peer-to-peer encrypted messaging tied to Trac addresses.

- **Address-linked identity** — messages are signed by your Trac address
- **Conversation list** — sidebar with all active threads
- **Search** — filter conversations by name or address
- **New conversation** — start a chat with any Trac address
- **Real-time send** — Enter key or send button
- **Unread indicators** — dot badge on unread threads
- **Timestamp display** — per-message time labels
- **Persistent history** — conversation state preserved in session

---

## ◈ Portfolio

Live token balance and P&L tracking.

- **Total value** — aggregated USD value across all held tokens
- **24h P&L** — profit/loss since last 24 hours with color indicator
- **Sparkline charts** — canvas-rendered price/value history graphs
- **Token breakdown** — individual rows for BTC, TRAC, ETH, USDT
- **Per-token change** — 24h percentage change per asset
- **One-click Trac address copy** — available on every panel

---

## 🔧 API (via index.js server)

A lightweight Node.js HTTP server exposing:

| Method | Endpoint      | Description                        |
|--------|---------------|------------------------------------|
| GET    | `/api/info`   | App name, version, Trac address    |
| GET    | `/api/rates`  | Live swap rates for all pairs      |
| POST   | `/api/swap`   | Execute a token swap               |
| POST   | `/api/message`| Send a message to a Trac address   |

---

## 🛡️ Security

- No wallet private keys stored client-side
- All swap submissions are confirmed before broadcast
- Messages are linked to Trac address identity
- Contract logic enforced on-chain (see `contract/`)

---

## 🗺️ Roadmap

- [ ] Live price feed integration (CoinGecko / Trac oracle)
- [ ] Wallet connection (Unisat, Xverse)
- [ ] On-chain message storage via Trac Protocol
- [ ] Multi-hop swap routing
- [ ] LP (liquidity provider) dashboard
- [ ] Mobile app (React Native)
