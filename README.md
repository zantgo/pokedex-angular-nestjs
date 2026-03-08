# 🚀 Pokedex Analytics Platform

Plataforma de análisis de especímenes Pokémon diseñada con una arquitectura desacoplada de alto rendimiento. El sistema permite la ingesta inteligente de datos, filtrado multidimensional y visualización reactiva mediante una infraestructura basada en **NestJS**, **Angular 17+** y **PostgreSQL**.

---

## 📋 Documentación Técnica
Para una comprensión profunda de las decisiones de diseño y el contrato de la aplicación, consulta la documentación detallada:

*   [🚀 Características & User Journeys](docs/FEATURES.md)
*   [🏗️ Arquitectura del Sistema](docs/ARCHITECTURE.md)
*   [💾 Base de Datos: Schema & TypeORM](docs/DATABASE_SCHEMA.md)
*   [📡 Especificación de la API REST](docs/API_SPEC.md)
*   [🛠️ Guía de Configuración (Setup)](docs/SETUP.md)

---

## 📂 Estructura del Proyecto

El repositorio sigue un enfoque de **Monorepo gestionado por Docker**, garantizando que el entorno de desarrollo sea idéntico en cualquier máquina.

```text
pokedex-analytics/
├── backend/            # API REST con NestJS
├── frontend/           # SPA con Angular 17+
├── docs/               # Documentación técnica completa
├── docker-compose.yml  # Orquestación de servicios
├── Makefile            # Automatización de tareas (Comando mágico)
└── README.md           # Este archivo
```

---

## 🚀 Inicio Rápido (Quick Start)

### Requisitos Previos
*   **Docker Engine** (v24.0.0+) y **Docker Compose** (v2.0.0+).
*   **WSL2 (Windows):** Obligatorio para usuarios de Windows. Asegúrate de trabajar dentro del sistema de archivos de Linux (`/home/usuario/`).
*   **GNU Make:** Instalado en tu sistema (`sudo apt install make`).

### Despliegue
Para levantar el ecosistema completo (DB, Backend y Frontend), ejecuta en la raíz del proyecto:

```bash
make start
```

Este comando automatiza la creación de redes, el levantamiento de la base de datos, la instalación de dependencias y el arranque de los servidores de desarrollo.

*   **Frontend:** `http://localhost:4200`
*   **Backend:** `http://localhost:3000/api`

---

## 🛠️ Comandos de Gestión (Makefile)

Utiliza `make` para simplificar el flujo de trabajo diario:

| Comando | Acción |
| :--- | :--- |
| `make start` | Inicia todos los servicios en modo background. |
| `make logs` | Visualiza los logs en tiempo real. |
| `make stop` | Pausa los contenedores sin perder datos. |
| `make clean` | Detiene y **destruye** todo (borra volúmenes y DB). |
| `make test-back` | Ejecuta la suite de pruebas del Backend. |
| `make test-front` | Ejecuta la suite de pruebas del Frontend. |

---

## 🧪 Testing y Calidad

El proyecto garantiza la estabilidad mediante una estrategia de pruebas unificada utilizando **Jest** para todo el ecosistema (Backend y Frontend), lo que permite ejecutar suites de pruebas rápidas y consistentes.

*   **Backend (NestJS):**
    *   **Unitarias:** Pruebas de servicios y lógica de negocio (Jest).
    *   **Integración:** Pruebas de controladores y endpoints mediante **Supertest**.
*   **Frontend (Angular):**
    *   **Unitarias:** Pruebas de componentes, *Pipes* y servicios mediante **Jest** (configurado para el ecosistema Angular).
    *   **Enfoque:** Verificación del estado reactivo (*Signals*) y fidelidad de los *Pipes* de transformación de unidades.

---

## 💡 Troubleshooting Común

*   **Error de DNS:** Si la sincronización falla, configura los DNS de Google en tu daemon de Docker (`/etc/docker/daemon.json`): `{"dns":["8.8.8.8", "8.8.4.4"]}`.
*   **Permisos en Linux:** Si encuentras errores de escritura, ejecuta `sudo chown -R $USER:$USER .` para reclamar la propiedad de los archivos generados por Docker.
*   **Hot Reload:** Asegúrate de que el código esté en el sistema de archivos de WSL2, **nunca** en `/mnt/c/`.

