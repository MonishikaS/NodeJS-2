
const express = require("express");
const app = express();
const PORT = 3000; 

app.use(express.json());

let cards = [
  { id: 1, suit: "Hearts",   value: "Ace"   },
  { id: 2, suit: "Spades",   value: "King"  },
  { id: 3, suit: "Diamonds", value: "Queen" }
];

// GET all cards
app.get("/cards", (req, res) => {
  res.json(cards);
});

// GET a specific card by ID
app.get("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const card = cards.find(c => c.id === id);
  if (!card) return res.status(404).json({ error: "Card not found" });
  res.json(card);
});

// POST a new card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).json({ error: "Suit and value are required" });
  }
  const newCard = {
    id: cards.length ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE a card by ID
app.delete("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Card not found" });
  const deleted = cards.splice(index, 1)[0];
  res.json({ message: "Card deleted", card: deleted });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
