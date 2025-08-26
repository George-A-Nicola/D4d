# Mieterstrom Calculator - Makefile
.PHONY: help install dev build start clean type-check

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Installation
install: ## Install dependencies
	npm install

# Development
dev: ## Start development server
	npm run dev

build: ## Build the application
	npm run build

start: ## Start production server
	npm run start

# Code Quality
type-check: ## Run TypeScript type checking
	npm run type-check

# Clean up
clean: ## Clean build artifacts and dependencies
	rm -rf .next
	rm -rf node_modules
	rm -rf dist

# Full setup (for new environments)
setup: install ## Complete setup for new environment
	@echo "🎉 Setup complete! Run 'make dev' to start development server"

# Production deployment prep
prod-build: install ## Build for production
	npm run build
