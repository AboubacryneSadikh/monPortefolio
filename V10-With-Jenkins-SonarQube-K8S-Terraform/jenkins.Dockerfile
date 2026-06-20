FROM jenkins/jenkins:lts-jdk21

USER root

# ─── Outils système ───────────────────────────────────────────────────────────
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    ca-certificates \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# ─── Docker CLI ───────────────────────────────────────────────────────────────
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# ─── kubectl ──────────────────────────────────────────────────────────────────
RUN curl -LO "https://dl.k8s.io/release/v1.35.1/bin/linux/amd64/kubectl" \
    && chmod +x kubectl \
    && mv kubectl /usr/local/bin/kubectl

# ─── Terraform ────────────────────────────────────────────────────────────────
RUN curl -LO "https://releases.hashicorp.com/terraform/1.9.8/terraform_1.9.8_linux_amd64.zip" \
    && unzip terraform_1.9.8_linux_amd64.zip \
    && mv terraform /usr/local/bin/terraform \
    && rm terraform_1.9.8_linux_amd64.zip

# ─── AWS CLI ──────────────────────────────────────────────────────────────────
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf awscliv2.zip aws

# ─── Vérifications ────────────────────────────────────────────────────────────
RUN docker --version \
    && kubectl version --client \
    && terraform version \
    && aws --version

USER jenkins
