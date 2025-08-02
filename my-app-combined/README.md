# Financial Feeling - Combined App

Una aplicación web moderna para análisis de activos financieros con IA, construida con Next.js, Supabase y Tailwind CSS.

## 🚀 Características

- **Análisis de IA**: Análisis de sentimiento de activos financieros
- **Portafolio Personal**: Gestión de activos seleccionados
- **Autenticación**: Sistema de login/signup con Supabase
- **Interfaz Moderna**: Diseño elegante con gradientes animados
- **Responsive**: Funciona en todos los dispositivos
- **Tiempo Real**: Actualizaciones automáticas del análisis

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Auth, Database)
- **Deployment**: GitHub Pages
- **Análisis**: n8n (opcional), Mock Data

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/financialfeeling.git
cd financialfeeling

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_de_supabase
```

### Supabase Setup

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ejecuta las migraciones en `supabase_migrations/`
3. Configura las políticas RLS
4. Configura autenticación (GitHub OAuth opcional)

## 🚀 Despliegue en GitHub Pages

### Configuración Automática

El proyecto está configurado para desplegar automáticamente en GitHub Pages:

1. **Habilitar GitHub Pages**:
   - Ve a Settings > Pages
   - Source: GitHub Actions

2. **Configurar Secrets** (opcional):
   - Ve a Settings > Secrets and variables > Actions
   - Agrega las variables de entorno si necesitas funcionalidad completa

3. **Push a main**:
   - Cada push a la rama `main` desplegará automáticamente

### Despliegue Manual

```bash
# Construir el proyecto
npm run build

# Los archivos estáticos se generan en out/
# Subir a GitHub Pages
```

### URL de Producción

Una vez desplegado, estará disponible en:
`https://[tu-usuario].github.io/[nombre-del-repositorio]/`

## 📁 Estructura del Proyecto

```
my-app-combined/
├── app/                    # App Router de Next.js
│   ├── dashboard/         # Página del dashboard
│   ├── login/            # Página de login
│   ├── signup/           # Página de registro
│   └── page.tsx          # Página principal
├── components/            # Componentes reutilizables
│   ├── shared-sidebar.tsx
│   ├── dashboard-content.tsx
│   └── ui/               # Componentes de shadcn/ui
├── lib/                   # Utilidades y configuraciones
│   ├── supabaseClient.ts
│   ├── stockAnalysis.ts
│   └── database.types.ts
├── .github/workflows/     # GitHub Actions
└── supabase_migrations/   # Migraciones de base de datos
```

## 🎯 Funcionalidades Principales

### 1. Análisis de Activos
- Selección de múltiples activos
- Análisis de sentimiento con IA
- Recomendaciones automáticas
- Visualización de resultados

### 2. Gestión de Portafolio
- Agregar/eliminar activos
- Persistencia en base de datos
- Interfaz intuitiva
- Sincronización automática

### 3. Autenticación
- Login/Signup con Supabase
- Sesiones persistentes
- Protección de rutas
- Perfiles de usuario

### 4. Interfaz de Usuario
- Diseño moderno y responsive
- Gradientes animados
- Componentes interactivos
- Navegación fluida

## 🔄 Flujo de Trabajo

1. **Selección de Activos**: Usuario selecciona activos en el portafolio
2. **Análisis**: Presiona "RUN" para ejecutar análisis de IA
3. **Resultados**: Visualiza sentimiento, confianza y recomendaciones
4. **Gestión**: Agrega o elimina activos según sea necesario

## 🐛 Troubleshooting

### Problemas Comunes

1. **Build falla**:
   - Verifica que todas las dependencias estén instaladas
   - Revisa los logs del workflow en GitHub Actions

2. **Autenticación no funciona**:
   - Verifica las variables de entorno
   - Asegúrate de que Supabase esté configurado correctamente

3. **Análisis no funciona**:
   - El análisis usa datos mock por defecto
   - Para análisis real, configura n8n

### Logs de Despliegue

Para ver los logs del despliegue:
1. Ve a tu repositorio en GitHub
2. Ve a Actions
3. Selecciona el workflow "Deploy to GitHub Pages"
4. Revisa los logs del job "build" y "deploy"

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte, abre un issue en GitHub o contacta al equipo de desarrollo.

# Updated for GitHub Pages deploy

# Trigger GitHub Actions workflow
