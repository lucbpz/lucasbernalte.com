#!/bin/bash

# Build and push Docker image for lucasbernalte.com

# Configuration
IMAGE_NAME="lucasbernalte981/lucasbernalte-web"
VERSION="latest"
DOCKERFILE="Dockerfile"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🐳 Building Docker image for lucasbernalte.com${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Build the Docker image
echo -e "${YELLOW}📦 Building Docker image...${NC}"
if docker build -t $IMAGE_NAME:$VERSION -f $DOCKERFILE .; then
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
else
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi

# Tag with additional version if provided
if [ ! -z "$1" ]; then
    VERSION_TAG="$1"
    docker tag $IMAGE_NAME:$VERSION $IMAGE_NAME:$VERSION_TAG
    echo -e "${GREEN}🏷️  Tagged image with version: $VERSION_TAG${NC}"
fi

# Push to Docker Hub
echo -e "${YELLOW}🚀 Pushing to Docker Hub...${NC}"
if docker push $IMAGE_NAME:$VERSION; then
    echo -e "${GREEN}✅ Image pushed successfully to Docker Hub!${NC}"
    echo -e "${GREEN}📍 Image available at: https://hub.docker.com/r/$IMAGE_NAME${NC}"
else
    echo -e "${RED}❌ Docker push failed! Make sure you're logged in to Docker Hub.${NC}"
    echo -e "${YELLOW}💡 Try: docker login${NC}"
    exit 1
fi

# Push additional version tag if it exists
if [ ! -z "$VERSION_TAG" ]; then
    docker push $IMAGE_NAME:$VERSION_TAG
    echo -e "${GREEN}✅ Version $VERSION_TAG pushed successfully!${NC}"
fi

echo -e "${GREEN}🎉 All done! Your image is now available on Docker Hub.${NC}"
echo -e "${GREEN}🔗 Pull with: docker pull $IMAGE_NAME:$VERSION${NC}"
echo -e "${GREEN}▶️  Run with: docker run -p 3000:3000 $IMAGE_NAME:$VERSION${NC}"