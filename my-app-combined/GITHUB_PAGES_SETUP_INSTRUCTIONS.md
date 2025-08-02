# 🔧 Configuración Correcta de GitHub Pages

## ⚠️ **Problema Resuelto: No puedes elegir gh-pages**

Esto es **normal** porque la rama `gh-pages` aún no existe. Se creará automáticamente.

## 📋 **Pasos Correctos:**

### **1. Configurar GitHub Pages (AHORA):**

Ve a: `https://github.com/benjamalegni/financialfeeling`

#### **Settings → Pages**

1. **Source**: Deploy from a branch
2. **Branch**: `main` ← **Usa esta rama por ahora**
3. **Folder**: `/ (root)`
4. **Save**

### **2. Configurar GitHub Secrets (OBLIGATORIO):**

#### **Settings → Secrets and variables → Actions → New repository secret**

Agrega estos **3 secrets**:

```bash
# Secret 1
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://yhxdyndkdhhnuginaekn.supabase.co

# Secret 2  
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeGR5bmRrZGhobnVnaW5hZWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTYxMTgsImV4cCI6MjA2NjI5MjExOH0.-3qFN_HEZx7i1rGhpaZg9edxoSRDgUkPzDYfrPNiIqI

# Secret 3
Name: NEXT_PUBLIC_N8N_WEBHOOK_URL
Value: https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks
```

### **3. Proceso Automático:**

1. **Primer deploy**: GitHub Actions creará la rama `gh-pages` automáticamente
2. **Después del primer deploy**: Podrás cambiar la configuración a `gh-pages`

### **4. Verificar el Deploy:**

#### **Monitorear GitHub Actions:**
1. Ve a tu repositorio en GitHub
2. Click en la pestaña "Actions"
3. Verifica que el workflow "Deploy to GitHub Pages" se ejecute correctamente

## 🔄 **Flujo Completo:**

### **Paso 1: Configurar con `main`**
- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`

### **Paso 2: Configurar Secrets**
- Agregar los 3 secrets mencionados arriba

### **Paso 3: Hacer un pequeño cambio**
```bash
# Hacer un pequeño cambio para trigger el deploy
echo "# Updated for GitHub Pages deploy" >> README.md
git add README.md
git commit -m "Trigger GitHub Pages deploy"
git push origin main
```

### **Paso 4: Monitorear el Deploy**
- Ve a la pestaña "Actions" en GitHub
- Verifica que el workflow se ejecute correctamente

### **Paso 5: Cambiar a `gh-pages` (OPCIONAL)**
Una vez que el primer deploy sea exitoso:
1. Ve a Settings → Pages
2. Cambia Branch de `main` a `gh-pages`
3. Save

## 🎯 **URLs Finales:**

- **GitHub Pages**: `https://benjamalegni.github.io/financialfeeling/`
- **n8n Dashboard**: `https://ffaiagent-n8n-production.up.railway.app`

## 🚨 **Solución de Problemas:**

### **Si el deploy falla:**
1. **Verificar Secrets**: Asegúrate de que los 3 secrets estén configurados
2. **Verificar n8n**: Confirma que el workflow esté activo en n8n
3. **Logs de Build**: Revisa los logs en GitHub Actions

### **Comandos de verificación:**
```bash
# Test n8n webhook
curl -X POST https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks \
  -H "Content-Type: application/json" \
  -d '{"stocks": ["AAPL", "TSLA", "MSFT"]}'
```

## ✅ **¡Listo!**

Una vez completados estos pasos, tu aplicación estará disponible en:
`https://benjamalegni.github.io/financialfeeling/`

**¡Financial Feeling estará disponible para usuarios de todo el mundo!** 🌍 