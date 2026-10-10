"""Convierte las capturas del portal a WebP (consulta y fiscal, de la sección de módulos).

Uso: python scripts/optimize-screens.py <carpeta con consulta.png y fiscal.png>
Las del hero, la de Agenda y public/og.png salen de scripts/hero-screens.py.
"""
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SCREENS = ("consulta", "fiscal")
SIZE = (1440, 778)


def main(raw_dir: Path) -> None:
    out = ROOT / "src" / "assets" / "screens"
    out.mkdir(parents=True, exist_ok=True)
    for name in SCREENS:
        img = Image.open(raw_dir / f"{name}.png").convert("RGB")
        if img.size != SIZE:
            raise SystemExit(f"{name}.png mide {img.size}; se esperaba {SIZE}")
        target = out / f"{name}.webp"
        img.save(target, "WEBP", quality=82, method=6)
        print(f"{target.name}: {target.stat().st_size // 1024} KB")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Uso: python scripts/optimize-screens.py <carpeta>")
    main(Path(sys.argv[1]))
