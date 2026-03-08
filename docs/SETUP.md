# 🛠️ Guía de Configuración y Despliegue Local (Setup)

Este documento proporciona las instrucciones paso a paso para levantar el entorno de desarrollo de la **Pokedex Analytics Platform**. El proyecto utiliza una arquitectura contenerizada para garantizar la consistencia entre los entornos de desarrollo, pruebas y producción.

---

## 1. Prerrequisitos del Sistema

Para ejecutar este proyecto, necesitas tener instaladas las siguientes herramientas en tu máquina local:

*   **Docker Engine** (v24.0.0+) y **Docker Compose** (v2.0.0+)
*   **Git** (v2.30+)
*   **GNU Make**: Es la herramienta principal para la automatización de despliegue, gestión de permisos y ejecución de pruebas. Sin `make`, los comandos de automatización no estarán disponibles.

### ⚠️ Nota importante para usuarios de Windows
Si estás utilizando Windows, es **estrictamente obligatorio** utilizar[WSL2 (Windows Subsystem for Linux)](https://learn.microsoft.com/es-es/windows/wsl/install). No ejecutes estos comandos nativamente en PowerShell o CMD, ya que la gestión de permisos de volúmenes de Docker y los scripts Bash (como el Makefile) fallarán. Ubuntu en WSL2 es el entorno soportado.

---

## 2. Instalación y Primer Inicio (Quick Start)

Hemos preparado un `Makefile` que automatiza todo el proceso de construcción, instalación de dependencias y migraciones.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/pokedex-angular-nestjs.git
    cd pokedex-angular-nestjs
    ```

2.  **Ejecutar el comando mágico:**
    ```bash
    make start
    ```

Este comando realizará las siguientes acciones por ti:
*   Levantará la base de datos PostgreSQL.
*   Esperará de forma inteligente (haciendo pings) hasta que la DB esté lista para aceptar conexiones.
*   Instalará las dependencias de Node.js (`npm install`) tanto en el contenedor del Backend como en el del Frontend.
*   Levantará los servidores de desarrollo de NestJS y Angular.

3.  **Verificar el Despliegue:**
    *   **Frontend (Angular UI):** Abre tu navegador en [http://localhost:4200](http://localhost:4200)
    *   **Backend (NestJS API):** Disponible en[http://localhost:3000/api](http://localhost:3000/api)
    *   **Base de Datos (PostgreSQL):** Expuesta en el puerto `5432` (Usuario: `user`, Contraseña: `password`, BD: `pokedex`).

---

## 3. Comandos Útiles (Referencia del Makefile)

Si necesitas gestionar el ciclo de vida del proyecto manualmente, puedes utilizar los siguientes comandos:

| Comando | Descripción |
| :--- | :--- |
| `make start` | Levanta todos los servicios en segundo plano (`-d`) e instala dependencias. |
| `make logs` | Muestra los logs en tiempo real de todos los contenedores (Angular, NestJS y DB). |
| `make stop` | Pausa los contenedores sin destruir los datos ni los volúmenes. |
| `make clean` | Detiene y **destruye** los contenedores, redes y volúmenes (Borra la base de datos). |
| `make test-back` | Ejecuta la suite de pruebas unitarias y E2E de NestJS (`npm run test`). |
| `make test-front` | Ejecuta la suite de pruebas unitarias de Angular (`npm run test`). |

---

## 4. Troubleshooting (Solución de Problemas Frecuentes)

### Problema: Error de red `cURL Error (7)` o `ENOTFOUND` al sincronizar la Pokedex.
**Causa:** El contenedor de NestJS no puede resolver nombres de dominio externos (DNS) debido a la configuración de red de Docker en Linux/WSL2.
**Solución:** Modifica el archivo `/etc/docker/daemon.json` en tu máquina *Host* (tu laptop) y agrega los DNS de Google:
```json
{
  "dns":["8.8.8.8", "8.8.4.4"]
}
```
Luego, reinicia el servicio de Docker (`sudo systemctl restart docker`) y vuelve a levantar el proyecto.

### Problema: El frontend de Angular se queda en blanco o no recarga con los cambios (Hot Reload).
**Causa:** Los volúmenes de Docker no están mapeando correctamente los cambios de archivos en sistemas Windows o MacOS bajo ciertas configuraciones.
**Solución:** Asegúrate de estar ejecutando el proyecto dentro de WSL2 (Windows) y que los archivos vivan en el sistema de archivos de Linux (ej. `~/proyectos/pokedex`), **no** en una unidad montada de Windows (ej. `/mnt/c/proyectos/pokedex`).

### Problema: Errores de Permisos (Permission Denied) en Linux
**Causa:** Docker en Linux a menudo crea archivos (como la carpeta `node_modules` o archivos de caché) bajo el usuario `root`.
**Solución:** Ejecuta el comando para reclamar la propiedad de los archivos:
```bash
sudo chown -R $USER:$USER .
```
