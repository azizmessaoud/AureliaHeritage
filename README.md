# AureliaHeritage — guide de démarrage et déploiement

Ce dépôt contient l'application front-end (React + TypeScript, Vite, Tailwind) du projet AureliaHeritage.

## Raccourci : ce que j'ai fait
- Code prêt pour le développement local (Vite + React).
- Ajustements TypeScript & imports pour éviter des erreurs d'éditeur.

## Prérequis locaux
- Node.js LTS (installé dans ce workspace : v24.x ou supérieur recommandé)
- npm (inclus avec Node)
- Un terminal (PowerShell / cmd). Note : sur Windows, PowerShell peut bloquer l'exécution des scripts npm via la politique d'exécution ; si `npm`/`npx` sont bloqués, utilisez `cmd.exe` ou ajoutez `C:\Program Files\nodejs` au PATH et lancez depuis une invite de commandes.

## Exécution locale

1) Installer les dépendances (une seule fois) :

```powershell
npm install
```

2) Lancer le serveur de développement (auto-rechargement) :

```powershell
# Par défaut :
npm run dev

# Si le port 8080 est occupé (ex. Oracle), lancez sur un autre port (ex. 3000) :
# PowerShell :
$env:Path = 'C:\Program Files\nodejs;' + $env:Path; cmd.exe /C "set PATH=C:\Program Files\nodejs;%PATH% && npm run dev -- --port 3000 --host"
```

3) Compiler pour la production :

```powershell
npm run build
# Prévisualiser le build localement :
npm run preview
```

## Déploiement (options simples et recommandées)

Choix rapide : Vercel ou Netlify sont les plus simples pour une app Vite + React. GitHub Pages et Azure Static Web Apps sont aussi possibles.

- Vercel (recommandé pour simplicité)
	1. Créez un compte Vercel et connectez votre dépôt GitHub/GitLab/Bitbucket.
	2. Importez le projet, Vercel détecte automatiquement Vite.
	3. Configurez : Build Command = `npm run build`, Output Directory = `dist`.
	4. Déployez — chaque push vers la branche configurée déclenchera un nouveau déploiement.

- Netlify
	1. Connectez votre dépôt à Netlify ou faites un drag-and-drop du dossier `dist` (build local).
	2. Si vous utilisez la configuration Git, Build command = `npm run build`, Publish directory = `dist`.

- GitHub Pages (via GitHub Actions)
	- Idée simple : créer une action qui exécute `npm ci && npm run build` puis publie `dist/` sur la branche `gh-pages`.
	- Exemple d'action (optionnelle) :

```yaml
# .github/workflows/deploy-gh-pages.yml
name: Deploy to GitHub Pages
on:
	push:
		branches: [ main ]
jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- uses: pnpm/action-setup@v2 # or setup-node
			- name: Install
				run: npm ci
			- name: Build
				run: npm run build
			- name: Deploy
				uses: peaceiris/actions-gh-pages@v3
				with:
					github_token: ${{ secrets.GITHUB_TOKEN }}
					publish_dir: ./dist
```

- Azure Static Web Apps
	1. Créez une ressource Static Web App dans le portail Azure et liez votre dépôt.
	2. Configurez les étapes de build : `npm ci && npm run build` et dossier d'artefacts `dist`.

Note: si vous déployez sous un sous-chemin (ex. GitHub Pages pour un repo non-user), configurez la propriété `base` dans `vite.config.ts` et reconstruisez.

## Conseils et dépannage
- Port occupé (ex. Oracle sur 8080) : démarrez Vite sur un port libre ou arrêtez le service occupant le port.
- Erreurs TypeScript dans VS Code après modification de `tsconfig` : redémarrer le serveur TypeScript (Palette → "TypeScript: Restart TS Server") ou recharger la fenêtre.
- PowerShell bloque `npm`/`npx` : utilisez `cmd.exe` ou ajustez la policy si vous savez ce que vous faites.

## Commandes utiles récapitulées

```powershell
npm install
npm run dev               # dev server
npm run build             # production build -> dist/
npm run preview           # preview built site locally
# start dev on custom port via cmd wrapper (Windows PowerShell)
$env:Path = 'C:\Program Files\nodejs;' + $env:Path; cmd.exe /C "set PATH=C:\Program Files\nodejs;%PATH% && npm run dev -- --port 3000 --host"
```

Si tu veux, je peux créer pour toi une action GitHub complète (workflow) pour déployer automatiquement sur GitHub Pages, Netlify ou Azure — dis-moi la plateforme choisie et je la génère.

---
Petit résumé : choisis Vercel si tu veux la solution la plus rapide (import du dépôt, réglages par défaut, build automatique). Pour une approche entièrement contrôlée, je peux ajouter une workflow GitHub Actions ici même.

Bonne suite — dis-moi quelle plateforme tu veux utiliser et j'ajoute la configuration de déploiement automatisée.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/82cf2466-dbde-432e-827f-c29f4c454a5c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
