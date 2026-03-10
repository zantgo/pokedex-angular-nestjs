# Makefile

.PHONY: start stop clean logs test-back test-front

# Levanta todos los servicios en segundo plano
start:
	@echo "🚀 Iniciando Pokedex Analytics Platform..."
	docker compose up -d
	@echo "✅ Plataforma levantada."
	@echo "🌐 Frontend: http://localhost:4200"
	@echo "🔌 Backend API: http://localhost:3000/api"

# Detiene los contenedores sin borrar datos
stop:
	@echo "⏸️ Deteniendo contenedores..."
	docker compose stop

# Destruye contenedores, redes y la base de datos (volúmenes)
clean:
	@echo "🧹 Limpiando entorno por completo..."
	docker compose down -v --remove-orphans

# Muestra los logs en tiempo real
logs:
	docker compose logs -f

# Ejecuta las pruebas del Backend (Unitarias + E2E)
test-back:
	@echo "🧪 Ejecutando pruebas unitarias del Backend..."
	docker exec -it pokedex_backend npm run test
	@echo "🧪 Ejecutando pruebas E2E del Backend..."
	docker exec -it pokedex_backend npm run test:e2e

# Ejecuta las pruebas del Frontend (Una sola vez, ideal para CI/CD)
test-front:
	@echo "🧪 Ejecutando pruebas del Frontend..."
	docker exec -it pokedex_frontend npm run test
	
# (EXTRA) Comando para entrar a la terminal de los contenedores si necesitas depurar
bash-back:
	docker exec -it pokedex_backend /bin/sh

bash-front:
	docker exec -it pokedex_frontend /bin/sh
