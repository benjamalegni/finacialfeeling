# 🔧 Configuración del Backend - Financial Feeling

## 🚨 **Problema Identificado**

El análisis de activos actualmente llama a `localhost:5678` (n8n local), lo que causa problemas:

- ❌ **No funciona desde otra PC**
- ❌ **No funciona en producción (GitHub Pages)**
- ❌ **No funciona en dispositivos móviles**

## ✅ **Soluciones Disponibles**

### **Opción 1: n8n en la Nube (Recomendado)**

#### **1.1 n8n Cloud (Pago)**
```bash
# Configurar variable de entorno
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-instancia.n8n.cloud/webhook-test/analyze-stocks
```

#### **1.2 n8n en VPS/Servidor**
```bash
# Configurar variable de entorno
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-servidor.com/webhook-test/analyze-stocks
```

#### **1.3 n8n en Railway/Heroku**
```bash
# Configurar variable de entorno
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-app.railway.app/webhook-test/analyze-stocks
```

### **Opción 2: API Externa (Alternativa)**

#### **2.1 Alpha Vantage API**
```typescript
// En lib/stockAnalysis.ts
const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${apiKey}`);
```

#### **2.2 Yahoo Finance API**
```typescript
// En lib/stockAnalysis.ts
const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock}`);
```

### **Opción 3: Mock Data (Actual - Funciona)**

El sistema actual usa datos mock cuando n8n no está disponible:

```typescript
// Mock data when n8n is not available
const mockAnalysisResult: AnalysisResult = {
  stocks: stocks.map((stock: string, index: number) => ({
    symbol: stock,
    analysis: {
      sentiment: ['positive', 'negative', 'neutral'][index % 3],
      confidence: Math.floor(Math.random() * 30) + 70,
      // ... más datos mock
    }
  })),
  note: 'Mock data - n8n not available'
};
```

## 🔧 **Configuración por Entorno**

### **Desarrollo Local**
```bash
# .env.local
NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/analyze-stocks
```

### **Producción (GitHub Pages)**
```bash
# En GitHub Secrets
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-n8n-cloud.com/webhook-test/analyze-stocks
```

### **Sin Backend (Solo Mock)**
```bash
# No configurar NEXT_PUBLIC_N8N_WEBHOOK_URL
# El sistema usará automáticamente datos mock
```

## 📊 **Comparación de Opciones**

| Opción | Pros | Contras | Costo |
|--------|------|---------|-------|
| **n8n Cloud** | ✅ Funciona en todas partes<br>✅ Análisis real | ❌ Requiere configuración<br>❌ Costo mensual | $20-50/mes |
| **n8n VPS** | ✅ Control total<br>✅ Análisis real | ❌ Requiere mantenimiento<br>❌ Configuración compleja | $5-20/mes |
| **API Externa** | ✅ Datos reales<br>✅ Fácil integración | ❌ Límites de rate<br>❌ Datos limitados | $0-100/mes |
| **Mock Data** | ✅ Siempre funciona<br>✅ Sin configuración | ❌ Datos no reales<br>❌ Sin análisis real | $0 |

## 🚀 **Configuración Rápida**

### **Para Desarrollo Local:**
```bash
# 1. Instalar n8n localmente
npm install -g n8n

# 2. Ejecutar n8n
n8n start

# 3. Configurar webhook en n8n
# 4. Agregar variable de entorno
echo "NEXT_PUBLIC_N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/analyze-stocks" >> .env.local
```

### **Para Producción:**
```bash
# 1. Crear cuenta en n8n.cloud
# 2. Configurar webhook
# 3. Agregar secret en GitHub
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-instancia.n8n.cloud/webhook-test/analyze-stocks
```

## 🎯 **Recomendación**

### **Para Desarrollo:**
- Usar **Mock Data** (actual) - funciona perfectamente
- Opcional: n8n local para testing

### **Para Producción:**
- **n8n Cloud** si quieres análisis real
- **Mock Data** si solo quieres demo

### **Para Múltiples PCs:**
- **n8n Cloud** es la mejor opción
- **Mock Data** funciona en todas partes

## 🔄 **Estado Actual**

- ✅ **Mock Data**: Funciona en todas las PCs
- ✅ **Fallback**: Si n8n falla, usa mock automáticamente
- ✅ **Configurable**: Fácil cambiar entre opciones
- ✅ **Producción Ready**: Listo para GitHub Pages

## 📝 **Próximos Pasos**

1. **Decidir qué opción usar**
2. **Configurar variables de entorno**
3. **Probar desde diferentes PCs**
4. **Desplegar a producción**

¡El sistema actual es robusto y funciona en todas las situaciones! 