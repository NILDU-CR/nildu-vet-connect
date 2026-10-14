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
    # Hero: composición armada por Steve (agenda, panel, ficha, peso y archivos) con fondo transparente; se recorta al contenido.
    # Las dos versiones quedan del mismo tamaño; la de inglés es más angosta y se centra dentro del mismo ancho.
    ("hero-compuesto.webp", OUT, "hero.webp", (192, 62, 1920, 1100), 1700, 84),
    ("en/hero-compuesto.webp", OUT, "hero-en.webp", (154, 62, 1882, 1100), 1700, 84),
    # Pestaña Agenda de la sección de módulos: sin recorte, a 1440 de ancho, como consulta.webp y fiscal.webp.
    ("modulo-agenda-semana.png", SCREENS / "modulos", "agenda.webp", None, 1440, 82),
    # Inventario: Existencias del demo, sin la barra de scroll de la derecha.
    ("modulo-inventario.png", SCREENS / "modulos", "inventario.webp", (0, 0, 1558, 749), 1440, 82),
    # Tareas: el tablero del demo, sin la barra de scroll y sin el fondo vacío de las columnas.
    ("modulo-tareas.png", SCREENS / "modulos", "tareas.webp", (0, 0, 1558, 530), 1440, 82),
    # Reportes: solo el Panel de control del inicio (la portada del demo es una foto ajena).
    ("modulo-reportes.png", SCREENS / "modulos", "reportes.webp", (856, 68, 1500, 476), 1440, 82),
    # Las mismas pantallas con el portal en inglés, para la landing en inglés (fuentes en capturas/en/, con los mismos tamaños).
    ("en/modulo-agenda-semana.png", SCREENS / "modulos", "agenda-en.webp", None, 1440, 82),
    ("en/modulo-inventario.png", SCREENS / "modulos", "inventario-en.webp", (0, 0, 1558, 749), 1440, 82),
    ("en/modulo-tareas.png", SCREENS / "modulos", "tareas-en.webp", (0, 0, 1558, 530), 1440, 82),
    ("en/modulo-reportes.png", SCREENS / "modulos", "reportes-en.webp", (856, 68, 1500, 476), 1440, 82),
    ("en/consulta.png", SCREENS, "consulta-en.webp", None, 1440, 82),
    ("en/fiscal.png", SCREENS, "fiscal-en.webp", None, 1440, 82),
]


def main() -> None:
    for src, out_dir, dst, box, width, quality in JOBS:
        out_dir.mkdir(parents=True, exist_ok=True)
        img = Image.open(SRC / src)
        img = img.convert("RGBA" if img.mode == "RGBA" else "RGB")
        if box is not None:
            img = img.crop(box)
        if img.width > width:
            img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
        target = out_dir / dst
        img.save(target, "WEBP", quality=quality, method=6)
        print(f"{dst}: {img.width}x{img.height}, {target.stat().st_size // 1024} KB")
        # Versión de 720 para el srcset de los módulos: en celular la captura se ve a ~550 px.
        if out_dir != OUT and img.width > 720:
            small = out_dir / dst.replace(".webp", "-720.webp")
            img.resize((720, round(img.height * 720 / img.width)), Image.LANCZOS).save(small, "WEBP", quality=quality, method=6)

    # Versiones más angostas del hero para el srcset: los celulares no bajan la de 1700.
    for name in ("hero", "hero-en"):
        hero = Image.open(OUT / f"{name}.webp")
        for width in (800, 1200):
            target = OUT / f"{name}-{width}.webp"
            hero.resize((width, round(hero.height * width / hero.width)), Image.LANCZOS).save(target, "WEBP", quality=84, method=6)
            print(f"{target.name}: {target.stat().st_size // 1024} KB")

    og = Image.new("RGB", (1200, 630), "white")
    mark = Image.open(ROOT / "src" / "assets" / "brand" / "wordmark.png").convert("RGBA")
    mark = mark.resize((round(mark.width * 44 / mark.height), 44), Image.LANCZOS)
    og.paste(mark, (64, 52), mark)
    shot = Image.open(OUT / "hero.webp").convert("RGBA")
    shot.thumbnail((1072, 470), Image.LANCZOS)
    og.paste(shot, ((1200 - shot.width) // 2, 140), shot)
    og.save(ROOT / "public" / "og.png", optimize=True)
    print(f"og.png: {(ROOT / 'public' / 'og.png').stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
