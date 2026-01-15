# Estructura del Proyecto Front_RPA_Log

Esta es la estructura actual de carpetas y archivos principales del proyecto.

```text
Front_RPA_Log/
├── .agent/workflows/                   # Workflows de desarrollo
├── src/
│   ├── assets/                         # Activos estáticos
│   ├── components/                     # Componentes React
│   │   ├── ui/                         # Biblioteca de componentes UI reutilizables (Design System)
│   │   │   ├── badge/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── drawer/
│   │   │   ├── input/
│   │   │   ├── table/
│   │   │   ├── Skeleton.tsx            # Componente de carga (Skeleton Loader)
│   │   │   └── index.ts
│   │   ├── IncidentDetailsDrawer.tsx   # Drawer para detalles de incidentes
│   │   ├── IncidentDetailsDrawer.test.tsx # Tests unitarios del Drawer
│   │   ├── Layout.tsx                  # Layout principal con navegación
│   │   └── StatCard.tsx                # Componente de tarjeta estadística
│   ├── context/                        # Estado global (React Context)
│   │   ├── LogContext.tsx              # Gestión de datos de logs
│   │   └── ToastContext.tsx            # Sistema de notificaciones
│   ├── lib/
│   │   └── utils.ts                    # Utilidades (clases, fechas)
│   ├── pages/                          # Vistas de la aplicación (Rutas)
│   │   ├── ClientDetail.tsx
│   │   ├── Dashboard.tsx
│   │   └── LogsPage.tsx
│   ├── test/                           # Configuración de pruebas
│   │   └── setup.ts
│   ├── App.tsx                         # Componente raíz con Rutas y Lazy Loading
│   ├── index.css                       # Estilos globales y directivas Tailwind
│   ├── main.tsx                        # Punto de entrada de la aplicación
│   └── types.ts                        # Definiciones de tipos TypeScript
├── public/                             # Archivos públicos (favicon, csv datos)
├── .gitignore                          # Exclusiones de Git
├── CHANGELOG.md                        # Registro de cambios
├── index.html                          # HTML base
├── package.json                        # Dependencias y scripts
├── tailwind.config.js                  # Configuración de estilos y tokens
├── tsconfig.json                       # Configuración base de TypeScript
├── vite.config.ts                      # Configuración del bundler Vite
└── vitest.config.ts                    # Configuración del runner de pruebas Vitest
```
