const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

const toInt = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

router.get("/", async (req, res) => {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(suppliers);
});

router.get("/:id", async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID invalido." });
  }

  const supplier = await prisma.supplier.findUnique({ where: { id } });
  if (!supplier) {
    return res.status(404).json({ error: "Fornecedor nao encontrado." });
  }

  return res.json(supplier);
});

router.post("/", async (req, res) => {
  const { name, contato } = req.body || {};

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ error: "Nome e obrigatorio." });
  }

  const supplier = await prisma.supplier.create({
    data: {
      name: String(name).trim(),
      contato: contato ? String(contato).trim() : null,
    },
  });

  return res.status(201).json(supplier);
});

router.put("/:id", async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID invalido." });
  }

  const { name, contato } = req.body || {};
  if (name && String(name).trim().length < 2) {
    return res.status(400).json({ error: "Nome invalido." });
  }

  const existing = await prisma.supplier.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Fornecedor nao encontrado." });
  }

  const supplier = await prisma.supplier.update({
    where: { id },
    data: {
      name: name ? String(name).trim() : existing.name,
      contato: contato === undefined ? existing.contato : String(contato || "").trim() || null,
    },
  });

  return res.json(supplier);
});

router.delete("/:id", async (req, res) => {
  const id = toInt(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID invalido." });
  }

  const existing = await prisma.supplier.findUnique({ where: { id } });
  if (!existing) {
    return res.status(404).json({ error: "Fornecedor nao encontrado." });
  }

  await prisma.supplier.delete({ where: { id } });
  return res.status(204).send();
});

module.exports = router;
