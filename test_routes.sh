#!/bin/bash

# PORT de l'API
BASE_URL="http://localhost:3000"

# Fonction pour tester une route POST
test_post() {
  local endpoint=$1
  local token=$2
  local data=$3
  echo "Testing POST ${BASE_URL}${endpoint} with data ${data}"

  if [[ "$endpoint" == "/admin/login" ]]; then
    # Pas besoin de header Authorization pour la route de login
    curl -X POST "${BASE_URL}${endpoint}" -H "Content-Type: application/json" -d "${data}"
  else
    # Ajoute l'Authorization header pour les autres routes
    curl -X POST "${BASE_URL}${endpoint}" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" -d "${data}"
  fi

  echo -e "\n"
}

# Fonction pour tester une route PUT
test_put() {
  local endpoint=$1
  local token=$2
  local data=$3
  echo "Testing PUT ${BASE_URL}${endpoint} with data ${data}"
  curl -X PUT "${BASE_URL}${endpoint}" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" -d "${data}"
  echo -e "\n"
}

# Fonction pour tester une route GET
test_get() {
  local endpoint=$1
  local token=$2
  echo "Testing GET ${BASE_URL}${endpoint} with Authorization header"
  curl -X GET "${BASE_URL}${endpoint}" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}"
  echo -e "\n"
}

# Fonction pour tester une route DELETE
test_delete() {
  local endpoint=$1
  local token=$2
  local data=$3
  echo "Testing DELETE ${BASE_URL}${endpoint} with data ${data}"
  curl -X DELETE "${BASE_URL}${endpoint}" -H "Content-Type: application/json" -H "Authorization: Bearer ${token}" -d "${data}"
  echo -e "\n"
}

# Récupération du token JWT pour l'authentification
RESPONSE=$(curl -X POST "${BASE_URL}/admin/login" -H "Content-Type: application/json" -d '{"email": "Doe.Jane@example.com", "password": "qwerty123456"}')

echo "Response: $RESPONSE"

# Extraction du token avec grep
TOKEN=$(echo "$RESPONSE" | grep -oP '"token":\s*"\K[^"]+')

if [ -z "$TOKEN" ]; then
  echo "Token not found in response"
  exit 1
else
  echo "Token successfully retrieved: $TOKEN"
fi

# Tests pour les admins
test_get "/admin/account/17" "$TOKEN"

# Tests Associations
test_post "/admin/association/add" "$TOKEN" '{"nom": "Musicien de tous les jours", "description": "Club de musique urbain "}'

test_put "/admin/association/update/5" "$TOKEN" '{"nom": "Soutien aux enfants", "description": "Protection des enfants dans le besoin"}'
test_get "/admin/association/get/5" "$TOKEN"

# Tests Campagnes
test_put "/admin/campaign/update/1" "$TOKEN" '{"status": "1"}'
test_put "/admin/campaign/update/4" "$TOKEN" '{"status": "1"}'
test_put "/admin/campaign/update/2" "$TOKEN" '{"status": "1"}'
test_get "/admin/campaign/get/11" "$TOKEN"
test_get "/admin/campaign/get/4" "$TOKEN"
# test_delete "/admin/campaign/delete/14" "$TOKEN"

# Tests Campagnes Actives
test_get "/admin/campaign/get/active" "$TOKEN"
test_post "/admin/campaign/ad/add" "$TOKEN" '{"campagne_id": "1", "publicite_id": "5"}'
test_get "/admin/campaign/ad/get/1" "$TOKEN"

# Tests Mécènes
test_post "/admin/mecene/add" "$TOKEN" '{"nom": "Boulangerie Inc", "email": "pain@hotmail.com", "telephone": "03 75 36 35 22", "adresse": "Adresse exemple"}'
test_get "/admin/mecene/get/10" "$TOKEN"

# Tests Publicités
test_post "/admin/ad/add" "$TOKEN" '{"titre": "Support Our Cause", "descriptif": "Join us in our mission to make the world better."}'
test_get "/admin/ad/get/15" "$TOKEN"
