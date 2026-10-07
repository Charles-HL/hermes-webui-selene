#!/usr/bin/env python3
"""Review staged or tracked text for common private-data leaks. Not a secret scanner guarantee."""
import argparse
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
group = parser.add_mutually_exclusive_group(required=True)
group.add_argument('--staged', action='store_true')
group.add_argument('--tracked', action='store_true')
args = parser.parse_args()
def git(*values):
    return subprocess.check_output(['git', *values], cwd=ROOT)

names = (git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z') if args.staged
         else git('ls-files', '-z')).decode().split('\0')
private_parts = {'.local', '.artifacts', 'backups', '__pycache__'}
patterns = [
    re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    re.compile(r'(?:/' + 'Users/|/' + 'mnt/)(?:[^\s`"<>]+)'),
    re.compile(r'\b(?:10|192\.168)\.\d{1,3}\.\d{1,3}(?:\.\d{1,3})?\b'),
    re.compile(r'\b172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}\b'),
    re.compile(r'\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,})\b'),
]
boundary = ROOT / '.local' / 'public-boundaries.json'
for value in json.loads(boundary.read_text()).get('forbidden_literals', []) if boundary.exists() else []:
    patterns.append(re.compile(re.escape(value)))
findings = []
for name in filter(None, names):
    path = Path(name)
    if private_parts.intersection(path.parts) or path.name.startswith('.env') and path.name != '.env.example' or path.suffix in {'.pem', '.key', '.har', '.trace'}:
        findings.append(f'{name}: private path')
        continue
    raw = git('show', ':' + name) if args.staged else (ROOT / name).read_bytes()
    if b'\0' in raw:
        continue  # Images require manual visual inspection.
    for number, line in enumerate(raw.decode('utf-8', errors='replace').splitlines(), 1):
        if any(pattern.search(line) for pattern in patterns):
            findings.append(f'{name}:{number}: possible private content (value withheld)')
if findings:
    raise SystemExit('\n'.join(findings))
print(f'Public text check passed for {len(list(filter(None, names)))} paths; inspect images and diffs manually.')
