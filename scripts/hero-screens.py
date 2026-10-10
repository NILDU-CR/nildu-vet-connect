"""Prepara las capturas del hero y de los módulos: recorta, redimensiona y exporta WebP.

Uso: python scripts/hero-screens.py
Lee capturas/ (ignorada por git) y escribe src/assets/screens/hero/, src/assets/screens/modulos/ y public/og.png.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "capturas"
SCREENS = ROOT / "src" / "assets" / "screens"
OUT = SCREENS / "hero"

# (archivo origen, carpeta destino, archivo destino, recorte (izq, arriba, der, abajo) o None, ancho final, calidad WebP)
JOBS = [
    ("hero-agenda-mes.webp", OUT, "agenda-mes.webp", (0, 38, 2000, 995), 1600, 84),
    ("flotante-ficha-canelo.png", OUT, "ficha.webp", None, 398, 84),
    ("flotante-peso-canelo.png", OUT, "peso.webp", (23, 123, 1517, 531), 720, 84),
    ("flotante-archivos-canelo.png", OUT, "archivos.webp", (27, 14, 1114, 341), 760, 84),
    # Citas de Canelo con la dueña demo (Daniela). Nunca uses flotante-citas-canelo-original.png: trae un nombre real.
    ("flotante-citas-canelo.png", OUT, "citas.webp", (0, 4, 656, 493), 600, 84),
    # Pestaña Agenda de la sección de módulos: sin recorte, a 1440 de ancho, como consulta.webp y fiscal.webp.
    ("modulo-agenda-semana.png", SCREENS / "modulos", "agenda.webp", None, 1440, 82),
    # Inventario: Existencias del demo, sin la barra de scroll de la derecha.
    ("modulo-inventario.png", SCREENS / "modulos", "inventario.webp", (0, 0, 1558, 749), 1440, 82),
    # Tareas: el tablero del demo, sin la barra de scroll y sin el fondo vacío de las columnas.
    ("modulo-tareas.png", SCREENS / "modulos", "tareas.webp", (0, 0, 1558, 530), 1440, 82),
    # Reportes: solo el Panel de control del inicio (la portada del demo es una foto ajena).
    ("modulo-reportes.png", SCREENS / "modulos", "reportes.webp", (856, 68, 1500, 476), 1440, 82),
]


def main() -> None:
    for src, out_dir, dst, box, width, quality in JOBS:
        out_dir.mkdir(parents=True, exist_ok=True)
        img = Image.open(SRC / src).convert("RGB")
        if box is not None:
            img = img.crop(box)
        if img.width > width:
            img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
        target = out_dir / dst
        img.save(target, "WEBP", quality=quality, method=6)
        print(f"{dst}: {img.width}x{img.height}, {target.stat().st_size // 1024} KB")

    og = Image.new("RGB", (1200, 630), "white")
    mark = Image.open(ROOT / "src" / "assets" / "brand" / "wordmark.png").convert("RGBA")
    mark = mark.resize((round(mark.width * 44 / mark.height), 44), Image.LANCZOS)
    og.paste(mark, (64, 52), mark)
    shot = Image.open(OUT / "agenda-mes.webp").convert("RGB")
    shot = shot.resize((1072, round(shot.height * 1072 / shot.width)), Image.LANCZOS)
    og.paste(shot.crop((0, 0, 1072, 502)), (64, 128))
    og.save(ROOT / "public" / "og.png", optimize=True)
    print(f"og.png: {(ROOT / 'public' / 'og.png').stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
