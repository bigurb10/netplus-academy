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

    # Weekly feedback email (mail_feedback_report.py). Delivery is an authenticated
    # SMTP relay over STARTTLS: Hetzner blocks outbound 25, and Gmail refuses
    # unauthenticated mail from a fresh IP outright, so there is no direct-delivery
    # option. Any of these empty (port aside) means "not configured", and the
    # mailer exits 2 without sending. The API itself never reads them.
    report_to: str = ""
    report_from: str = ""
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""

    @property
    def allowed_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins_raw.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
