# 🦸‍♂️ Grupo de Ofertas Amazon - Multiverso Nerd

> **A landing page mais épica para o seu grupo de ofertas!** Com um design inspirado em histórias em quadrinhos, animações imersivas e easter eggs secretos, esta página foi construída para converter visitantes em membros do seu grupo VIP com impacto de super-herói.

![Banner](https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-black?style=for-the-badge&logo=framer)

## ✨ Funcionalidades Épicas

- **🎨 Design Comic Book:** Estética vibrante inspirada em quadrinhos com sombras pesadas (brutalism/neo-brutalism), bordas grossas e fontes estilizadas.
- **🚀 Animações Fluidas:** Construída com `framer-motion` para transições suaves, painéis deslizantes, efeitos de hover e entrada de elementos.
- **💥 Efeitos Interativos:** Clique pela tela para ver efeitos "POW!" e "BAM!" estilo quadrinhos.
- **⏱️ Escassez e Urgência:** Ticker de ofertas em tempo real e contador de vagas no grupo VIP.
- **🎁 Loot Box:** Sistema de recompensa "gacha" onde os usuários podem clicar para revelar um item lendário (ex: PS5, iPhone, etc).
- **🎮 Easter Egg (Konami Code):** Digite `↑ ↑ ↓ ↓ ← → ← → B A` para desbloquear um pop-up secreto de "Loot Lendário"!

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** - Biblioteca principal para construção da interface.
- **[Vite](https://vitejs.dev/)** - Bundler ultrarrápido para desenvolvimento.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilização baseada em classes utilitárias para construir o design de quadrinhos.
- **[Motion (Framer Motion)](https://motion.dev/)** - Biblioteca de animações poderosa para React.
- **[Lucide React](https://lucide.dev/)** - Ícones vetoriais bonitos e consistentes.

## 🚀 Como Rodar Localmente

Siga os passos abaixo para rodar o projeto em sua própria máquina (Base de Vilão ou Caverna do Herói):

### Pré-requisitos
- Node.js (v18+)
- npm ou pnpm ou yarn

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/grupo-ofertas-amazon.git
   cd grupo-ofertas-amazon
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra `http://localhost:3000` e veja a mágica acontecer!

## 📂 Estrutura do Projeto

```
📦 grupo-ofertas-amazon
 ┣ 📂 public/          # Assets estáticos (Logo, imagens)
 ┃ ┗ 📜 grupologo.png
 ┣ 📂 src/             # Código fonte da aplicação
 ┃ ┣ 📜 App.tsx        # Componente principal com todo o layout e lógica
 ┃ ┣ 📜 index.css      # Estilos globais e fontes (Google Fonts)
 ┃ ┗ 📜 main.tsx       # Ponto de entrada do React
 ┣ 📜 package.json     # Dependências e scripts
 ┗ 📜 vite.config.ts   # Configuração do Vite
```

## 🦸‍♂️ Customização

Você pode facilmente customizar as ofertas e os links do seu grupo:
- **Links do Grupo:** Edite os botões "ENTRAR NO GRUPO VIP" no arquivo `src/App.tsx` para redirecionar para o seu link de WhatsApp ou Telegram.
- **Cores e Fontes:** Altere o `src/index.css` ou as classes do Tailwind para mudar a paleta de cores. As fontes utilizadas são `Bangers` (títulos) e `Inter` (textos).

---

Feito com ⚡ superpoderes e muito código!
