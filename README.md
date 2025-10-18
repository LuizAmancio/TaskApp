# TaskApp
Um projeto FullStack simples com autenticação de usuários utilizando React/Next.js no Frontend e Spring Boot no Backend, com *WT (JSON Web Token) para controle de sessão.  
# 🔐 FullStack Auth App — Next.js + Spring Boot

Um projeto **FullStack** simples e moderno com autenticação de usuários utilizando **React/Next.js no Frontend** e **Spring Boot no Backend**, com **JWT (JSON Web Token)** para controle de sessão.  
Em breve, contará também com autenticação via **OAuth2 (Google)**.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ **Frontend**
- [Next.js 14 (App Router)](https://nextjs.org/) — Framework React com renderização híbrida (SSR/SSG)
- [React 18](https://react.dev/) — Biblioteca para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática e segurança no código
- [TailwindCSS](https://tailwindcss.com/) — Estilização rápida e responsiva
- [SWR](https://swr.vercel.app/) — Cache e revalidação automática de dados (fetch inteligente)
- [NextAuth (planejado)](https://next-auth.js.org/) — Autenticação com provedores externos (Google OAuth)
- [js-cookie](https://www.npmjs.com/package/js-cookie) — Manipulação de cookies no client-side

---

### ☕ **Backend**
- [Spring Boot 3](https://spring.io/projects/spring-boot) — Framework Java para APIs REST
- [Spring Web](https://spring.io/guides/gs/rest-service/) — Criação de endpoints REST
- [Spring Security](https://spring.io/projects/spring-security) — Autenticação e autorização
- [JWT (io.jsonwebtoken)](https://github.com/jwtk/jjwt) — Geração e validação de tokens
- [JPA / Hibernate](https://spring.io/guides/gs/accessing-data-jpa/) — Persistência de dados
- Banco de dados: MySQL

---

## 🔑 Funcionalidades Principais

### ✅ **Autenticação JWT**
- Registro e login de usuários.
- Geração de token JWT no backend.
- Validação do token via middleware no frontend (Next.js).
- Cookies httpOnly armazenando o token com tempo de expiração.

### 🧠 **Controle de Sessão (Client + Server)**
- Verificação de autenticação via middleware (`/tasks/*`).
- Contexto global de usuário (React Context + SWR).
- Atualização automática ao fazer login/logout.

### 🧱 **API REST com Spring Boot**
- Endpoints seguros (`/user/login`, `/user/register`, `/tasks/user/{id}`).
- Integração com banco DB2 via Spring Data JPA.
- Filtro JWT para interceptar requisições protegidas.

### 🔄 **Logout**
- Exclusão de cookie `token`.
- Atualização do contexto global no frontend via `mutate` (SWR).

### 🌐 **Futuro: OAuth2 com Google**
- Implementação de login via `NextAuth` + `GoogleProvider`.
- Sincronização do token Google com backend para emissão de JWT interno.
## 🧩 Estrutura do Projeto

