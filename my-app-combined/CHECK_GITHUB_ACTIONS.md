# 🔍 Verificar GitHub Actions

## 📋 **Pasos para verificar que GitHub Actions funcione:**

### **1. Ir a la pestaña Actions:**
Ve a: `https://github.com/benjamalegni/financialfeeling`

Click en la pestaña **"Actions"** (no "Code")

### **2. Verificar workflows disponibles:**
Deberías ver estos workflows:
- ✅ **Deploy to GitHub Pages**
- ✅ **Deploy static content to Pages** 
- ✅ **Deploy to GitHub Pages** (nuevo)

### **3. Si no ves workflows:**
1. **Verificar permisos**: Asegúrate de que tienes permisos de administrador en el repositorio
2. **Habilitar Actions**: Ve a Settings → Actions → General → Allow all actions and reusable workflows

### **4. Ejecutar workflow manualmente:**
1. Ve a la pestaña "Actions"
2. Click en "Deploy to GitHub Pages" (cualquiera de los 3)
3. Click en "Run workflow"
4. Selecciona la rama "main"
5. Click "Run workflow"

### **5. Verificar secrets:**
**Settings → Secrets and variables → Actions**

Asegúrate de tener estos 3 secrets:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://yhxdyndkdhhnuginaekn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloeGR5bmRrZGhobnVnaW5hZWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTYxMTgsImV4cCI6MjA2NjI5MjExOH0.-3qFN_HEZx7i1rGhpaZg9edxoSRDgUkPzDYfrPNiIqI
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://ffaiagent-n8n-production.up.railway.app/webhook-test/analyze-stocks
```

### **6. Configurar GitHub Pages:**
**Settings → Pages**
- **Source**: GitHub Actions
- **Save**

## 🚨 **Solución de Problemas:**

### **Si no ves la pestaña Actions:**
1. Ve a Settings → Actions → General
2. Selecciona "Allow all actions and reusable workflows"
3. Save

### **Si el workflow falla:**
1. Click en el workflow fallido
2. Revisa los logs para ver el error específico
3. Los errores más comunes son:
   - Secrets faltantes
   - Problemas de build de Next.js

### **Si no se ejecuta automáticamente:**
1. Ve a la pestaña Actions
2. Click en "Run workflow"
3. Selecciona la rama "main"
4. Ejecuta manualmente

## ✅ **Verificación exitosa:**

Una vez que el workflow se ejecute correctamente, verás:
- ✅ **Build job**: Completado
- ✅ **Deploy job**: Completado
- ✅ **URL**: `https://benjamalegni.github.io/financialfeeling/`

## 🎯 **URLs importantes:**

- **GitHub Actions**: `https://github.com/benjamalegni/financialfeeling/actions`
- **GitHub Pages**: `https://benjamalegni.github.io/financialfeeling/`
- **n8n Dashboard**: `https://ffaiagent-n8n-production.up.railway.app`

**¡Una vez que veas el workflow ejecutándose, tu aplicación estará lista!** 🚀 