#!/bin/bash

# Usage:
# ./create_project.sh Embedded_Projects Arduino Smart_Traffic_Light

CATEGORY=$1
SUBCATEGORY=$2
PROJECT_NAME=$3

if [ -z "$CATEGORY" ] || [ -z "$SUBCATEGORY" ] || [ -z "$PROJECT_NAME" ]; then
  echo "❌ Usage: ./create_project.sh <Category> <Subcategory> <Project_Name>"
  exit 1
fi

BASE_PATH="$CATEGORY/$SUBCATEGORY/$PROJECT_NAME"

mkdir -p "$BASE_PATH"/{src,docs,assets}

cat <<EOF > "$BASE_PATH/README.md"
# $PROJECT_NAME

## 📌 Description
Brief description of the project.

## ⚙️ Tech Stack
- Tools:
- Hardware/Software:
- Language:

## 🧠 Working
Explain how the project works.

## 📊 Results
Screenshots / Output / Graphs.

## 🚀 Future Improvements
- Feature 1
- Feature 2
EOF

touch "$BASE_PATH/src/main.txt"

echo "✅ Project '$PROJECT_NAME' created successfully at $BASE_PATH"
