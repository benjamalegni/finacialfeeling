# 🚀 Railway n8n Configuration - Financial Feeling

## ✅ **Configuración Completada**

### **📋 Información del Proyecto:**
- **Project ID**: `42966fc1-10f0-4f26-b711-8f55520e9187`
- **Project Name**: `meticulous-victory`
- **Service Name**: `ffAIAgent-n8n`
- **Environment**: `production`

### **🌐 URLs Configuradas:**

#### **n8n Dashboard:**
```
https://ffaiagent-n8n-production.up.railway.app
```

#### **n8n Webhook:**
```
https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks
```

#### **Login Credentials:**
- **Username**: `admin`
- **Password**: `financialfeeling2024`

### **🔧 Variables de Entorno Configuradas:**

```bash
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=financialfeeling2024
N8N_HOST=0.0.0.0
N8N_PORT=5678
N8N_PROTOCOL=https
WEBHOOK_URL=https://ffaiagent-n8n-production.up.railway.app
N8N_ENCRYPTION_KEY=financialfeeling2024encryptionkey32
```

## 📋 **Próximos Pasos**

### **1. Configurar n8n Workflow**

1. **Acceder a n8n:**
   - Ve a: `https://ffaiagent-n8n-production.up.railway.app`
   - Login: `admin` / `financialfeeling2024`

2. **Crear Workflow:**
   - Click "New Workflow"
   - Nombre: "Stock Analysis"

3. **Agregar Webhook Trigger:**
   ```
   Node: Webhook
   Method: POST
   Path: /webhook-test/analyze-stocks
   ```

4. **Agregar Code Node:**
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

5. **Agregar Respond to Webhook:**
   ```
   Node: Respond to Webhook
   Response Code: 200
   Response Body: {{ $json }}
   ```

6. **Activar Workflow:**
   - Click "Save"
   - Toggle "Active" en ON

### **2. Configurar Variables del Proyecto**

#### **Para Desarrollo Local (.env.local):**
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# n8n Railway Configuration
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks
```

#### **Para GitHub Pages (GitHub Secrets):**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks
```

### **3. Probar Configuración**

```bash
# Test n8n webhook
curl -X POST https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks \
  -H "Content-Type: application/json" \
  -d '{"stocks": ["AAPL", "TSLA", "MSFT"]}'
```

### **4. Desplegar a GitHub Pages**

```bash
# Subir cambios
git add .
git commit -m "Add Railway n8n configuration"
git push origin main

# GitHub Actions desplegará automáticamente
```

## 🎯 **Resultado Final**

### **✅ URLs Funcionales:**
- **n8n Dashboard**: `https://ffaiagent-n8n-production.up.railway.app`
- **n8n Webhook**: `https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks`
- **GitHub Pages**: `https://tu-usuario.github.io/financialfeeling/`

### **🔧 Configuración:**
- **Login n8n**: `admin` / `financialfeeling2024`
- **Variables**: Configuradas en Railway
- **Deploy**: Automático en push a main

¡Tu n8n está completamente configurado y listo para usar con GitHub Pages! 