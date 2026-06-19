# Correo-1 - Guía de Despliegue en Render

Proyecto Node.js con Docker configurado para desplegar automáticamente en Render.

## Despliegue Rápido (Recomendado)

### 1. Crear una cuenta en Render
- Ve a [render.com](https://render.com) y crea una cuenta gratis

### 2. Conectar tu repo GitHub
- En el dashboard de Render, click en "New +" > "Web Service"
- Selecciona "Deploy from a Git repository"
- Autoriza y selecciona `mercadoduran/Correo-1`

### 3. Configurar el servicio
- **Name:** `correo-1`
- **Environment:** `Docker`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Gratuito (free)
- Click en "Create Web Service"

### 4. (Opcional) Configurar despliegue automático
Para que Render se actualice automáticamente al hacer push a `main`:

1. En Render, ve a tu servicio > Settings > "Deploy Hook"
2. Copia la URL del hook
3. En GitHub, Settings > Secrets and Variables > Actions > New Repository Secret:
   - Name: `RENDER_API_KEY`
   - Value: Token de la URL (parte después de `key=`)
4. En GitHub, Settings > Secrets and Variables > Actions > New Repository Secret:
   - Name: `RENDER_SERVICE_ID`
   - Value: ID del servicio (ej. `srv-abc123def456`)

El workflow en `.github/workflows/render-deploy.yml` se dispará automáticamente.

## Estructura del Proyecto

```
.
├── package.json          # Dependencias Node.js
├── index.js             # App Express mínima
├── Dockerfile           # Configuración Docker
├── render.yaml          # Config de Render
└── .github/workflows/
    ├── docker-build.yml     # Build y push a GHCR
    └── render-deploy.yml    # Deploy automático a Render
```

## URLs

- **App en vivo:** Se mostrará en el dashboard de Render (ej. `correo-1.onrender.com`)
- **Imagen Docker:** `ghcr.io/mercadoduran/correo-1:latest`

## Probar localmente

```bash
# Con Docker instalado:
docker build -t correo-1 .
docker run -p 3000:3000 correo-1

# O con Node.js:
npm install
npm start
```

Luego abre http://localhost:3000

## Troubleshooting

- **Build falla:** Verifica que `package.json` esté en la raíz
- **App no inicia:** Comprueba que el puerto sea 3000 (ENV `PORT`)
- **Despliegue no se activa:** Revisa que `RENDER_API_KEY` y `RENDER_SERVICE_ID` estén en GitHub Secrets

Más info: [docs.render.com](https://docs.render.com)
