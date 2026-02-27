#!/bin/bash
# Vutler API Patches Initialization Script
# This script restores all patched files to the vutler-api container after restart
# Usage: ./init-patches.sh
# Run this after docker start/restart vutler-api

set -e

CONTAINER_NAME="vutler-api"
PATCHES_DIR="/home/ubuntu/vutler-patches"

echo "🔧 Vutler API Patches Initializer"
echo "=================================="

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "❌ Container ${CONTAINER_NAME} is not running"
  exit 1
fi

echo "✓ Container ${CONTAINER_NAME} is running"

# Define patches (source:destination)
declare -A PATCHES=(
  ["agents.js"]="/app/api/agents.js"
  ["index.js"]="/app/index.js"
  ["middleware-auth.js"]="/app/api/middleware/auth.js"
  ["jwt-auth.js"]="/app/api/auth/jwt-auth.js"
  ["providers.js"]="/app/api/providers.js"
  ["vaultbrix.js"]="/app/lib/vaultbrix.js"
)

# Apply patches
echo ""
echo "📦 Applying patches..."
for patch in "${!PATCHES[@]}"; do
  src="${PATCHES_DIR}/${patch}"
  dest="${PATCHES[$patch]}"
  
  if [ ! -f "$src" ]; then
    echo "⚠️  Skip: ${patch} (not found)"
    continue
  fi
  
  echo "  → ${patch} → ${dest}"
  docker cp "$src" "${CONTAINER_NAME}:${dest}"
done

echo ""
echo "✨ All patches applied!"
echo "🔄 Restarting container to load changes..."
docker restart ${CONTAINER_NAME} > /dev/null
sleep 5

echo "✓ Done! Container restarted with patched files."
