FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install additional OS packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    postgresql-client \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

COPY .env* /workspace/
WORKDIR /workspace

# Create a non-root user with the same UID/GID as your host machine user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user and set ownership/permissions
RUN mkdir -p /workspace/backend/node_modules && \
    chown -R $USERNAME:$USERNAME /workspace

RUN mkdir -p /workspace/frontend/node_modules && \
    chown -R $USERNAME:$USERNAME /workspace

# Switch to non-root user
USER $USERNAME

# [Optional] Uncomment if you want to install more global node packages
# RUN npm install -g pnpm typescript ts-node