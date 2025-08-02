# 🔧 Configuración de Variables de Entorno

## 📋 Variables Necesarias

### **1. Para Desarrollo Local (.env.local)**

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# n8n Railway Configuration
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-railway-app.railway.app/webhook-test/analyze-stocks
```

### **2. Para GitHub Pages (GitHub Secrets)**

En tu repositorio GitHub:
1. Ve a Settings > Secrets and variables > Actions
2. Agregar los siguientes secrets:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-railway-app.railway.app/webhook-test/analyze-stocks
```

## 🚀 Pasos para Configurar

### **Paso 1: Obtener URL de Railway**
1. Ve a tu proyecto en Railway
2. Copia la URL (ejemplo: `https://n8n-financial-feeling.railway.app`)
3. Agrega `/webhook-test/analyze-stocks` al final

### **Paso 2: Configurar n8n Workflow**
1. Ve a tu n8n: `https://tu-app.railway.app`
2. Login: `admin` / `financialfeeling2024`
3. Crear workflow "Stock Analysis"
4. Agregar webhook: `/webhook-test/analyze-stocks`
5. Activar workflow

### **Paso 3: Actualizar Variables**
```bash
# En .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-app.railway.app/webhook-test/analyze-stocks
```

### **Paso 4: Probar**
```bash
# Test local
curl -X POST https://tu-app.railway.app/webhook-test/analyze-stocks \
  -H "Content-Type: application/json" \
  -d '{"stocks": ["AAPL", "TSLA", "MSFT"]}'
```

## ✅ Verificación

### **1. n8n Funcionando**
- ✅ URL accesible: `https://tu-app.railway.app`
- ✅ Login funciona: `admin` / `financialfeeling2024`
- ✅ Webhook responde: POST a `/webhook-test/analyze-stocks`

### **2. Proyecto Configurado**
- ✅ Variables de entorno configuradas
- ✅ GitHub Secrets configurados
- ✅ Build exitoso en GitHub Actions

### **3. GitHub Pages**
- ✅ Despliegue automático
- ✅ URL pública: `https://tu-usuario.github.io/financialfeeling/`
- ✅ Análisis funcionando desde cualquier PC 