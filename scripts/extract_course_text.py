from __future__ import annotations

import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
COURSES = [
    (ROOT / "docs" / "8086", ".pptx"),
    (ROOT / "docs" / "信息论与编码", ".pdf"),
]
PAGE_SPLIT = "\n\n===== PAGE SPLIT =====\n\n"


def extract_pptx(path: Path) -> list[str]:
    texts: list[str] = []
    ns = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
    with zipfile.ZipFile(path) as archive:
        slide_names = sorted(
            [
                name
                for name in archive.namelist()
                if name.startswith("ppt/slides/slide") and name.endswith(".xml")
            ],
            key=lambda value: int(re.search(r"slide(\d+)\.xml", value).group(1)),
        )
        for slide_name in slide_names:
            xml = ET.fromstring(archive.read(slide_name))
            parts = [
                node.text.strip()
                for node in xml.findall(".//a:t", ns)
                if node.text and node.text.strip()
            ]
            texts.append("\n".join(parts))
    return texts


def extract_pdf(path: Path) -> list[str]:
    reader = PdfReader(str(path))
    return [(page.extract_text() or "").strip() for page in reader.pages]


def sanitize_filename(name: str) -> str:
    return re.sub(r'[\\/:*?"<>|]', "-", name)


def main() -> None:
    for course_dir, suffix in COURSES:
        output_dir = course_dir / "_extracted"
        output_dir.mkdir(exist_ok=True)

        for source in sorted(course_dir.iterdir()):
            if source.is_dir() or source.suffix.lower() != suffix:
                continue

            if suffix == ".pptx":
                pages = extract_pptx(source)
            else:
                pages = extract_pdf(source)

            output_path = output_dir / f"{sanitize_filename(source.stem)}.txt"
            payload = PAGE_SPLIT.join(
                f"[[PAGE {index + 1}]]\n{page}" for index, page in enumerate(pages)
            )
            output_path.write_text(payload, encoding="utf-8")
            print(f"{source.name} -> {output_path.name} ({len(pages)} pages)")


if __name__ == "__main__":
    main()
