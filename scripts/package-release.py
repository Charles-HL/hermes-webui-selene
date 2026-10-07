#!/usr/bin/env python3
"""Build public install archives from an explicit allowlist, never the checkout."""
import argparse
import hashlib
import json
from pathlib import Path
import tarfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir', type=Path, default=ROOT / '.artifacts' / 'releases')
args = parser.parse_args()
entry = json.loads((ROOT / 'extension.json').read_text())
manifest = json.loads((ROOT / 'manifest.json').read_text())
version = entry['version']
if manifest['extensions'][0]['version'] != version:
    raise SystemExit('Version mismatch between extension.json and manifest.json')
files = ['extension.json', 'manifest.json', 'README.md', 'LICENSE', 'CHANGELOG.md',
         'docs/CONTRIBUTING.md', 'docs/VALIDATION.md']
files += entry['assets']['scripts'] + entry['assets']['stylesheets'] + entry['screenshots']
files = sorted(set(files))
for name in files:
    path = Path(name)
    if path.is_absolute() or '..' in path.parts or path.parts[0] not in {
        'assets', 'screenshots', 'docs', 'extension.json', 'manifest.json',
        'README.md', 'LICENSE', 'CHANGELOG.md'
    } or not (ROOT / path).is_file() or (ROOT / path).is_symlink():
        raise SystemExit(f'Unsafe or missing package path: {name}')
    if not (ROOT / path).resolve().is_relative_to(ROOT):
        raise SystemExit(f'Package path escapes repository: {name}')
    if name.startswith(('screenshots/review/', 'docs/wiki/')):
        raise SystemExit(f'Maintainer-only package path: {name}')
output = args.output_dir.resolve()
output.mkdir(parents=True, exist_ok=True)
archive = output / f'selene-{version}.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as handle:
    for name in files:
        handle.write(ROOT / name, f'selene/{name}')
with tarfile.open(output / f'selene-{version}.tar.gz', 'w:gz') as handle:
    for name in files:
        handle.add(ROOT / name, arcname=name, recursive=False)
(output / f'selene-{version}-files.json').write_text(json.dumps(files, indent=2) + '\n')
Path(str(archive) + '.sha256').write_text(hashlib.sha256(archive.read_bytes()).hexdigest() + '  ' + archive.name + '\n')
print(f'Packaged {len(files)} public files: {archive}')
