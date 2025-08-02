# n8n Financial Feeling - Railway Deployment

## 🚀 Despliegue en Railway

### Configuración Automática

Este repositorio está configurado para desplegar automáticamente en Railway usando Docker.

### Variables de Entorno Requeridas

En Railway Dashboard, configurar:

```bash
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=financialfeeling2024
WEBHOOK_URL=https://tu-app.railway.app
N8N_ENCRYPTION_KEY=financialfeeling2024encryptionkey32
```

### Estructura del Proyecto

- `Dockerfile` - Configuración de Docker para n8n
- `docker-compose.yml` - Configuración alternativa
- `railway.json` - Configuración específica de Railway
- `.dockerignore` - Archivos a ignorar en el build

### Despliegue

1. Conectar repositorio a Railway
2. Railway detectará automáticamente el Dockerfile
3. Configurar variables de entorno
4. Deploy automático

### Acceso

- URL: `https://tu-app.railway.app`
- Login: `admin` / `financialfeeling2024`

### Webhook

- URL: `https://tu-app.railway.app/webhook-test/analyze-stocks`
- Method: POST
- Body: `{"stocks": ["AAPL", "TSLA", "MSFT"]}`

### Troubleshooting

Si el build falla:
1. Verificar variables de entorno
2. Usar Dockerfile en lugar de docker-compose.yml
3. Revisar logs en Railway Dashboard 