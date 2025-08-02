# 🐳 n8n con Docker en la Nube - Financial Feeling

## 🚀 **Opción 1: Railway (Recomendado - Gratis)**

### **1.1 Crear cuenta en Railway**
1. Ve a [railway.app](https://railway.app)
2. Crea una cuenta con GitHub
3. Crea un nuevo proyecto

### **1.2 Configurar n8n con Docker**
```bash
# Crear docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=tu_password_seguro
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://tu-app.railway.app
      - GENERIC_TIMEZONE=America/New_York
    volumes:
      - n8n_data:/home/node/.n8n
    networks:
      - n8n_network

volumes:
  n8n_data:

networks:
  n8n_network:
    driver: bridge
EOF
```

### **1.3 Desplegar en Railway**
```bash
# 1. Conectar tu repositorio a Railway
# 2. Railway detectará automáticamente docker-compose.yml
# 3. Desplegar automáticamente

# O usar Railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
```

### **1.4 Obtener URL de Railway**
- La URL será: `https://tu-app.railway.app`
- El webhook será: `https://tu-app.railway.app/webhook-test/analyze-stocks`

---

## 🐳 **Opción 2: Render (Gratis)**

### **2.1 Crear cuenta en Render**
1. Ve a [render.com](https://render.com)
2. Crea una cuenta
3. Crea un nuevo Web Service

### **2.2 Configurar Docker**
```bash
# Crear Dockerfile
cat > Dockerfile << 'EOF'
FROM n8nio/n8n:latest

ENV N8N_BASIC_AUTH_ACTIVE=true
ENV N8N_BASIC_AUTH_USER=admin
ENV N8N_BASIC_AUTH_PASSWORD=tu_password_seguro
ENV N8N_HOST=0.0.0.0
ENV N8N_PORT=5678
ENV N8N_PROTOCOL=https
ENV WEBHOOK_URL=https://tu-app.onrender.com
ENV GENERIC_TIMEZONE=America/New_York

EXPOSE 5678

CMD ["n8n", "start"]
EOF
```

### **2.3 Desplegar en Render**
1. Conecta tu repositorio GitHub
2. Render detectará el Dockerfile
3. Configura las variables de entorno
4. Deploy automático

---

## 🐳 **Opción 3: DigitalOcean (Pago - $5/mes)**

### **3.1 Crear Droplet**
```bash
# 1. Crear cuenta en DigitalOcean
# 2. Crear un Droplet con Docker pre-instalado
# 3. Conectar por SSH

# Instalar Docker Compose
sudo apt update
sudo apt install docker-compose
```

### **3.2 Configurar n8n**
```bash
# En tu Droplet
mkdir n8n
cd n8n

# Crear docker-compose.yml (mismo que arriba)
# Agregar variables de entorno
cat > .env << 'EOF'
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=tu_password_seguro
N8N_HOST=0.0.0.0
N8N_PORT=5678
N8N_PROTOCOL=https
WEBHOOK_URL=https://tu-ip.com
GENERIC_TIMEZONE=America/New_York
EOF

# Ejecutar
docker-compose up -d
```

---

## 🔧 **Configuración del Proyecto**

### **1. Actualizar Variables de Entorno**
```bash
# En .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-app.railway.app/webhook-test/analyze-stocks
```

### **2. Configurar n8n Workflow**
1. Accede a tu n8n: `https://tu-app.railway.app`
2. Login: `admin` / `tu_password_seguro`
3. Crear workflow para análisis de stocks

### **3. Crear Webhook en n8n**
```javascript
// En n8n, crear un webhook con:
// URL: /webhook-test/analyze-stocks
// Method: POST
// Response: JSON con análisis de stocks
```

---

## 📊 **Comparación de Opciones**

| Plataforma | Pros | Contras | Costo |
|------------|------|---------|-------|
| **Railway** | ✅ Fácil setup<br>✅ Docker automático<br>✅ HTTPS automático | ❌ Límite de uso gratuito | $0-20/mes |
| **Render** | ✅ Fácil setup<br>✅ Docker automático<br>✅ HTTPS automático | ❌ Sleep después de inactividad | $0-25/mes |
| **DigitalOcean** | ✅ Control total<br>✅ Sin límites<br>✅ Siempre activo | ❌ Requiere configuración manual<br>❌ Costo fijo | $5/mes |

---

## 🚀 **Configuración Rápida (Railway)**

### **1. Crear Repositorio para n8n**
```bash
mkdir n8n-financial-feeling
cd n8n-financial-feeling

# Crear docker-compose.yml (código arriba)
# Crear README.md
# Subir a GitHub
```

### **2. Desplegar en Railway**
1. Ve a [railway.app](https://railway.app)
2. "New Project" > "Deploy from GitHub repo"
3. Selecciona tu repositorio n8n
4. Railway desplegará automáticamente

### **3. Configurar Variables**
```bash
# En Railway Dashboard
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=tu_password_seguro
N8N_HOST=0.0.0.0
N8N_PORT=5678
N8N_PROTOCOL=https
WEBHOOK_URL=https://tu-app.railway.app
```

### **4. Actualizar Proyecto**
```bash
# En my-app-combined/.env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-app.railway.app/webhook-test/analyze-stocks
```

---

## 🎯 **Workflow de n8n para Análisis**

### **Estructura del Webhook**
```javascript
// Input: { "stocks": ["AAPL", "TSLA", "MSFT"] }
// Output: {
//   "stocks": [
//     {
//       "symbol": "AAPL",
//       "analysis": {
//         "sentiment": "positive",
//         "confidence": 85,
//         "news": "Strong earnings report",
//         "recommendation": "Buy - Strong fundamentals"
//       }
//     }
//   ]
// }
```

### **Pasos del Workflow**
1. **Webhook Trigger**: Recibe stocks
2. **HTTP Request**: Llamar a API de noticias
3. **Code Node**: Procesar sentimiento
4. **HTTP Response**: Devolver análisis

---

## 🔒 **Seguridad**

### **Variables de Entorno Sensibles**
```bash
# Nunca committear passwords
N8N_BASIC_AUTH_PASSWORD=tu_password_seguro

# Usar variables de entorno en Railway/Render
# No en el código
```

### **HTTPS Automático**
- Railway y Render proporcionan HTTPS automático
- DigitalOcean requiere configuración manual

---

## 📝 **Próximos Pasos**

1. **Elegir plataforma** (Railway recomendado)
2. **Crear repositorio n8n**
3. **Desplegar con Docker**
4. **Configurar webhook**
5. **Actualizar variables del proyecto**
6. **Probar desde diferentes PCs**

¡Con Docker, tendrás n8n funcionando en la nube en minutos! 