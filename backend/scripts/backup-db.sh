#!/usr/bin/env bash
# ==============================================================================
# Script de Sauvegarde Automatique de la Base de Données PostgreSQL
# Burkina Nature & Culture — Parc Urbain Bangr-Weoogo
# ==============================================================================

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/bf_nature_db_${TIMESTAMP}.sql.gz"

DB_HOST="${PGHOST:-localhost}"
DB_PORT="${PGPORT:-5432}"
DB_NAME="${PGDATABASE:-bf_nature_db}"
DB_USER="${PGUSER:-postgres}"

mkdir -p "$BACKUP_DIR"

echo "🔄 Démarrage de la sauvegarde automatique de PostgreSQL..."
echo "📂 Fichier cible : ${BACKUP_FILE}"

if command -v pg_dump &> /dev/null; then
    PGPASSWORD="${PGPASSWORD:-postgres}" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" | gzip > "$BACKUP_FILE"
    echo "✅ Sauvegarde réussie : ${BACKUP_FILE}"
else
    echo "⚠️ pg_dump n'est pas disponible dans le PATH local. Sauvegarde ignorée en mode simulation."
fi

# Conserver uniquement les 14 dernières sauvegardes
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +14 -exec rm -f {} \;
echo "🧹 Nettoyage des anciennes sauvegardes effectué (conservation 14 jours)."
