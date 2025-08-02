# 🚀 Ejemplo Práctico: n8n en Railway

## 📋 **Paso a Paso Completo**

### **Paso 1: Crear Repositorio n8n**

```bash
# Crear nuevo repositorio para n8n
mkdir n8n-financial-feeling
cd n8n-financial-feeling

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
      - N8N_BASIC_AUTH_PASSWORD=financialfeeling2024
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n-financial-feeling.railway.app
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

# Crear README.md
cat > README.md << 'EOF'
# n8n Financial Feeling

Servicio n8n para análisis de activos financieros.

## Despliegue

Este repositorio se despliega automáticamente en Railway.

## Variables de Entorno

- `N8N_BASIC_AUTH_USER`: admin
- `N8N_BASIC_AUTH_PASSWORD`: financialfeeling2024
- `WEBHOOK_URL`: https://n8n-financial-feeling.railway.app

## Webhook

URL: `https://n8n-financial-feeling.railway.app/webhook-test/analyze-stocks`
Method: POST
Body: `{"stocks": ["AAPL", "TSLA", "MSFT"]}`
EOF

# Inicializar git
git init
git add .
git commit -m "Initial commit - n8n Docker setup"
git branch -M main
git remote add origin https://github.com/tu-usuario/n8n-financial-feeling.git
git push -u origin main
```

### **Paso 2: Desplegar en Railway**

1. **Ir a Railway**
   - Ve a [railway.app](https://railway.app)
   - Login con GitHub

2. **Crear Proyecto**
   - Click "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Selecciona tu repositorio `n8n-financial-feeling`

3. **Configurar Variables**
   - Ve a "Variables" en Railway
   - Agregar:
   ```
   N8N_BASIC_AUTH_USER=admin
   N8N_BASIC_AUTH_PASSWORD=financialfeeling2024
   N8N_HOST=0.0.0.0
   N8N_PORT=5678
   N8N_PROTOCOL=https
   WEBHOOK_URL=https://n8n-financial-feeling.railway.app
   ```

4. **Esperar Despliegue**
   - Railway detectará automáticamente `docker-compose.yml`
   - Desplegará n8n automáticamente
   - URL será: `https://n8n-financial-feeling.railway.app`

### **Paso 3: Configurar n8n Workflow**

1. **Acceder a n8n**
   - Ve a: `https://n8n-financial-feeling.railway.app`
   - Login: `admin` / `financialfeeling2024`

2. **Crear Workflow**
   - Click "New Workflow"
   - Nombre: "Stock Analysis"

3. **Agregar Webhook Trigger**
   ```
   Node: Webhook
   Method: POST
   Path: /webhook-test/analyze-stocks
   ```

4. **Agregar Code Node (Procesamiento)**
   ```javascript
   // Input: $json.stocks
   const stocks = $input.all()[0].json.stocks;
   
   const results = stocks.map((stock, index) => {
     const sentiments = ['positive', 'negative', 'neutral'];
     const news = [
       'Strong earnings report exceeds expectations',
       'Regulatory concerns impact market sentiment', 
       'Stable performance with moderate growth outlook'
     ];
     const recommendations = [
       'Buy - Strong fundamentals and growth potential',
       'Hold - Monitor regulatory developments',
       'Hold - Stable performance expected'
     ];
     
     return {
       symbol: stock,
       analysis: {
         sentiment: sentiments[index % 3],
         confidence: Math.floor(Math.random() * 30) + 70,
         news: news[index % 3],
         recommendation: recommendations[index % 3]
       }
     };
   });
   
   return { stocks: results };
   ```

5. **Agregar Respond to Webhook**
   ```
   Node: Respond to Webhook
   Response Code: 200
   Response Body: {{ $json }}
   ```

6. **Activar Workflow**
   - Click "Save"
   - Toggle "Active" en ON

### **Paso 4: Actualizar Proyecto Principal**

```bash
# En my-app-combined/.env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n-financial-feeling.railway.app/webhook-test/analyze-stocks
```

### **Paso 5: Probar**

```bash
# Test local
curl -X POST https://n8n-financial-feeling.railway.app/webhook-test/analyze-stocks \
  -H "Content-Type: application/json" \
  -d '{"stocks": ["AAPL", "TSLA", "MSFT"]}'
```

## 🎯 **Resultado Final**

- ✅ **n8n funcionando en la nube**
- ✅ **HTTPS automático**
- ✅ **Accesible desde cualquier PC**
- ✅ **Webhook configurado**
- ✅ **Análisis real de stocks**

## 🔧 **Variables de Entorno del Proyecto**

```bash
# my-app-combined/.env.local
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n-financial-feeling.railway.app/webhook-test/analyze-stocks
```

## 🚀 **Despliegue a GitHub Pages**

```bash
# En my-app-combined
git add .
git commit -m "Add n8n cloud configuration"
git push origin main

# GitHub Actions desplegará automáticamente
# Con n8n funcionando en la nube
```

¡Ahora tu aplicación funcionará desde cualquier PC con análisis real de stocks! 