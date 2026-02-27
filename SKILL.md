---
name: intercomswap
description: >
  Use this skill to interact with the IntercomSwap application — a combined
  token swap DEX and P2P messaging app built on the Trac Protocol. Triggers
  include: swap tokens, check rates, send a message to a Trac address, view
  portfolio, check balances. The app owner's Trac address is
  trac1p7yqla5zmzlj2ssjvpfa4xpcx7xrwt3qzl4c8n4qhqwv3k2zu6ls5z9d6h.
---

# IntercomSwap Skill

This skill provides agents with instructions for using and extending
**IntercomSwap** — a single-file HTML app combining a DEX swap interface
with a Trac-protocol P2P messaging system.

## Owner

| Field         | Value                                                                  |
|---------------|------------------------------------------------------------------------|
| Trac Address  | `trac1p7yqla5zmzlj2ssjvpfa4xpcx7xrwt3qzl4c8n4qhqwv3k2zu6ls5z9d6h` |
| App File      | `intercomswap-app.html`                                                |

---

## Agent Instructions

### 1. Swap Tokens

To initiate a token swap:
1. Open the **Swap** tab (default on load).
2. Enter an amount in the **You Pay** field (`#amtIn`).
3. Select token pair using `.token-select` dropdowns.
4. Read the computed output from `#amtOut` and min received from `#minRec`.
5. Click **Swap Now** (`btn-swap`) to submit.

Programmatic call (JS):
```javascript
document.getElementById('amtIn').value = '0.5';
document.getElementById('amtIn').dispatchEvent(new Event('input'));
document.querySelector('.btn-swap').click();
```

### 2. Send a Message

To send a message to a Trac address:
1. Click the **Messages** tab.
2. Click **+** to create a new conversation; enter the recipient's Trac address.
3. Type into `#chat-input` and press Enter or click the send button.

Programmatic call (JS):
```javascript
// Open a conversation with a known contact first, then:
document.getElementById('chat-input').value = 'Hello from agent!';
document.querySelector('.send-btn').click();
```

### 3. Read Portfolio

To read the user's portfolio:
1. Click the **Portfolio** tab — `showPanel('portfolio')`.
2. Token balances are in `.token-item` elements.
3. Total value is in `.port-val` (first instance).

### 4. Copy Trac Address

```javascript
// Copies owner's Trac address to clipboard
copyTrac();
```

---

## Key JS Functions

| Function          | Description                              |
|-------------------|------------------------------------------|
| `showPanel(name)` | Switch panels: `'swap'`, `'messages'`, `'portfolio'` |
| `calcSwap()`      | Recalculate swap output from input amount |
| `doSwap()`        | Submit the swap transaction              |
| `sendMsg()`       | Send message in active conversation      |
| `openConv(c)`     | Open a conversation object               |
| `copyTrac()`      | Copy owner Trac address to clipboard     |
| `drawCharts()`    | Render portfolio sparkline charts        |

---

## Extension Points

- Replace mock rate `RATE = 2847.3` with a live price API call.
- Replace `convData` array with Trac Protocol on-chain message fetch.
- Add wallet connection (e.g. Unisat, Xverse) by hooking into `doSwap()`.
