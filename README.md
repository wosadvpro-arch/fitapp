# FitApp - Guia de Midias

## Estrutura de arquivos

```
fitapp/
├── public/
│   └── images/          <- COLOQUE SUAS IMAGENS AQUI
│       ├── dia-01.jpg
│       ├── dia-02.jpg  ...ate dia-28.jpg
│       ├── treino-01.jpg ...ate treino-06.jpg
│       └── placeholder.jpg
└── src/
    └── media.js         <- COLOQUE SUAS URLs DE VIDEO AQUI
```

---

## PASSO 1 - Imagens (pasta /public/images/)

1. Crie a pasta `public/images/` na raiz do projeto
2. Nomeie seus arquivos exatamente assim:
   - Dias do plano: `dia-01.jpg`, `dia-02.jpg`, ... `dia-28.jpg`
   - Treinos: `treino-01.jpg`, `treino-02.jpg`, ... `treino-06.jpg`
   - Fallback: `placeholder.jpg` (imagem generica caso nao encontre)
3. Formatos aceitos: `.jpg`, `.png`, `.webp`
4. Tamanho recomendado: 400x400px para dias, 700x420px para treinos

---

## PASSO 2 - Videos (Cloudinary - gratuito)

### Criar conta
1. Acesse https://cloudinary.com e crie uma conta gratuita
2. No painel clique em **Media Library**
3. Crie uma pasta chamada `fitapp`
4. Faca upload dos seus videos `.mp4`

### Pegar a URL
Apos upload, copie a URL do video. Formato:
```
https://res.cloudinary.com/SEU-CLOUD-NAME/video/upload/fitapp/dia-01.mp4
```

### Editar src/media.js
Abra `src/media.js` e substitua SEU-ID pela URL real do Cloudinary:

```js
export const PLAN_MEDIA = [
  { image: '/images/dia-01.jpg', video: 'https://res.cloudinary.com/meu-id/video/upload/fitapp/dia-01.mp4' },
  { image: '/images/dia-02.jpg', video: 'https://res.cloudinary.com/meu-id/video/upload/fitapp/dia-02.mp4' },
  // ... repita para todos os 28 dias
];

export const WORKOUT_MEDIA = [
  { image: '/images/treino-01.jpg', video: 'https://res.cloudinary.com/meu-id/video/upload/fitapp/treino-01.mp4' },
  // ... repita para os 6 treinos
];
```

---

## PASSO 3 - Testar local

```bash
npm install
npm run dev
```

Abra http://localhost:5173 e verifique:
- [ ] Imagens aparecem nos cards
- [ ] Botao play abre o player de video
- [ ] Video toca corretamente

---

## PASSO 4 - Deploy no Vercel

```bash
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/fitapp.git
git push -u origin main
```

Depois:
1. Acesse https://vercel.com
2. Clique em **Add New Project**
3. Selecione o repositorio do GitHub
4. Vercel detecta Vite automaticamente -> clique **Deploy**

---

## Dicas rapidas

| Situacao | O que fazer |
|---|---|
| Video nao aparece | Verifique a URL no media.js |
| Imagem quebrada | Nome do arquivo deve bater com media.js |
| Video lento | No Cloudinary, ative streaming adaptativo (ABR) |
| Quer mudar nomes | Mude o arquivo em /public/images/ E o media.js |