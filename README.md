# Um Ano de Nós

Site estático romântico para abrir direto no navegador e também publicar no GitHub Pages.

## Como abrir

1. Abre o ficheiro `index.html` no browser.
2. Se quiser servir localmente, usa:

```bash
python3 -m http.server 8000
```

3. Depois abre `http://localhost:8000`.

## Onde personalizar

- `index.html`: textos, títulos, mensagens e estrutura geral.
- `styles.css`: cores, fontes, espaçamentos e animações.
- `script.js`: efeitos, quiz, jogo e carrossel.

## Publicação no GitHub Pages

O projeto já está preparado com deploy automático em `.github/workflows/deploy-pages.yml`.

Depois de subir para um repositório no GitHub:

1. Cria um repositório novo no GitHub.
2. Faz push da branch `main`.
3. Abre `Settings > Pages`.
4. Em `Build and deployment`, escolhe `GitHub Actions`.
5. O site será publicado automaticamente a cada novo push.

A URL final costuma ficar assim:

```text
https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
```

## Observação

As fontes vêm do Google Fonts. Se estiver sem internet, o site continua abrindo com fontes de fallback.
