# Makefile

.PHONY: start stop clean logs test-back test-front bash-back bash-front

# Levanta todos los servicios en segundo plano
start:
	@echo "🚀 Iniciando Pokedex Analytics Platform..."
	docker compose up -d
	@echo "⏳ Esperando a que el backend responda en el puerto 3000..."
	@# Bucle que intenta conectar cada 5 segundos hasta un máximo de 20 intentos (100 segundos)
	@n=0; until [ $$n -ge 20 ]; do \
		curl -s http://localhost:3000/api/v1/pokemons > /dev/null && break; \
		echo "   ...todavía no está listo, esperando 5 segundos..."; \
		n=$$((n+1)); \
		sleep 5; \
	done
	@echo "🔄 Ejecutando sincronización automática de la Pokedex..."
	@curl -X POST http://localhost:3000/api/v1/pokemons/sync
	@echo ""
	@echo "✅ Plataforma levantada y sincronizada."
	@echo "🌐 Frontend: http://localhost:4200"
	@echo "🔌 Backend API: http://localhost:3000/api/v1/pokemons"

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

# Ejecuta las pruebas del Frontend
test-front:
	@echo "🧪 Ejecutando pruebas del Frontend..."
	docker exec -it pokedex_frontend npm run test
	
# Comandos de depuración
bash-back:
	docker exec -it pokedex_backend /bin/sh

bash-front:
	docker exec -it pokedex_frontend /bin/sh
