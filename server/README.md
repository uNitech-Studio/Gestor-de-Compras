# Backend (Node + Express + Prisma + MySQL)

## Setup rapido
1) Copie `.env.example` para `.env` e ajuste o `DATABASE_URL`.
2) Instale as dependencias:
   - `npm install`
3) Gere o client e rode a migration:
   - `npm run prisma:generate`
   - `npm run prisma:migrate`
4) Suba a API:
   - `npm run dev`

## Endpoints (Fornecedores)
- `GET /health`
- `GET /suppliers`
- `GET /suppliers/:id`
- `POST /suppliers` { "name": "...", "contato": "..." }
- `PUT /suppliers/:id` { "name": "...", "contato": "..." }
- `DELETE /suppliers/:id`
