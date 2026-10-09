# What IF?

What IF? é um protótipo de aplicativo mobile pensado para estudantes do ensino superior e do ensino médio do IFPE Campus Paulista. A proposta é centralizar conteúdos das disciplinas, materiais enviados por professores e um chatbot educacional que, futuramente, poderá usar RAG, LangChain e embeddings para responder dúvidas com base nos conteúdos acadêmicos da instituição.

O nome é temporário e faz referência ao IF: "What IF?".

## Objetivo do projeto

O projeto nasce como uma adaptação conceitual do Projeto IARA, que era voltado à continuidade de ensino para pessoas ribeirinhas. Nesta nova versão, a ideia é atender estudantes do IFPE Campus Paulista, oferecendo uma experiência mobile simples, organizada e acessível para acompanhar disciplinas e revisar conteúdos.

Nesta primeira entrega, o foco é apenas um protótipo funcional de interface, sem backend e sem publicação em nuvem. As telas servem para demonstrar a ideia principal durante apresentação, com navegação real e dados mockados.

## Funcionalidades do protótipo

- Login demonstrativo
- Cadastro demonstrativo
- Menu principal do estudante
- Lista de disciplinas
- Visualização de conteúdos por disciplina
- Conteúdos simulados como PDFs, links, videoaulas e fontes
- Chatbot com resposta mockada
- Perfil do estudante
- Identidade visual em laranja e cinza suave

## Tecnologias utilizadas

### Expo

Framework usado para criar e executar o aplicativo React Native com configuração simplificada. Ele facilita o desenvolvimento mobile e permite rodar o projeto em Android, iOS e Web durante a fase de protótipo.

### React Native

Tecnologia principal da interface mobile. Permite construir telas nativas usando componentes React, como `View`, `Text`, `TextInput`, `Pressable`, `ScrollView` e `FlatList`.

### React

Biblioteca usada para estruturar componentes, controlar estados e organizar a renderização das telas. No protótipo, o estado controla a navegação simples entre telas, mensagens do chatbot e disciplina selecionada.

### Expo Status Bar

Biblioteca usada para controlar a aparência da barra de status do aplicativo.

### React Native Web

Permite executar o aplicativo também no navegador. Isso é útil para validar rapidamente o protótipo e capturar imagens das telas para apresentação.

### Tailwind CSS e NativeWind

Foram adicionados para permitir estilização com abordagem semelhante ao Tailwind em React Native. A estrutura já está preparada para evoluir a estilização com classes utilitárias, embora o protótipo atual também use `StyleSheet` para acelerar a entrega inicial.

### Babel e Module Resolver

Usados para configurar o processo de transformação do código e preparar aliases de importação, como `@components`, `@features`, `@services` e `@navigation`. Isso ajuda a manter a arquitetura mais organizada conforme o projeto crescer.

### React Navigation

Dependências de navegação foram adicionadas para a próxima evolução do projeto. A intenção é substituir a navegação mockada atual por uma navegação completa com stacks, tabs e fluxos separados de autenticação e área logada.

## Arquitetura planejada

A arquitetura recomendada para evolução do projeto é Feature-Based com Custom Hooks, em um estilo próximo ao MVVM.

```text
WhatIF/
└── src/
    ├── components/
    │   └── ui/
    ├── constants/
    ├── features/
    │   ├── auth/
    │   ├── chat/
    │   ├── courses/
    │   ├── dashboard/
    │   └── profile/
    ├── hooks/
    ├── navigation/
    ├── services/
    ├── styles/
    └── utils/
```

### View

Telas e componentes visuais. Devem apenas renderizar a interface e capturar eventos de toque ou digitação.

### ViewModel

Custom hooks, como `useAuth`, `useCourses`, `useChat` e `useUserProfile`. Esses hooks devem concentrar estado local, efeitos colaterais e orquestração das telas.

### Model / Services

Camada responsável por comunicação com API, mocks, persistência local, schemas de validação e regras de domínio. Futuramente poderá incluir Axios, TanStack Query, Zod, MMKV ou WatermelonDB.

## Futuras integrações planejadas

- Backend separado para autenticação, usuários, disciplinas e conteúdos
- Interface administrativa web para professores e gestão de conteúdos
- Upload e gerenciamento de PDFs, links e videoaulas
- Chatbot com RAG
- LangChain para orquestração do fluxo de recuperação e geração
- Embeddings para indexação semântica dos materiais
- Banco vetorial para busca por similaridade
- Histórico de conversa por estudante
- Perfil acadêmico e acompanhamento de progresso

## Como rodar

Entre na pasta do projeto mobile:

```bash
cd WhatIF
```

Instale as dependências, caso ainda não estejam instaladas:

```bash
npm install
```

Rode o projeto:

```bash
npx expo start
```

Para abrir diretamente na web:

```bash
npx expo start --web
```

Para Android:

```bash
npx expo start --android
```

## Status atual

Protótipo inicial funcional, com telas demonstrativas e dados mockados. Ainda não há backend, banco de dados, autenticação real ou chatbot com IA real.
