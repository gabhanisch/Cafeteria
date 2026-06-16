# Cafena

Projeto final desenvolvido para a disciplina de Front-End.

## 📖 Descrição

O Cafena é uma aplicação web desenvolvida utilizando React com o objetivo de simular o sistema de uma cafeteria. O projeto foi criado para aplicar os principais conceitos estudados durante a disciplina, incluindo componentização, roteamento, gerenciamento de estado, responsividade e consumo de dados.

A aplicação oferece uma interface moderna e responsiva, permitindo que o usuário navegue pelas seções do site, visualize produtos, realize login e cadastro, utilize um carrinho de compras e consulte dados obtidos através de uma API.

---

## Funcionalidades

* Navegação por seções utilizando âncoras
* Rolagem suave entre seções da página
* Sistema de Login
* Sistema de Cadastro
* Carrinho de Compras
* Gerenciamento global do carrinho com Context API
* Consumo de dados através de API
* Menu lateral responsivo
* Navegação entre páginas utilizando React Router
* Interface adaptada para dispositivos móveis e desktop

---

## 🛠 Tecnologias Utilizadas

* React
* Vite
* React Router DOM
* Tailwind CSS
* Context API
* PostCSS
* Autoprefixer

---

## Estrutura do Projeto

```text
src
│
├── components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── MenuCard.jsx
│   ├── ReviewCard.jsx
│   └── Footer.jsx
│
├── context
│   └── CartContext.jsx
│
├── pages
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   ├── Cart.jsx
│   └── Dados.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/gabhanisch/Cafeteria.git
```

### 2. Acessar a pasta do projeto

```bash
cd Cafeteria
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar a aplicação

```bash
npm run dev
```

Após executar o comando, o projeto estará disponível no endereço informado pelo Vite no terminal.

---

## Conceitos Aplicados

Durante o desenvolvimento deste projeto foram utilizados diversos conceitos abordados na disciplina:

* Estruturação semântica com HTML5
* Responsividade utilizando Tailwind CSS
* Componentização em React
* Manipulação de estados com useState
* Compartilhamento de dados com Context API
* Navegação entre páginas com React Router
* Consumo de APIs externas
* Organização modular de arquivos e componentes

---

## Objetivo Acadêmico

O principal objetivo do projeto foi colocar em prática os conhecimentos adquiridos ao longo da disciplina de Front-End, desenvolvendo uma aplicação completa utilizando tecnologias modernas do ecossistema React.

---

## Integrantes

- Gabriel Hanisch Afonso
- Henry Gabriel da Rocha Ribeiro
- Matheus Machado da Silva e Souza
- Pedro Ariel Agnelli Lima
- Luis Fernando Bueno

Projeto desenvolvido para fins acadêmicos na disciplina de Front-End.
