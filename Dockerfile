FROM mcr.microsoft.com/playwright:v1.44.1-jammy

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

RUN pnpm install --frozen-lockfile

CMD ["/bin/bash"]
