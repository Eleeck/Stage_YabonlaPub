#!/bin/bash

# PORT de l'API
BASE_URL="http://localhost:3000"

# Fonction pour tester une route POST
test_post() {
  local endpoint=$1
  local data=$2
  echo "Testing POST ${BASE_URL}${endpoint} with data ${data}"

  if [[ "$endpoint" == "/admins/login" ]]; then
    # Ne pas ajouter l'en-tête Authorization pour la connexion
    curl -X POST "${BASE_URL}${endpoint}" -H "Content-Type: application/json" -d "${data}"
  else
    curl -X POST "${BASE_URL}${endpoint}" -H "Content-Type: application/json" -H "Authorization: Bearer ${TOKEN}" -d "${data}"
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
RESPONSE=$(curl -X POST "${BASE_URL}/admins/login" -H "Content-Type: application/json" -d '{"email": "Doe.Jane@example.com", "password": "qwerty123456"}')

echo "Response: $RESPONSE"

Extraction du token
TOKEN=$(echo "$RESPONSE" | grep -oP '"token":\s*"\K[^"]+')

if [ -z "$TOKEN" ]; then
  echo "Token not found in response"
  exit 1
else
  echo "Token successfully retrieved: $TOKEN"
fi

# Tests pour les admins
# test_post "/admins/create_account" "$TOKEN" '{"nom": "Doe", "prenom": "Jane", "email": "Doe.Jane@example.com", "password": "qwerty123456"}'
test_post "/admins/login" '{"email": "Doe.Jane@example.com", "password": "qwerty123456"}'
test_get "/admins/account/17" "$TOKEN"

# Tests Associations
# test_post "/admins/associations/ajout_assoc" "$TOKEN" '{"nom": "GreenPeace", "description": "Environment protection"}'
test_get "/admins/associations/select_assoc/3" 

# Tests Campagnes
# test_post "/admins/campagnes/ajout_campagne" "$TOKEN" '{"nom": "Sauver les tortues", "description": "Sensibiliser à la protection des tortues", "date_debut": "2025-02-20", "date_fin": "2025-04-01"}'
test_put "/admins/campagnes/change-campagne/14" "$TOKEN" '{"date_debut": "2025-02-20"}'
test_get "/admins/campagnes/select_campagne/14" "$TOKEN"
# test_delete "/admins/campagnes/supprime_campagne/12" "$TOKEN" '{}'

# Tests Campagnes Actives
# test_post "/admins/campagnes/actives/ajout_campagne_active" "$TOKEN" '{"campagne_id": "1", "publicite_id": "3"}'
test_put "/admins/campagnes/actives/change_campagne_active/9" "$TOKEN" '{"status": "active"}'
test_get "/admins/campagnes/actives/select_campagnes_actives" "$TOKEN"

# Tests Mécènes
# test_post "/admins/mecenes/ajout_mecene" "$TOKEN" '{"nom": "Mecene Inc", "email": "info@hotmail.com"}'
test_get "/admins/mecenes/select/1" "$TOKEN"

# Tests Publicités
# test_post "/admins/publicites/ajout_pub" "$TOKEN" '{"titre": "Support Our Cause", "descriptif": "Join us in our mission to make the world better."}'
test_get "/admins/publicites/select_pub/15" "$TOKEN"
