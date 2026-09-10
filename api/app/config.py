"""Settings, read from PROGRESS_* environment variables or api/.env."""

from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_prefix="PROGRESS_", extra="ignore"
    )

    # No usable default: the password lives on the box. See tunnel.md.
    db_url: str = ""
    # An empty issuer means no token can ever verify. There is no open mode:
    # unlike ServiceForge, every row here belongs to one identified learner.
    auth_issuer: str = ""
    auth_audience: str = "https://api.fieldreadyacademy.com"
    jwks_url: str = ""
    # Comma-separated. Kept as a string because pydantic-settings parses a bare
    # list[str] as JSON, which turns a plain comma list into a startup crash.
    allowed_origins_raw: str = "https://fieldreadyacademy.com,http://localhost:8000"
    max_blob_bytes: int = 2_000_000

    @property
    def allowed_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins_raw.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
