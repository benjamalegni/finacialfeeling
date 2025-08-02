# 🚀 GitHub Pages Deployment Guide

## ✅ **Estado Actual:**
- ✅ **Código subido**: Los cambios están en GitHub
- ✅ **n8n funcionando**: Railway configurado correctamente
- ✅ **Variables locales**: Configuradas en `.env.local`

## 📋 **Próximos Pasos para GitHub Pages:**

### **1. Configurar GitHub Secrets**

Ve a tu repositorio en GitHub:
```
https://github.com/benjamalegni/financialfeeling
```

#### **Settings → Secrets and variables → Actions**

Agrega estos secrets:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yhxdyndkdhhnuginaekn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeGR5bmRrZGhobnVnaW5hZWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTYxMTgsImV4cCI6MjA2NjI5MjExOH0.-3qFN_HEZx7i1rGhpaZg9edxoSRDgUkPzDYfrPNiIqI

# n8n Railway Configuration
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks
```

### **2. Habilitar GitHub Pages**

#### **Settings → Pages**

1. **Source**: Deploy from a branch
2. **Branch**: `gh-pages` (se creará automáticamente)
3. **Folder**: `/ (root)`
4. **Save**

### **3. Verificar GitHub Actions**

El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente cuando:
- Se haga push a `main`
- Se cree un Pull Request

### **4. URLs Finales**

Una vez desplegado:

- **GitHub Pages**: `https://benjamalegni.github.io/financialfeeling/`
- **n8n Dashboard**: `https://ffaiagent-n8n-production.up.railway.app`
- **n8n Webhook**: `https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks`

## 🔧 **Configuración del Workflow**

El archivo `.github/workflows/deploy.yml` ya está configurado para:

1. **Build**: Compilar la aplicación Next.js
2. **Export**: Generar archivos estáticos
3. **Deploy**: Subir a GitHub Pages

## 📊 **Monitoreo del Deploy**

### **Verificar el estado:**
1. Ve a tu repositorio en GitHub
2. Click en la pestaña "Actions"
3. Verifica que el workflow "Deploy to GitHub Pages" se ejecute correctamente

### **Logs del deploy:**
- Si hay errores, revisa los logs en la pestaña "Actions"
- Los errores más comunes son:
  - Variables de entorno faltantes
  - Problemas de build de Next.js

## 🎯 **Resultado Final**

Una vez completado el deploy:

### **✅ Funcionalidades:**
- ✅ **Análisis de stocks real** desde cualquier PC
- ✅ **Autenticación con Supabase**
- ✅ **Backend n8n en Railway**
- ✅ **Despliegue automático** en GitHub Pages
- ✅ **HTTPS seguro** en todas las URLs

### **🌐 Acceso Global:**
- **URL**: `https://benjamalegni.github.io/financialfeeling/`
- **Funciona desde**: Cualquier dispositivo en el mundo
- **Análisis**: Real con n8n en Railway

## 🚨 **Solución de Problemas**

### **Si el deploy falla:**

1. **Verificar Secrets:**
   - Asegúrate de que todos los secrets estén configurados
   - Los nombres deben coincidir exactamente

2. **Verificar n8n:**
   - Confirma que el workflow esté activo en n8n
   - Testea el webhook manualmente

3. **Logs de Build:**
   - Revisa los logs en GitHub Actions
   - Busca errores específicos

### **Comandos de verificación:**

```bash
# Test local
npm run build

# Test n8n webhook
curl -X POST https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks \
  -H "Content-Type: application/json" \
  -d '{"stocks": ["AAPL", "TSLA", "MSFT"]}'
```

## 🎉 **¡Listo para el Mundo!**

Tu aplicación estará disponible globalmente con:
- ✅ Análisis real de stocks
- ✅ Autenticación segura
- ✅ Backend robusto
- ✅ Despliegue automático

¡Financial Feeling estará disponible para usuarios de todo el mundo! 