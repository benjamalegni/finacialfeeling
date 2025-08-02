# GitHub Pages Deployment Guide

## Configuración Inicial

### 1. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona **GitHub Actions**

### 2. Configurar Variables de Entorno

Para que la aplicación funcione correctamente en producción, necesitas configurar las variables de entorno:

1. Ve a **Settings** > **Secrets and variables** > **Actions**
2. Agrega los siguientes secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 3. Despliegue Automático

El proyecto está configurado para desplegar automáticamente cuando:
- Se hace push a la rama `main`
- Se crea un pull request a `main`

## Despliegue Manual

Si necesitas desplegar manualmente:

```bash
# Instalar dependencias
npm install

# Construir el proyecto
npm run build

# El build se generará en la carpeta `out/`
```

## Configuración del Proyecto

### Next.js Config
- `output: 'export'` - Genera archivos estáticos
- `trailingSlash: true` - Agrega slash al final de las URLs
- `basePath` - Configura el path base para GitHub Pages

### GitHub Actions
El workflow `.github/workflows/deploy.yml` maneja:
- Instalación de dependencias
- Build del proyecto
- Despliegue a GitHub Pages

## URL de Producción

Una vez desplegado, tu aplicación estará disponible en:
`https://[tu-usuario].github.io/[nombre-del-repositorio]/`

## Troubleshooting

### Problemas Comunes

1. **Variables de entorno no configuradas**
   - Asegúrate de que todos los secrets estén configurados en GitHub

2. **Build falla**
   - Verifica que todas las dependencias estén instaladas
   - Revisa los logs del workflow en GitHub Actions

3. **Página en blanco**
   - Verifica que el `basePath` esté configurado correctamente
   - Asegúrate de que las rutas estén funcionando

### Logs de Despliegue

Para ver los logs del despliegue:
1. Ve a tu repositorio en GitHub
2. Ve a **Actions**
3. Selecciona el workflow "Deploy to GitHub Pages"
4. Revisa los logs del job "build" y "deploy" 